
'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import type { AuthChangeEvent, Session, User as SupabaseUser } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabaseClient';
import type { User } from '@/lib/types';
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
        // Use a short delay to allow the DB trigger to complete
        await new Promise(resolve => setTimeout(resolve, 500));

        const { data, error } = await supabase
          .from('promo_profile')
          .select('*')
          .eq('id', supabaseUser.id)
          .single();

        if (error) {
          console.error('Error fetching user profile:', error);
          setUser(null);
          return;
        }

        if (data) {
           setUser({
            ...data,
            email: supabaseUser.email || null,
          });
        }
      } catch (e) {
        console.error('An unexpected error occurred while fetching profile:', e);
        setUser(null);
      }
    };
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event: AuthChangeEvent, session: Session | null) => {
        setLoading(true);
        if (session?.user) {
          await fetchUserProfile(session.user);
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    );

    // Check for initial session
    const checkInitialSession = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
            await fetchUserProfile(session.user);
        }
        setLoading(false);
    };

    checkInitialSession();

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

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
