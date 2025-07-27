
'use client';

import { AuthProvider, useAuth } from '@/hooks/use-auth';
import {
  Home,
  CalendarDays,
  DollarSign,
  Trophy,
  Star,
  Link2,
  Settings,
  HelpCircle,
} from 'lucide-react';
import type { User } from '@/lib/types';
import { SidebarProvider, Sidebar, SidebarInset } from '@/components/ui/sidebar';
import Header from '@/components/layout/header';
import SidebarNav from '@/components/layout/sidebar-nav';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const navigationItems = [
  { href: '/dashboard', icon: Home, label: 'Dashboard' },
  { href: '/my-events', icon: CalendarDays, label: 'My Events' },
  { href: '/my-earnings', icon: DollarSign, label: 'My Earnings' },
  { href: '/tier-progress', icon: Trophy, label: 'Tier Progress' },
  { href: '/bonuses-awards', icon: Star, label: 'Bonuses & Awards' },
  { href: '/referral', icon: Link2, label: 'Referral' },
];

const secondaryNavigationItems = [
  { href: '/settings', icon: Settings, label: 'Settings' },
  { href: '/support', icon: HelpCircle, label: 'Support' },
];

function AppLayoutContent({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return <div>Loading...</div>;
  }
    
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarNav
          primaryItems={navigationItems}
          secondaryItems={secondaryNavigationItems}
        />
      </Sidebar>
      <SidebarInset>
        <div className="flex min-h-screen flex-col">
          <Header user={user} />
          <main className="flex-1 p-4 sm:p-6">{children}</main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}


export default function AppLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
  return (
    <AuthProvider>
      <AppLayoutContent>{children}</AppLayoutContent>
    </AuthProvider>
  );
}
