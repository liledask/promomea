
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

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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
          .single();

        if (error) {
          // This can happen if the user exists in auth but the trigger failed.
          // Log the error and sign out to prevent the app from being in a broken state.
          console.error('Error fetching profile for user. Signing out.', error);
          await supabase.auth.signOut();
          setUser(null);
          return;
        }

        if (profile) {
          const fullUser: User = {
            ...profile,
            email: supabaseUser.email || '',
          };
          setUser(fullUser);
        } else {
          // This case should ideally not be reached if the trigger is working correctly.
          console.warn('Profile not found for a logged-in user. Signing out.');
          await supabase.auth.signOut();
          setUser(null);
        }
      } catch (e) {
        console.error('An unexpected error occurred while fetching profile:', e);
        setUser(null);
        await supabase.auth.signOut();
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    // Immediately fetch the current session to initialize the user state.
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      // Use the same handler to avoid duplicating logic
      await handleAuthChange('INITIAL_SESSION', session);
    };

    getInitialSession();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(handleAuthChange);

    return () => {
      subscription?.unsubscribe();
    };
  }, [handleAuthChange]);

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push('/login');
  };

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
