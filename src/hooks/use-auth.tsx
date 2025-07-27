
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
    const fetchUserProfile = async (supabaseUser: SupabaseUser | null) => {
      if (!supabaseUser) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        // Wait a moment for the trigger to potentially complete
        await new Promise(resolve => setTimeout(resolve, 500));

        const { data: profile, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', supabaseUser.id)
          .single();

        if (error) {
          console.warn('Could not fetch user profile:', error.message);
          setUser(null); // Set user to null if profile doesn't exist
        } else {
          setUser(profile);
        }
      } catch (error) {
        console.error('Error fetching user profile:', (error as Error).message);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        fetchUserProfile(session?.user ?? null);
    });

    // Fetch initial user
    const getInitialUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      fetchUserProfile(session?.user ?? null);
    }
    getInitialUser();

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
