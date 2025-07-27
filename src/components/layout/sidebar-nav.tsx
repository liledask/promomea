
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { LucideIcon } from 'lucide-react';
import {
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarSeparator,
} from '@/components/ui/sidebar';

interface NavItem {
  href: string;
  icon: LucideIcon;
  label: string;
}

interface SidebarNavProps {
  primaryItems: NavItem[];
  secondaryItems: NavItem[];
}

export default function SidebarNav({ primaryItems, secondaryItems }: SidebarNavProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    // Exact match for dashboard
    if (href === '/dashboard') {
        return pathname === href || pathname === '/';
    }
    // Starts with for other pages
    return pathname.startsWith(href);
  }

  return (
    <>
      <SidebarHeader>
        <div className="flex items-center gap-2 p-2">
          <span className="text-lg font-headline font-bold">ProMo MEA</span>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {primaryItems.map((item, index) => (
            <SidebarMenuItem key={index}>
              <SidebarMenuButton asChild isActive={isActive(item.href)} tooltip={{children: item.label}}>
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-2">
        <SidebarSeparator />
        <SidebarMenu>
          {secondaryItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton asChild isActive={isActive(item.href)} tooltip={{children: item.label}}>
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarFooter>
    </>
  );
}
