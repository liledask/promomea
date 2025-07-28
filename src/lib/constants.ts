
import type { TierLevel, TierDetails } from './types';

export const TIER_DETAILS: Record<TierLevel, TierDetails> = {
  PT: {
    name: 'ProMo Trainee (PT)',
    color: 'bg-orange-200',
    commission: 1,
    description: 'Register as a MEA ProMo Affiliate',
    goalEvents: 5,
    benefits: [
      'Earn 1% of Ticket sales from Events added to the platform up to 5 events',
      'When 5 events are not added to the platform within 30 days, tier one restarts, no commissions earned on events added.',
      'PayOut of your earnings up to 7 days after the event',
    ],
    advanceRequirement: 'Minimum of 5 events added to platform within 30 days from registering as a ProMo',
  },
  PC: {
    name: 'ProMo Certified Affiliate (PC)',
    color: 'bg-slate-300',
    commission: 3,
    description: 'Successfully added 5 events to platform at tier one',
    goalEvents: 15,
    benefits: [
      'Earn 3% commission from Ticket Sales of all events added to the platform at this tier',
      '3% commission Earnings up to 10 Events at this tier',
      'Continue earning 1% commission from tier one for the life of the program',
    ],
    advanceRequirement: 'Minimum of 10 events added to platform to advance to DPCA',
  },
  DPCA: {
    name: 'Double ProMo Certified Affiliate (DPCA)',
    color: 'bg-yellow-400',
    commission: 6,
    description: 'Have successfully completed Tier one/two',
    goalEvents: 40,
    benefits: [
      'Earn 6% commission on events added to platform at this tier',
      '6% earnings up to 25 events added to the platform',
      'Continue Earning from previous tiers',
    ],
    advanceRequirement: 'Minimum of 25 events added to platform to advance to TPCA',
  },
  TPCA: {
    name: 'Triple ProMo Certified Affiliate (TPCA)',
    color: 'bg-blue-400',
    commission: 15,
    description: 'Completion of tiers one - three',
    goalEvents: 90,
    benefits: [
      'Earn 15% commission on Events added at this tier',
      '15% commission earned up to 50 events',
      'Continuing Earning commissions from all previous tiers',
    ],
    advanceRequirement: 'Minimum of 50 events added to platform to advance to PPCA',
  },
  PPCA: {
    name: 'Presidential ProMo Certified Affiliate (PPCA)',
    color: 'bg-purple-500',
    commission: 25,
    description: 'Completion of all tiers one - four, Virtual Meeting with MEA Team Member for on boarding to PPCA Tier',
    goalEvents: Infinity,
    benefits: [
      'Earn 25% commission on all events added at this tier for the life of Program',
      'Continue Earning commissions from all previous tiers',
      'Receive Certificate as a Certified Presidential Affiliate Marketer',
      '100 shares of Stock issues into MEA Promo account for your family',
    ],
    advanceRequirement: 'Highest tier - Presidential level achievement',
  },
};
