'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { use } from 'react';
import Link from 'next/link';

interface Agent {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  system_prompt: string;
  example_input: string;
  example_output: string;
  price_cents: number;
  downloads: number;
  rating: number;
}

export default function AgentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [agent, setAgent] = useState<Agent | null>(null);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [executing, setExecuting] = useState(false);

  useEffect(() => {
    loadAgent();
  }, [slug]);

  async function loadAgent() {
    setLoading(true);
    const { data } = await supabase
      .from('agents')
      .select('*')
      .eq('slug', slug)
      .single();

    if (data) {
      setAgent(data);
      setInput(data.example_input || '');
    }
    setLoading(false);
  }

  async function executeAgent() {
    if (!agent || !input.trim()) return;

    setExecuting(true);
    setOutput('');

    try {
      const res = await fetch('/api/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          agentId: agent.id,
          userInput: input,
          userId: null, // TODO: Add auth
        }),
      });

      const data = await res.json();

      if (data.error) {
        setOutput(`Error: ${data.error}`);
      } else {
        setOutput(data.output);
      }
    } catch (error) {
      setOutput('Error: Failed to execute agent');
    } finally {
      setExecuting(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-xl">Loading agent...</div>
      </div>
    );
  }

  if (!agent) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-xl">Agent not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">⚡ AgentVault</Link>
          <Link href="/agents" className="text-gray-400 hover:text-white">← Back to Agents</Link>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-8">
        {/* Agent Header */}
        <div className="mb-8">
          <h1 className="text-5xl font-bold mb-4">{agent.name}</h1>
          <p className="text-xl text-gray-400 mb-6">{agent.description}</p>
          
          <div className="flex gap-6 text-sm">
            <span className="px-4 py-2 bg-purple-600 rounded-lg">
              {agent.category.charAt(0).toUpperCase() + agent.category.slice(1)}
            </span>
            <span className="px-4 py-2 bg-gray-800 rounded-lg">
              {agent.price_cents === 0 ? 'FREE' : `$${(agent.price_cents / 100).toFixed(2)}`}
            </span>
            <span className="px-4 py-2 bg-gray-800 rounded-lg">
              ⭐ {agent.rating.toFixed(1)}
            </span>
            <span className="px-4 py-2 bg-gray-800 rounded-lg">
              ⚡ {agent.downloads.toLocaleString()} runs
            </span>
          </div>
        </div>

        {/* Execution Interface */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          {/* Input */}
          <div>
            <label className="block text-sm font-semibold mb-2">Input</label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full h-64 p-4 bg-gray-900 border-2 border-gray-800 rounded-lg focus:border-purple-600 focus:outline-none font-mono text-sm"
              placeholder="Enter your input..."
            />
            <button
              onClick={executeAgent}
              disabled={executing || !input.trim()}
              className="mt-4 w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700 disabled:cursor-not-allowed px-6 py-3 rounded-lg font-semibold transition"
            >
              {executing ? 'Executing...' : 'Run Agent ⚡'}
            </button>
          </div>

          {/* Output */}
          <div>
            <label className="block text-sm font-semibold mb-2">Output</label>
            <div className="w-full h-64 p-4 bg-gray-900 border-2 border-gray-800 rounded-lg overflow-auto">
              {executing ? (
                <div className="flex items-center justify-center h-full text-gray-400">
                  <div className="animate-spin text-4xl">⚡</div>
                </div>
              ) : output ? (
                <pre className="whitespace-pre-wrap font-mono text-sm">{output}</pre>
              ) : (
                <div className="text-gray-500 italic">Output will appear here...</div>
              )}
            </div>
          </div>
        </div>

        {/* Example */}
        {agent.example_output && (
          <div className="bg-gray-900 p-6 rounded-xl border-2 border-gray-800">
            <h3 className="text-xl font-bold mb-4">Example Output</h3>
            <div className="bg-black p-4 rounded-lg">
              <pre className="whitespace-pre-wrap font-mono text-sm text-gray-300">
                {agent.example_output}
              </pre>
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-12 bg-gradient-to-r from-purple-900 to-pink-900 p-8 rounded-xl text-center">
          <h2 className="text-3xl font-bold mb-4">Get Unlimited Access</h2>
          <p className="text-gray-300 mb-6">
            You've used your free trial. Upgrade to Pro for unlimited runs on all 10,000 agents.
          </p>
          <Link 
            href="/pricing"
            className="inline-block bg-white text-black px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-200 transition"
          >
            Upgrade to Pro - $20/month
          </Link>
        </div>
      </div>
    </div>
  );
}