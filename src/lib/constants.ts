
import type { TierLevel, TierDetails } from './types';

export const TIER_DETAILS: Record<TierLevel, TierDetails> = {
  PT: {
    name: 'ProMo Trainee (PT)',
    color: 'bg-orange-200',
    commission: 1,
    description: 'Register as a ProMo Affiliate and start earning with your first 5 events in 30 days.',
    goalEvents: 5,
    benefits: ['Earn 1% of Ticket sales from up to 5 events.', 'Must add 5 events within 30 days to advance.', 'Payout up to 7 days after the event.'],
  },
  PC: {
    name: 'ProMo Certified (PC)',
    color: 'bg-slate-300',
    commission: 3,
    description: 'Add 10 more events to reach the next tier.',
    goalEvents: 15,
    benefits: ['Earn 3% commission on the next 10 events.', 'Continue earning 1% from Tier 1 events for life.'],
  },
  DPCA: {
    name: 'Double ProMo Certified (DPCA)',
    color: 'bg-yellow-400',
    commission: 6,
    description: 'Add 25 more events to become Triple ProMo Certified.',
    goalEvents: 40,
    benefits: ['Earn 6% commission on the next 25 events.', 'Continue earning commissions from previous tiers.'],
  },
  TPCA: {
    name: 'Triple ProMo Certified (TPCA)',
    color: 'bg-blue-400',
    commission: 15,
    description: 'Add 50 more events to achieve the highest rank.',
    goalEvents: 90,
    benefits: ['Earn 15% commission on the next 50 events.', 'Continue earning commissions from all previous tiers.'],
  },
  PPCA: {
    name: 'Presidential ProMo Certified (PPCA)',
    color: 'bg-purple-500',
    commission: 25,
    description: 'The pinnacle of success with the highest rewards.',
    goalEvents: Infinity,
    benefits: ['Earn 25% commission on all new events for life.', 'Continue earning from all previous tiers.', 'Receive a Certificate, 100 shares of MEA stock, and a Bonus Prize.'],
  },
};
