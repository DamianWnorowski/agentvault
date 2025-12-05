# AgentVault - AI Agent Marketplace

**10,000 AI agents for $20/month**

Built in 48 hours as a demonstration of rapid AI product development.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Supabase account
- Anthropic API key
- Stripe account

### Setup

```bash
# Clone repo
git clone https://github.com/DamianWnorowski/agentvault.git
cd agentvault

# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local

# Fill in your API keys in .env.local
```

### Database Setup

1. Go to [Supabase](https://supabase.com) and create a new project
2. In SQL Editor, run `scripts/schema.sql`
3. Copy your Supabase URL and keys to `.env.local`

### Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Database**: Supabase (PostgreSQL)
- **AI**: Anthropic Claude
- **Payments**: Stripe
- **Styling**: Tailwind CSS
- **Hosting**: Vercel

## 📚 Features

- ✅ 10,000+ AI agents across 8 categories
- ✅ Real-time agent execution
- ✅ Freemium model (10 free runs)
- ✅ Stripe subscription integration
- ✅ Search and filtering
- ✅ Individual agent pages with examples
- ✅ SEO-optimized (10K+ pages)

## 💰 Business Model

- **Free**: 10 agent runs, access to free agents
- **Pro ($20/month)**: Unlimited runs, all agents, API access
- **Enterprise ($100/month)**: Custom agents, dedicated support

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/DamianWnorowski/agentvault)

## 📝 License

MIT

## 👤 Author

Built by [@DamianWnorowski](https://github.com/DamianWnorowski)

---

**⚡ AgentVault - Your AI automation starts here**