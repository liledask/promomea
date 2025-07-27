
'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { supabase } from '@/lib/supabaseClient';
import type { User } from '@/lib/types';
import { Session, User as SupabaseUser } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUserProfile = async (supabaseUser: SupabaseUser) => {
        try {
            // There can be a delay for the trigger to run, this small delay helps prevent race conditions.
            await new Promise(resolve => setTimeout(resolve, 500));

            const { data: profile, error } = await supabase
            .from('promo_profile')
            .select('*')
            .eq('id', supabaseUser.id)
            .single();

            if (error) {
                console.error('Error fetching user profile:', error.message);
                // Don't sign out, the profile might not be ready yet on first login.
                // The user will be in a loading state until it's available.
            } else if (profile) {
                 setUser({
                    id: profile.id,
                    full_name: profile.full_name || '',
                    avatar_url: profile.avatar_url || '',
                    email: supabaseUser.email || '',
                    current_tier: profile.current_tier || 'PT',
                    promo_id: profile.promo_id,
                    current_earnings: profile.current_earnings || 0,
                    lifetime_earnings: profile.lifetime_earnings || 0,
                    events_added: profile.referral_count || 0,
                    upcoming_payout: profile.upcoming_payout || 0,
                });
            }
        } catch (error) {
             console.error('Exception fetching user profile:', (error as Error).message);
        } finally {
            setLoading(false);
        }
    };
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
        setLoading(true);
        const supabaseUser = session?.user;
        if (supabaseUser) {
            await fetchUserProfile(supabaseUser);
        } else {
            setUser(null);
            setLoading(false);
            router.push('/login');
        }
    });

    // Fetch initial user state on app load
    const getInitialSession = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
            await fetchUserProfile(session.user);
        } else {
            setLoading(false);
        }
    };
    getInitialSession();


    return () => {
      subscription?.unsubscribe();
    };
  }, [router]);

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
