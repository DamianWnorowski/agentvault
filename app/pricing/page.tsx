import Link from 'next/link';

export default function Pricing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">⚡ AgentVault</Link>
          <Link href="/agents" className="text-gray-400 hover:text-white">Browse Agents</Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold mb-6">Simple, Transparent Pricing</h1>
          <p className="text-2xl text-gray-400">Choose the plan that works for you</p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Free */}
          <div className="bg-gray-900 p-8 rounded-2xl border-2 border-gray-800">
            <h3 className="text-2xl font-bold mb-2">Free</h3>
            <div className="text-5xl font-bold mb-6">$0<span className="text-xl text-gray-400">/month</span></div>
            
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>10 free agent runs</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>Access to free agents</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>Community support</span>
              </li>
              <li className="flex items-start gap-2 text-gray-500">
                <span>✗</span>
                <span>Premium agents</span>
              </li>
              <li className="flex items-start gap-2 text-gray-500">
                <span>✗</span>
                <span>API access</span>
              </li>
            </ul>

            <Link 
              href="/agents"
              className="block w-full text-center bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded-lg font-semibold transition"
            >
              Get Started
            </Link>
          </div>

          {/* Pro - Most Popular */}
          <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-8 rounded-2xl border-2 border-purple-400 relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-500 text-black px-4 py-1 rounded-full text-sm font-bold">
              MOST POPULAR
            </div>
            
            <h3 className="text-2xl font-bold mb-2">Pro</h3>
            <div className="text-5xl font-bold mb-6">$20<span className="text-xl text-purple-200">/month</span></div>
            
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-2">
                <span className="text-green-300">✓</span>
                <span>Unlimited agent runs</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-300">✓</span>
                <span>Access to all 10,000 agents</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-300">✓</span>
                <span>Priority support</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-300">✓</span>
                <span>API access</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-300">✓</span>
                <span>Early access to new agents</span>
              </li>
            </ul>

            <button className="w-full bg-white text-purple-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-bold transition">
              Upgrade to Pro
            </button>
          </div>

          {/* Enterprise */}
          <div className="bg-gray-900 p-8 rounded-2xl border-2 border-gray-800">
            <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
            <div className="text-5xl font-bold mb-6">$100<span className="text-xl text-gray-400">/month</span></div>
            
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>Everything in Pro</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>Custom agents</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>Dedicated support</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>SLA guarantee</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>White-label option</span>
              </li>
            </ul>

            <button className="w-full bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded-lg font-semibold transition">
              Contact Sales
            </button>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-20 max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <details className="bg-gray-900 p-6 rounded-lg">
              <summary className="font-semibold cursor-pointer">What happens after I use my 10 free runs?</summary>
              <p className="mt-4 text-gray-400">You'll need to upgrade to Pro ($20/month) for unlimited runs. All free agents remain accessible.</p>
            </details>

            <details className="bg-gray-900 p-6 rounded-lg">
              <summary className="font-semibold cursor-pointer">Can I cancel anytime?</summary>
              <p className="mt-4 text-gray-400">Yes! Cancel your subscription anytime from your dashboard. You'll retain access until the end of your billing period.</p>
            </details>

            <details className="bg-gray-900 p-6 rounded-lg">
              <summary className="font-semibold cursor-pointer">How does the API work?</summary>
              <p className="mt-4 text-gray-400">Pro and Enterprise users get API keys to integrate agents into their own apps. Full documentation provided.</p>
            </details>

            <details className="bg-gray-900 p-6 rounded-lg">
              <summary className="font-semibold cursor-pointer">Can I create and sell my own agents?</summary>
              <p className="mt-4 text-gray-400">Yes! Join our Creator Program (coming soon). You keep 80% of revenue from your agents.</p>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
}