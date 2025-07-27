
'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
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
    // Firebase auth listener will go here
    const unsubscribe = () => {};

    // For now, let's simulate a logged-out user
    setLoading(true);
    setUser(null);
    setLoading(false);
    
    // In a real scenario, you'd check auth state and redirect
    // if (!user && window.location.pathname !== '/login' && window.location.pathname !== '/signup' && window.location.pathname !== '/') {
    //    router.push('/login');
    // }

    return () => unsubscribe();
  }, [router]);

  const signOut = async () => {
    // Firebase signout logic will go here
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
