
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
import { SidebarProvider, Sidebar, SidebarInset } from '@/components/ui/sidebar';
import Header from '@/components/layout/header';
import SidebarNav from '@/components/layout/sidebar-nav';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';

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

  // Show the main layout shell immediately, even while loading.
  // The loading spinner will be shown inside the content area.
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
          {user && <Header user={user} />}
          <main className="flex-1 p-4 sm:p-6">
            {loading || !user ? (
                 <div className="flex h-[calc(100vh-4rem)] w-full items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            ) : (
                children
            )}
          </main>
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
