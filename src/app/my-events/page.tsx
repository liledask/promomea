
'use client';

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Eye, Share2, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { ProMoEvent, User } from "@/lib/types";
import Link from "next/link";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { getCurrentUser } from "@/lib/data";

const initialEvents: ProMoEvent[] = [
  {
    id: "mea-annual-conference-2025",
    name: "MEA Annual Conference 2025",
    date: "2025-10-15",
    commission: 45.75,
    status: "Completed",
  },
  {
    id: "tech-innovators-summit",
    name: "Tech Innovators Summit",
    date: "2025-11-05",
    commission: 22.50,
    status: "Completed",
  },
  {
    id: "marketing-mastery-workshop",
    name: "Marketing Mastery Workshop",
    date: "2025-11-20",
    commission: 0,
    status: "Upcoming",
  },
    {
    id: "future-of-work-expo",
    name: "Future of Work Expo",
    date: "2025-12-01",
    commission: 0,
    status: "Upcoming",
  },
  {
    id: "design-thinking-bootcamp",
    name: "Design Thinking Bootcamp",
    date: "2024-09-30",
    commission: 15.00,
    status: "Completed",
  },
];

export default function MyEventsPage() {
  const [events, setEvents] = useState<ProMoEvent[]>(initialEvents);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<ProMoEvent | null>(null);
  const { toast } = useToast();
  const user = getCurrentUser(); // In a real app, this might come from context or a hook

  const generateReferralLink = (event: ProMoEvent | null) => {
    if (!event || !user) return "";
    return `https://myeventadvisor.com/events/${event.id}?ref=${user.referralCode}`;
  };

  const handleShareClick = (event: ProMoEvent) => {
    setSelectedEvent(event);
    setIsShareDialogOpen(true);
  };
  
  const handleCopy = (textToCopy: string) => {
    navigator.clipboard.writeText(textToCopy);
    toast({
      title: "Copied to Clipboard!",
      description: `The event referral link has been copied.`,
    });
  };

  const handleShare = async (shareLink: string) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Check out this event: ${selectedEvent?.name}`,
          text: `Use my link to check out the event: ${selectedEvent?.name}`,
          url: shareLink,
        });
        toast({ title: 'Link Shared!', description: 'The event referral link has been shared.' });
      } catch (error) {
        toast({ variant: 'destructive', title: 'Share Failed', description: 'Could not share the link.' });
      }
    } else {
        handleCopy(shareLink);
        toast({ title: 'Link Copied!', description: 'Web Share not supported. Link copied to clipboard instead.' });
    }
  };

  const referralLink = generateReferralLink(selectedEvent);

  return (
    <>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
              <h1 className="text-3xl font-headline font-bold">My Events</h1>
              <p className="text-muted-foreground">Track all the events you've successfully referred to MEA.</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Referred Event History</CardTitle>
            <CardDescription>
              A list of all events that have been added to MEA using your referral code.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Event Name</TableHead>
                  <TableHead>Event Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Commission Earned</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {events.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell className="font-medium">{event.name}</TableCell>
                    <TableCell>{new Date(event.date).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge variant={event.status === 'Completed' ? 'secondary' : 'outline'}>
                        {event.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {event.commission > 0 ? `$${event.commission.toFixed(2)}` : '-'}
                    </TableCell>
                    <TableCell className="text-right space-x-1">
                      <Button variant="ghost" size="icon" title="Share Event" onClick={() => handleShareClick(event)}>
                         <Share2 className="h-4 w-4" />
                         <span className="sr-only">Share Event</span>
                      </Button>
                      <Button variant="ghost" size="icon" asChild>
                          <Link href={`https://myeventadvisor.com/events/${event.id}`} target="_blank" title="View on MEA">
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">View on MEA</span>
                          </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share Event</DialogTitle>
            <DialogDescription>
              Share this event-specific link to get credit for referrals.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Input
                id="link"
                defaultValue={referralLink}
                readOnly
              />
            </div>
            <Button size="icon" variant="outline" className="px-3" onClick={() => handleCopy(referralLink)}>
              <span className="sr-only">Copy</span>
              <Copy className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="outline" className="px-3" onClick={() => handleShare(referralLink)}>
              <span className="sr-only">Share</span>
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
