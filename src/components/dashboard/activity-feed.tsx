import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const activities = [
  {
    icon: 'https://placehold.co/40x40',
    description: "You earned 3% commission from John's event.",
    time: '2 hours ago',
    user: 'JD',
    aiHint: 'event ticket'
  },
  {
    icon: 'https://placehold.co/40x40',
    description: 'A new user signed up with your referral link.',
    time: '1 day ago',
    user: 'SU',
    aiHint: 'user signup'
  },
  {
    icon: 'https://placehold.co/40x40',
    description: "You earned 5% commission from Sarah's workshop.",
    time: '3 days ago',
    user: 'SW',
    aiHint: 'commission earnings'
  },
    {
    icon: 'https://placehold.co/40x40',
    description: 'Your payout of $1250.00 has been processed.',
    time: '5 days ago',
    user: '$',
    aiHint: 'money transfer'
  },
];

export default function ActivityFeed() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-xl">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-start gap-4">
              <Avatar className="h-9 w-9">
                <AvatarImage src={activity.icon} alt="Activity" data-ai-hint={activity.aiHint} />
                <AvatarFallback>{activity.user}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm">{activity.description}</p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
