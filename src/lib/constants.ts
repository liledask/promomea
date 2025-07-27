
import type { TierLevel, TierDetails } from './types';

export const TIER_DETAILS: Record<TierLevel, TierDetails> = {
  PT: {
    name: 'ProMo Trainee (PT)',
    color: 'bg-orange-200',
    commission: 1,
    description: 'Start your journey and earn from your first 5 events.',
    goalEvents: 5,
    benefits: ['Earn 1% of Ticket sales from Events added to the platform up to 5 events.', 'Payout up to 7 days after the event.'],
  },
  PC: {
    name: 'ProMo Certified (PC)',
    color: 'bg-slate-300',
    commission: 3,
    description: 'Grow your earnings as you add more events.',
    goalEvents: 10,
    benefits: ['Earn 3% commission from Ticket Sales of all events added to the platform at this tier.', '3% commission Earnings up to 10 Events at this tier', 'Continue earning 1% commission from tier one for the life of the program.'],
  },
  DPCA: {
    name: 'Double ProMo Certified (DPCA)',
    color: 'bg-yellow-400',
    commission: 6,
    description: 'Unlock higher commission rates and greater rewards.',
    goalEvents: 25,
    benefits: ['Earn 6% commission on events added to platform at this tier', '6% earnings up to 25 events added to the platform.', 'Continue Earning from previous tiers.'],
  },
  TPCA: {
    name: 'Triple ProMo Certified (TPCA)',
    color: 'bg-blue-400',
    commission: 15,
    description: 'Become a top-tier affiliate with substantial earnings.',
    goalEvents: 50,
    benefits: ['Earn 15% commission on Events added at this tier.', '15% commission earned up to 50 events', 'Continuing Earning commissions from all previous tiers'],
  },
  PPCA: {
    name: 'Presidential ProMo Certified (PPCA)',
    color: 'bg-purple-500',
    commission: 25,
    description: 'Reach the pinnacle of success with the highest commissions and exclusive benefits.',
    goalEvents: Infinity,
    benefits: ['Earn 25% commission on all events added at this tier for the life of Program', 'Continue Earning commissions from all previous tiers', 'Receive Certificate as a Certified Presidential Affiliate Marketer', '100 shares of Stock issues into MEA Promo account for your family', 'Bonus Prize'],
  },
};
