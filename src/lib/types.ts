
export type TierLevel = 'PT' | 'PC' | 'DPCA' | 'TPCA' | 'PPCA';

export interface User {
  id: string;
  promo_id: string;
  full_name: string | null;
  phone: string | null;
  avatar_url: string | null;
  payout_method: string | null;
  payout_detail: string | null;
  current_tier: TierLevel | null;
  referral_count: number;
  created_at: string;
  updated_at: string;
  referred_by_promo_code: string | null;
  email: string | null; // From auth.users
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
  name:string;
  date: string;
  commission: number;
  status: 'Completed' | 'Upcoming';
}
