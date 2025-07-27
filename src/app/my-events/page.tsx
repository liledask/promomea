
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
import { CalendarDays, PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

const events = [
  {
    name: "MEA Annual Conference 2025",
    date: "2025-10-15",
    commission: 45.75,
    status: "Completed",
  },
  {
    name: "Tech Innovators Summit",
    date: "2025-11-05",
    commission: 22.50,
    status: "Completed",
  },
  {
    name: "Marketing Mastery Workshop",
    date: "2025-11-20",
    commission: 0,
    status: "Upcoming",
  },
    {
    name: "Future of Work Expo",
    date: "2025-12-01",
    commission: 0,
    status: "Upcoming",
  },
  {
    name: "Design Thinking Bootcamp",
    date: "2024-09-30",
    commission: 15.00,
    status: "Completed",
  },
];

export default function MyEventsPage() {
  return (
    <div className="space-y-8">
       <div className="flex items-center justify-between">
        <div>
            <h1 className="text-3xl font-headline font-bold">My Events</h1>
            <p className="text-muted-foreground">Track and manage all the events you&apos;ve added.</p>
        </div>
        <Button>
            <PlusCircle className="mr-2" />
            Add New Event
        </Button>
       </div>

      <Card>
        <CardHeader>
          <CardTitle>Event History</CardTitle>
          <CardDescription>
            A list of all events you have successfully referred to the platform.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Event Name</TableHead>
                <TableHead>Event Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Commission Earned</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events.map((event) => (
                <TableRow key={event.name}>
                  <TableCell className="font-medium">{event.name}</TableCell>
                  <TableCell>{new Date(event.date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge variant={event.status === 'Completed' ? 'secondary' : 'outline'}>
                      {event.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {event.commission > 0 ? `$${event.commission.toFixed(2)}` : '-'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
