'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

interface Agent {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  price_cents: number;
  downloads: number;
  rating: number;
  is_featured: boolean;
}

export default function AgentBrowser() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAgents();
  }, [search, category]);

  async function loadAgents() {
    setLoading(true);
    
    let query = supabase.from('agents').select('*');

    if (search) {
      query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`);
    }

    if (category !== 'all') {
      query = query.eq('category', category);
    }

    const { data } = await query
      .order('is_featured', { ascending: false })
      .order('downloads', { ascending: false })
      .limit(100);

    setAgents(data || []);
    setLoading(false);
  }

  const categories = ['all', 'marketing', 'code', 'writing', 'design', 'research', 'sales', 'legal', 'finance'];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 p-6">
        <div className="max-w-7xl mx-auto">
          <Link href="/" className="text-2xl font-bold">⚡ AgentVault</Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-8">
        {/* Search */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search 10,000 agents..."
            className="w-full px-6 py-4 rounded-lg bg-gray-900 text-white text-xl border-2 border-gray-800 focus:border-purple-600 focus:outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Category Filter */}
        <div className="flex gap-3 mb-12 overflow-x-auto pb-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-6 py-2 rounded-lg whitespace-nowrap transition ${
                category === cat 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-gray-900 text-gray-400 hover:bg-gray-800'
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* Agent Grid */}
        {loading ? (
          <div className="text-center py-20 text-gray-400">Loading agents...</div>
        ) : agents.length === 0 ? (
          <div className="text-center py-20 text-gray-400">No agents found. Try a different search.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agents.map(agent => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function AgentCard({ agent }: { agent: Agent }) {
  return (
    <Link 
      href={`/agents/${agent.slug}`}
      className="bg-gray-900 p-6 rounded-xl hover:bg-gray-800 transition border-2 border-gray-800 hover:border-purple-600 group"
    >
      {agent.is_featured && (
        <div className="text-xs text-purple-400 font-semibold mb-2">⭐ FEATURED</div>
      )}
      
      <h3 className="text-xl font-bold mb-2 group-hover:text-purple-400 transition">
        {agent.name}
      </h3>
      
      <p className="text-gray-400 mb-4 line-clamp-2">
        {agent.description}
      </p>
      
      <div className="flex justify-between items-center text-sm">
        <span className="text-purple-500 font-semibold">
          {agent.price_cents === 0 ? 'FREE' : `$${(agent.price_cents / 100).toFixed(2)}`}
        </span>
        
        <div className="flex gap-3 text-gray-500">
          <span>⭐ {agent.rating.toFixed(1)}</span>
          <span>⚡ {agent.downloads.toLocaleString()} runs</span>
        </div>
      </div>
    </Link>
  );
}