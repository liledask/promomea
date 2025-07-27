
export type TierLevel = 'PT' | 'PC' | 'DPCA' | 'TPCA' | 'PPCA';

export interface User {
  id: string;
  name: string;
  avatarUrl: string;
  email: string;
  currentTier: TierLevel;
  currentEarnings: number;
  lifetimeEarnings: number;
  eventsAdded: number;
  upcomingPayout: number;
  referralCode: string;
}

export interface TierDetails {
  name: string;
  color: string;
  commission: number;
  description: string;
  goalEvents: number;
  benefits: string[];
}

export interface ProMoEvent {
  id: string;
  name: string;
  date: string;
  commission: number;
  status: 'Completed' | 'Upcoming';
}
