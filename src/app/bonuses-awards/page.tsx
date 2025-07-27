
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { CheckCircle2, Circle, Gift, Trophy } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const awards = [
  {
    icon: Trophy,
    title: "Fast Starter",
    description: "Add 5 events within your first 30 days.",
    status: "Achieved",
    progress: 100,
  },
  {
    icon: Gift,
    title: "Q3 Top Earner",
    description: "Be in the top 10% of earners for the quarter.",
    status: "In Progress",
    progress: 75,
  },
  {
    icon: Trophy,
    title: "Century Club",
    description: "Successfully add 100 total events.",
    status: "In Progress",
    progress: 42,
  },
  {
    icon: Gift,
    title: "Annual Excellence Award",
    description: "Maintain DPCA tier or higher for 12 consecutive months.",
    status: "Locked",
    progress: 0,
  },
];

export default function BonusesAwardsPage() {
  return (
    <div className="space-y-8">
        <div>
            <h1 className="text-3xl font-headline font-bold">Bonuses & Awards</h1>
            <p className="text-muted-foreground">Recognizing your exceptional performance and dedication.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {awards.map((award, index) => (
            <Card key={index} className="flex flex-col">
              <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-4">
                        <award.icon className="w-8 h-8 text-accent" />
                        <div>
                            <CardTitle>{award.title}</CardTitle>
                            <CardDescription>{award.description}</CardDescription>
                        </div>
                    </div>
                    {award.status === 'Achieved' && <Badge variant="secondary" className="bg-green-100 text-green-800">Achieved</Badge>}
                  </div>
              </CardHeader>
              <CardContent className="flex-grow">
                 {award.status !== 'Achieved' && (
                    <div>
                        <div className="flex justify-between items-center mb-1">
                            <p className="text-sm font-medium text-muted-foreground">{award.status}</p>
                            <p className="text-sm font-bold text-primary">{award.progress}%</p>
                        </div>
                        <Progress value={award.progress} className="h-2" />
                    </div>
                 )}
              </CardContent>
            </Card>
          ))}
        </div>
    </div>
  );
}
