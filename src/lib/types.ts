
export type TierLevel = 'PT' | 'PC' | 'DPCA' | 'TPCA' | 'PPCA';

export interface User {
  id: 'new' | 'experienced';
  name: string;
  avatarUrl: string;
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
  name: string;
  date: string;
  commission: number;
  status: 'Completed' | 'Upcoming';
}
