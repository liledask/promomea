
'use client';

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Eye, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { ProMoEvent } from "@/lib/types";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { getCurrentUser } from "@/lib/data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const allMeaEvents: ProMoEvent[] = [
    {
        id: 'mea-annual-conference-2025',
        name: 'MEA Annual Conference 2025',
        date: '2025-10-15',
        commission: 45.75,
        status: 'Completed',
    },
    {
        id: 'tech-innovators-summit',
        name: 'Tech Innovators Summit',
        date: '2025-11-05',
        commission: 22.5,
        status: 'Completed',
    },
    {
        id: 'marketing-mastery-workshop',
        name: 'Marketing Mastery Workshop',
        date: '2025-11-20',
        commission: 0,
        status: 'Upcoming',
    },
    {
        id: 'future-of-work-expo',
        name: 'Future of Work Expo',
        date: '2025-12-01',
        commission: 0,
        status: 'Upcoming',
    },
    {
        id: 'design-thinking-bootcamp',
        name: 'Design Thinking Bootcamp',
        date: '2024-09-30',
        commission: 15,
        status: 'Completed',
    },
    {
        id: 'global-finance-symposium',
        name: 'Global Finance Symposium',
        date: '2026-01-22',
        commission: 0,
        status: 'Upcoming',
    },
    {
        id: 'health-wellness-expo',
        name: 'Health & Wellness Expo',
        date: '2026-02-18',
        commission: 0,
        status: 'Upcoming',
    },
    {
        id: 'sustainable-living-fair',
        name: 'Sustainable Living Fair',
        date: '2026-03-10',
        commission: 0,
        status: 'Upcoming',
    },
    {
        id: 'ai-in-business-conference',
        name: 'AI in Business Conference',
        date: '2026-04-05',
        commission: 0,
        status: 'Upcoming',
    },
    {
        id: 'culinary-arts-festival',
        name: 'Culinary Arts Festival',
        date: '2026-05-20',
        commission: 0,
        status: 'Upcoming',
    },
];

export default function MyEventsPage() {
  const [events, setEvents] = useState<ProMoEvent[]>(allMeaEvents);
  const { toast } = useToast();
  const user = getCurrentUser();

  const generateReferralLink = (event: ProMoEvent) => {
    if (!event || !user) return "";
    return `https://myeventadvisor.com/events/${event.id}?ref=${user.referralCode}`;
  };
  
  const handleCopy = (textToCopy: string) => {
    navigator.clipboard.writeText(textToCopy);
    toast({
      title: "Copied to Clipboard!",
      description: `The event referral link has been copied.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-2xl font-headline font-bold">Browse MEA Events</h1>
            <p className="text-sm text-muted-foreground">Generate and share referral links for any event.</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Event Catalog</CardTitle>
          <CardDescription>
            A list of all events on MEA. Copy your unique referral link to share it.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Event Name</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Affiliate Link</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {events.map((event) => {
                  const referralLink = generateReferralLink(event);
                  return (
                    <TableRow key={event.id}>
                      <TableCell className="font-medium whitespace-nowrap">{event.name}</TableCell>
                      <TableCell className="whitespace-nowrap">{new Date(event.date).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge variant={event.status === 'Completed' ? 'secondary' : 'outline'}>
                          {event.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2" style={{minWidth: '300px'}}>
                            <Input readOnly value={referralLink} className="bg-muted text-xs flex-1"/>
                            <Button size="icon" variant="ghost" onClick={() => handleCopy(referralLink)}>
                                <Copy className="h-4 w-4" />
                                <span className="sr-only">Copy Link</span>
                            </Button>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" asChild>
                            <Link href={`https://myeventadvisor.com/events/${event.id}`} target="_blank" title="View on MEA">
                              <Eye className="h-4 w-4" />
                              <span className="sr-only">View on MEA</span>
                            </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
