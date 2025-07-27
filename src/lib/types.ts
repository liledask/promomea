export type TierLevel = 'PT' | 'PC' | 'DPCA' | 'TPCA' | 'PPCA';

export interface User {
  name: string;
  avatarUrl: string;
  currentTier: TierLevel;
  currentEarnings: number;
  lifetimeEarnings: number;
  eventsAdded: number;
  upcomingPayout: number;
}

export interface TierDetails {
  name: string;
  color: string;
  goalEvents: number;
  goalEarnings: number;
  benefits: string[];
}
