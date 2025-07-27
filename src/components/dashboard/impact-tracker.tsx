
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/use-auth';
import { Skeleton } from '@/components/ui/skeleton';
import { Users } from 'lucide-react';


export default function ImpactTracker() {
  const { user } = useAuth();
  
  return (
    <Card className="bg-primary text-primary-foreground overflow-hidden">
      <CardHeader>
        <CardTitle className="font-headline text-xl">Your Impact</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center text-center relative py-6">
        <Users className="h-16 w-16 mb-4 opacity-90" />
        {user ? (
          <>
            <p className="font-bold text-5xl">{user.referral_count || 0}</p>
            <p className="text-sm opacity-90 max-w-[90%]">Organizers referred who have signed up and started adding events!</p>
          </>
        ) : (
           <div className="flex flex-col items-center space-y-2">
                <Skeleton className="h-12 w-20 bg-primary-foreground/20" />
                <Skeleton className="h-4 w-48 bg-primary-foreground/20" />
           </div>
        )}
      </CardContent>
    </Card>
  );
}
