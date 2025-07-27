
'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  href: string;
  icon: LucideIcon;
  label: string;
}

interface BottomNavProps {
  items: NavItem[];
}

export default function BottomNav({ items }: BottomNavProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/dashboard') {
        return pathname === href;
    }
    return pathname.startsWith(href) && (href !== '/dashboard' || pathname === href);
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-background border-t">
      <div className="flex justify-around">
        {items.map((item) => (
          <Link key={item.href} href={item.href}>
            <div
              className={cn(
                'flex flex-col items-center justify-center p-2 text-muted-foreground w-20 h-16 transition-colors',
                isActive(item.href) ? 'text-primary' : 'hover:text-primary'
              )}
            >
              <item.icon className="h-6 w-6 mb-1" />
              <span className="text-xs">{item.label}</span>
            </div>
          </Link>
        ))}
      </div>
    </nav>
  );
}
