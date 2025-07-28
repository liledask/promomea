

export type TierLevel = 'PT' | 'PC' | 'DPCA' | 'TPCA' | 'PPCA';

export interface User {
  id: string;
  promo_id: string;
  full_name: string | null;
  avatar_url: string | null;
  payout_method: string | null;
  payout_detail: string | null;
  current_tier: TierLevel | null;
  referral_count: number | null;
  events_added: number | null;
  current_earnings: number | null;
  lifetime_earnings: number | null;
  upcoming_payout: number | null;
  created_at: string;
  updated_at: string;
  referred_by_promo_code: string | null;
  email: string; // From auth.users
  email_notifications_enabled: boolean | null;
  promotional_updates_enabled: boolean | null;
}

export interface TierDetails {
  name: string;
  color: string;
  commission: number;
  description: string;
  goalEvents: number;
  benefits: string[];
  advanceRequirement: string;
}

export interface ProMoEvent {
  id: string;
  name:string;
  date: string;
  commission: number;
  status: 'Completed' | 'Upcoming';
  user_id: string;
  created_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  type: 'award' | 'payout' | 'tier_upgrade' | string;
  data: {
    title: string;
    description: string;
  };
  is_read: boolean;
  created_at: string;
}
