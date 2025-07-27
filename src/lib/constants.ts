import type { TierLevel, TierDetails } from './types';

export const TIER_DETAILS: Record<TierLevel, TierDetails> = {
  PT: {
    name: 'Bronze',
    color: 'bg-orange-200',
    goalEvents: 5,
    goalEarnings: 100,
    benefits: ['Basic commission rate', 'Access to marketing materials'],
  },
  PC: {
    name: 'Silver',
    color: 'bg-slate-300',
    goalEvents: 20,
    goalEarnings: 500,
    benefits: ['Increased commission', 'Dedicated support'],
  },
  DPCA: {
    name: 'Gold',
    color: 'bg-yellow-400',
    goalEvents: 50,
    goalEarnings: 2000,
    benefits: ['Higher commission', 'Early access to new features'],
  },
  TPCA: {
    name: 'Platinum',
    color: 'bg-blue-400',
    goalEvents: 100,
    goalEarnings: 10000,
    benefits: ['Custom commission rates', 'Priority support'],
  },
  PPCA: {
    name: 'Presidential',
    color: 'bg-purple-500',
    goalEvents: Infinity,
    goalEarnings: Infinity,
    benefits: ['Exclusive rewards', 'Direct line to management'],
  },
};
