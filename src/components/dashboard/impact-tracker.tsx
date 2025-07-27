import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

export default function ImpactTracker() {
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
          data-ai-hint="happy children"
        />
        <p className="font-bold text-4xl">47</p>
        <p className="text-sm opacity-90">Children supported through the MEA Launch Box Program thanks to your efforts!</p>
      </CardContent>
    </Card>
  );
}
