
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
          .from('promo_profile')
          .select('*')
          .eq('id', supabaseUser.id)
          .maybeSingle();

        if (error && error.code !== 'PGRST116') { // PGRST116 means no rows found, which is ok
            console.error('Error fetching profile:', error);
            await signOut();
            return;
        }

        if (profile) {
            const fullUser: User = {
                ...profile,
                email: supabaseUser.email || '',
            };
            setUser(fullUser);
        } else {
            // Profile does not exist, let's create it.
            const newPromoId = generatePromoId();
            const fullName = supabaseUser.user_metadata?.full_name || 'New User';
            const avatarUrl = supabaseUser.user_metadata?.avatar_url || `https://placehold.co/100x100.png?text=${fullName.charAt(0) || 'U'}`;
            
            const newProfileData = {
                id: supabaseUser.id,
                promo_id: newPromoId,
                full_name: fullName,
                avatar_url: avatarUrl,
            };

            const { data: newlyCreatedProfile, error: insertError } = await supabase
                .from('promo_profile')
                .insert(newProfileData)
                .select()
                .single();

            if (insertError) {
                console.error("Fatal error: Could not create profile for new user.", insertError);
                await signOut();
                return;
            }

            const fullUser: User = {
                ...newlyCreatedProfile,
                email: supabaseUser.email || '',
            };
            setUser(fullUser);
        }

      } catch (e) {
        console.error('An unexpected error occurred in auth handler, signing out:', e);
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
