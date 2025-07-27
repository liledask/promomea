
import { Bell } from 'lucide-react';
import type { User } from '@/lib/types';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { UserNav } from './user-nav';
import Link from 'next/link';

interface HeaderProps {
  user: User;
}

export default function Header({ user }: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 flex h-14 items-center gap-2 border-b bg-background/80 px-4 backdrop-blur-sm sm:h-16 md:px-6">
      <SidebarTrigger className="md:hidden" />
      <div className="flex-1">
        <Link href="/dashboard">
          <h1 className="text-base font-bold text-foreground sm:text-xl">
            ProMo MEA
          </h1>
        </Link>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
          <Bell className="h-4 w-4" />
          <span className="sr-only">Toggle notifications</span>
        </Button>
        <UserNav user={user} />
      </div>
    </header>
  );
}
