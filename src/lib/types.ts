
export type TierLevel = 'PT' | 'PC' | 'DPCA' | 'TPCA' | 'PPCA';

export interface User {
  id: string;
  name: string;
  avatar_url: string;
  email: string;
  current_tier: TierLevel;
  current_earnings: number;
  lifetime_earnings: number;
  events_added: number;
  upcoming_payout: number;
  referral_code: string;
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
