
'use client';

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

// Dummy data for a new user
const newUser: User = {
  name: 'Alex Doe',
  avatarUrl: 'https://placehold.co/100x100',
  currentTier: 'PT',
  currentEarnings: 75.5,
  lifetimeEarnings: 75.5,
  eventsAdded: 3,
  upcomingPayout: 0,
};

// Dummy data for an experienced user
const experiencedUser: User = {
    name: 'Jessica Wang',
    avatarUrl: 'https://placehold.co/100x100',
    currentTier: 'DPCA',
    currentEarnings: 1850.75,
    lifetimeEarnings: 7540.25,
    eventsAdded: 42,
    upcomingPayout: 1250.00,
};


const navigationItems = [
  { href: '/dashboard', icon: Home, label: 'Dashboard' },
  { href: '/my-events', icon: CalendarDays, label: 'My Events' },
  { href: '/my-earnings', icon: DollarSign, label: 'My Earnings' },
  { href: '/tier-progress', icon: Trophy, label: 'Tier Progress' },
  { href: '/bonuses-awards', icon: Star, label: 'Bonuses & Awards' },
  { href: '/referral', icon: Link2, label: 'Referral Code & Link' },
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
    const user = experiencedUser;
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
