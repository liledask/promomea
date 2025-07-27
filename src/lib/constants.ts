
import type { TierLevel, TierDetails } from './types';

export const TIER_DETAILS: Record<TierLevel, TierDetails> = {
  PT: {
    name: 'ProMo Trainee (PT)',
    color: 'bg-orange-200',
    commission: 1,
    description: 'Refer organizers who add a total of 5 events within your first 30 days to advance.',
    goalEvents: 5,
    benefits: [
      'Earn 1% of ticket sales from events added by your referrals (up to 5 events)',
      'Payout of earnings up to 7 days after the event',
      'Events must be added within 30 days or ProMo starts over',
    ],
  },
  PC: {
    name: 'ProMo Certified Affiliate (PC)',
    color: 'bg-slate-300',
    commission: 3,
    description: 'Your referred organizers need to add 10 more events to reach the next tier.',
    goalEvents: 15,
    benefits: [
      'Earn 3% commission on the next 10 events',
      'Continue earning 1% commission from tier one for life',
    ],
  },
  DPCA: {
    name: 'Double ProMo Certified Affiliate (DPCA)',
    color: 'bg-yellow-400',
    commission: 6,
    description: 'Your referred organizers need to add 25 more events to become Triple ProMo Certified.',
    goalEvents: 40,
    benefits: [
      'Earn 6% commission on the next 25 events',
      'Continue earning commissions from all previous tiers',
    ],
  },
  TPCA: {
    name: 'Triple ProMo Certified Affiliate (TPCA)',
    color: 'bg-blue-400',
    commission: 15,
    description: 'Your referred organizers need to add 50 more events to achieve the highest rank.',
    goalEvents: 90,
    benefits: [
      'Earn 15% commission on the next 50 events',
      'Continue earning commissions from all previous tiers',
    ],
  },
  PPCA: {
    name: 'Presidential ProMo Certified Affiliate (PPCA)',
    color: 'bg-purple-500',
    commission: 25,
    description: 'The pinnacle of success with the highest rewards. Requires a virtual meeting with the MEA team.',
    goalEvents: Infinity,
    benefits: [
      'Earn 25% commission on all new events from your referrals for life',
      'Continue earning from all previous tiers',
      'Receive Certificate as Certified Presidential Affiliate Marketer',
      '100 shares of stock issued into MEA Promo account',
      'Bonus Prize',
    ],
  },
};
