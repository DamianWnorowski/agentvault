import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { supabaseAdmin } from '@/lib/supabase';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

export async function POST(req: NextRequest) {
  try {
    const { agentId, userInput, userId } = await req.json();

    if (!agentId || !userInput) {
      return NextResponse.json(
        { error: 'Missing agentId or userInput' },
        { status: 400 }
      );
    }

    // 1. Fetch agent from database
    const { data: agent, error: agentError } = await supabaseAdmin
      .from('agents')
      .select('*')
      .eq('id', agentId)
      .single();

    if (agentError || !agent) {
      return NextResponse.json(
        { error: 'Agent not found' },
        { status: 404 }
      );
    }

    // 2. Check user subscription/credits
    let user = null;
    if (userId) {
      const { data: userData } = await supabaseAdmin
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();
      
      user = userData;

      // Check if user has credits or subscription
      if (user?.subscription_tier === 'free' && user.credits <= 0) {
        return NextResponse.json(
          { error: 'No credits remaining. Upgrade to Pro for unlimited runs.' },
          { status: 402 }
        );
      }
    }

    // 3. Execute agent with Claude
    const startTime = Date.now();
    
    const response = await anthropic.messages.create({
      model: agent.model || 'claude-sonnet-4-20250514',
      max_tokens: 4096,
      system: agent.system_prompt,
      messages: [{ role: 'user', content: userInput }],
    });

    const output = response.content[0].type === 'text' ? response.content[0].text : '';
    const duration = Date.now() - startTime;

    // 4. Deduct credit if free user
    if (user && user.subscription_tier === 'free') {
      await supabaseAdmin
        .from('users')
        .update({ credits: user.credits - 1 })
        .eq('id', userId);
    }

    // 5. Log execution
    await supabaseAdmin.from('executions').insert({
      agent_id: agentId,
      user_id: userId || null,
      input_text: userInput,
      output_text: output,
      cost_cents: agent.price_cents || 0,
      duration_ms: duration,
    });

    // 6. Increment download count
    await supabaseAdmin
      .from('agents')
      .update({ downloads: (agent.downloads || 0) + 1 })
      .eq('id', agentId);

    return NextResponse.json({
      output,
      duration,
      creditsRemaining: user ? user.credits - 1 : null
    });

  } catch (error) {
    console.error('Execution error:', error);
    return NextResponse.json(
      { error: 'Failed to execute agent' },
      { status: 500 }
    );
  }
}