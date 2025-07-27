import type { TierLevel, TierDetails } from './types';

export const TIER_DETAILS: Record<TierLevel, TierDetails> = {
  PT: {
    name: 'ProMo Trainee',
    color: 'bg-orange-200',
    goalEvents: 5,
    goalEarnings: 0,
    benefits: ['1% commission on up to 5 events', 'Payout 7 days after event'],
  },
  PC: {
    name: 'ProMo Certified',
    color: 'bg-slate-300',
    goalEvents: 15,
    goalEarnings: 0,
    benefits: ['3% commission on up to 10 events in this tier', 'Continue earning from previous tiers'],
  },
  DPCA: {
    name: 'Double ProMo Certified',
    color: 'bg-yellow-400',
    goalEvents: 40,
    goalEarnings: 0,
    benefits: ['6% commission on up to 25 events in this tier', 'Continue earning from previous tiers'],
  },
  TPCA: {
    name: 'Triple ProMo Certified',
    color: 'bg-blue-400',
    goalEvents: 90,
    goalEarnings: 0,
    benefits: ['15% commission on up to 50 events in this tier', 'Continue earning from previous tiers'],
  },
  PPCA: {
    name: 'Presidential ProMo Certified',
    color: 'bg-purple-500',
    goalEvents: Infinity,
    goalEarnings: Infinity,
    benefits: ['25% commission on all events', 'Continue earning from previous tiers', 'Receive Certificate', '100 shares of stock', 'Bonus Prize'],
  },
};
