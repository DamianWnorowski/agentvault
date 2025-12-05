import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia',
});

export const PLANS = {
  free: {
    name: 'Free',
    price: 0,
    credits: 10,
    features: ['10 free agent runs', 'Access to free agents', 'Community support']
  },
  pro: {
    name: 'Pro',
    price: 2000, // $20 in cents
    priceId: process.env.STRIPE_PRICE_ID_PRO,
    features: ['Unlimited agent runs', 'Access to all 10,000 agents', 'Priority support', 'API access']
  },
  enterprise: {
    name: 'Enterprise',
    price: 10000, // $100 in cents
    priceId: process.env.STRIPE_PRICE_ID_ENTERPRISE,
    features: ['Everything in Pro', 'Custom agents', 'Dedicated support', 'SLA guarantee', 'White-label option']
  }
};