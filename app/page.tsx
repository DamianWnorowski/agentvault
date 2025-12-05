import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black text-white">
      {/* Nav */}
      <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto">
        <div className="text-2xl font-bold">⚡ AgentVault</div>
        <div className="flex gap-4">
          <Link href="/agents" className="hover:text-purple-400">Browse Agents</Link>
          <Link href="/pricing" className="hover:text-purple-400">Pricing</Link>
          <Link href="/login" className="bg-purple-600 px-6 py-2 rounded-lg hover:bg-purple-700">
            Sign In
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-20 pb-32 text-center px-4">
        <h1 className="text-7xl md:text-8xl font-bold mb-6 leading-tight">
          10,000 AI Agents.
          <br />
          <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            One Subscription.
          </span>
        </h1>
        
        <p className="text-2xl text-gray-300 max-w-3xl mx-auto mb-12">
          Stop paying $20 per ChatGPT prompt. Get unlimited access to battle-tested AI agents for $20/month.
        </p>

        <div className="flex gap-4 justify-center flex-wrap">
          <Link 
            href="/agents" 
            className="bg-purple-600 px-10 py-5 rounded-xl text-xl font-semibold hover:bg-purple-700 transition"
          >
            Browse 10,000 Agents →
          </Link>
          <Link 
            href="/agents/cold-email-generator" 
            className="border-2 border-purple-600 px-10 py-5 rounded-xl text-xl font-semibold hover:bg-purple-600/10 transition"
          >
            Try Free Agent
          </Link>
        </div>

        {/* Social Proof */}
        <div className="mt-16 flex gap-12 justify-center flex-wrap text-gray-400">
          <div>
            <div className="text-4xl font-bold text-white">2,847</div>
            <div className="text-sm">Active Users</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-white">127K</div>
            <div className="text-sm">Agents Run</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-white">$1.2M</div>
            <div className="text-sm">Saved in AI Costs</div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-black/50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['Marketing', 'Code', 'Writing', 'Design', 'Research', 'Sales', 'Legal', 'Finance'].map(cat => (
              <Link 
                key={cat}
                href={`/agents?category=${cat.toLowerCase()}`}
                className="bg-gray-900 p-8 rounded-xl hover:bg-gray-800 transition text-center"
              >
                <div className="text-5xl mb-4">{getCategoryEmoji(cat)}</div>
                <div className="text-xl font-semibold">{cat}</div>
                <div className="text-gray-400 mt-2">1,000+ agents</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 text-center">
        <h2 className="text-5xl font-bold mb-6">Start Automating Today</h2>
        <p className="text-xl text-gray-300 mb-12">Join 2,847 builders using AgentVault</p>
        <Link 
          href="/pricing"
          className="bg-purple-600 px-12 py-6 rounded-xl text-2xl font-semibold hover:bg-purple-700 transition inline-block"
        >
          Get Started - $20/month
        </Link>
      </section>
    </div>
  );
}

function getCategoryEmoji(cat: string) {
  const emojis: Record<string, string> = {
    Marketing: '📢',
    Code: '💻',
    Writing: '✍️',
    Design: '🎨',
    Research: '🔬',
    Sales: '💼',
    Legal: '⚖️',
    Finance: '💰'
  };
  return emojis[cat] || '⚡';
}