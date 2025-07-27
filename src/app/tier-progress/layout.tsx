
'use client';

import { useState, useEffect } from 'react';
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
import { getCurrentUser } from '@/lib/data';

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

export default function AppLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  if (!user) {
    // You can return a loader here
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
      <div className="flex flex-col min-h-screen">
        <Header user={user} />
        <main className="flex-1 p-4 md:p-8">
            {children}
        </main>
      </div>
    </SidebarInset>
  </SidebarProvider>
  );
}
