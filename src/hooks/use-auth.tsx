
'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
  Dispatch,
  SetStateAction,
} from 'react';
import type { AuthChangeEvent, Session, User as SupabaseUser } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabaseClient';
import type { User } from '@/lib/types';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
  setUser: Dispatch<SetStateAction<User | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function generatePromoId(length = 6) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push('/login');
    router.refresh();
  }, [router]);

  const handleAuthChange = useCallback(
    async (event: AuthChangeEvent, session: Session | null) => {
      setLoading(true);
      const supabaseUser = session?.user;

      if (!supabaseUser) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const { data: profile, error } = await supabase
          .from('promo_mea_table')
          .select('*')
          .eq('id', supabaseUser.id)
          .single();

        if (error && error.code !== 'PGRST116') { // PGRST116 means no rows found
            console.error('Error fetching profile:', error);
            if(error.code !== 'PGRST116'){
              await signOut();
              return;
            }
        }

        if (profile) {
            const fullUser: User = {
                ...profile,
                email: supabaseUser.email || '',
            };
            setUser(fullUser);
        } else {
            // Profile does not exist, let's create it with a retry mechanism for promo_id collision
            const fullName = supabaseUser.user_metadata?.full_name || 'New User';
            const avatarUrl = supabaseUser.user_metadata?.avatar_url || `https://placehold.co/100x100.png?text=${fullName.charAt(0) || 'U'}`;
            let newlyCreatedProfile = null;
            let attempts = 0;
            const maxAttempts = 3;

            while (attempts < maxAttempts && !newlyCreatedProfile) {
                attempts++;
                const newPromoId = generatePromoId();
                const newProfileData = {
                    id: supabaseUser.id,
                    promo_id: newPromoId,
                    full_name: fullName,
                    avatar_url: avatarUrl,
                    current_tier: 'PT',
                    referral_count: 0,
                    events_added: 0,
                    current_earnings: 0,
                    lifetime_earnings: 0,
                    upcoming_payout: 0,
                    email_notifications_enabled: true,
                    promotional_updates_enabled: false,
                };

                const { data, error: insertError } = await supabase
                    .from('promo_mea_table')
                    .insert(newProfileData)
                    .select()
                    .single();
                
                if (insertError) {
                    // 23505 is the PostgreSQL error code for unique_violation
                    if (insertError.code === '23505') { 
                        console.warn(`Promo ID collision detected. Retrying... (Attempt ${attempts})`);
                        continue; // Loop again to generate a new promo_id
                    }
                    // For any other error, break the loop and throw it
                    throw insertError;
                }
                newlyCreatedProfile = data;
            }

            if (!newlyCreatedProfile) {
              throw new Error(`Failed to create profile after ${maxAttempts} attempts.`);
            }

            const fullUser: User = {
                ...newlyCreatedProfile,
                email: supabaseUser.email || '',
            };
            setUser(fullUser);
        }

      } catch (e: any) {
        console.error('Fatal error in auth handler, signing out:', e);
        await signOut();
      } finally {
        setLoading(false);
      }
    },
    [signOut]
  );

  useEffect(() => {
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      await handleAuthChange('INITIAL_SESSION', session);
    };

    getInitialSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(handleAuthChange);

    return () => {
      subscription?.unsubscribe();
    };
  }, [handleAuthChange]);

  return (
    <AuthContext.Provider value={{ user, loading, signOut, setUser }}>
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
