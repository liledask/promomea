
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { useAuth } from '@/hooks/use-auth';
import { Skeleton } from '@/components/ui/skeleton';


export default function ImpactTracker() {
  const { user } = useAuth();
  
  return (
    <Card className="bg-primary text-primary-foreground overflow-hidden">
      <CardHeader>
        <CardTitle className="font-headline text-xl">Your Impact</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center text-center relative pt-0">
        <Image
          src="https://placehold.co/300x200"
          alt="Children smiling"
          width={300}
          height={200}
          className="rounded-lg mb-4"
          data-ai-hint="happy child"
        />
        {user ? (
          <>
            <p className="font-bold text-4xl">{user.referral_count || 0}</p>
            <p className="text-sm opacity-90">Organizers referred who have signed up and started adding events!</p>
          </>
        ) : (
           <div className="flex flex-col items-center space-y-2">
                <Skeleton className="h-10 w-16 bg-primary-foreground/20" />
                <Skeleton className="h-4 w-48 bg-primary-foreground/20" />
           </div>
        )}
      </CardContent>
    </Card>
  );
}
