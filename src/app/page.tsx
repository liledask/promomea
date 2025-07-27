
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TIER_DETAILS } from "@/lib/constants";

const tiers = Object.values(TIER_DETAILS).slice(0, 5);


export default function LandingPage() {
    return (
        <div className="flex flex-col min-h-screen bg-background">
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-14 items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <span className="font-headline text-xl font-bold">ProMo MEA</span>
                    </Link>
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" asChild>
                            <Link href="/login">Login</Link>
                        </Button>
                        <Button asChild>
                            <Link href="/signup">Sign Up</Link>
                        </Button>
                    </div>
                </div>
            </header>

            <main className="flex-1">
                <section className="container py-12 text-center lg:py-24">
                    <h1 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl md:text-6xl">
                        Earn More with Every Event
                    </h1>
                    <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mt-4">
                        Join the ProMo MEA Affiliate Program and turn your connections into cash. Add events, share your code, and watch your earnings grow.
                    </p>
                    <div className="mt-6">
                        <Button size="lg" asChild>
                            <Link href="/signup">Become a ProMo Affiliate</Link>
                        </Button>
                    </div>
                </section>

                <section className="bg-muted py-12 lg:py-24">
                    <div className="container grid items-center gap-6 lg:grid-cols-2 lg:gap-12">
                        <Image 
                            src="https://placehold.co/600x400.png"
                            alt="Events"
                            width={600}
                            height={400}
                            className="rounded-lg"
                            data-ai-hint="crowd event"
                        />
                        <div className="space-y-4">
                            <h2 className="text-3xl font-headline font-bold">How It Works</h2>
                            <p className="text-muted-foreground">
                                Becoming a Certified ProMo Affiliate is simple. You earn money just by referring event organizers to the My Event Advisor (MEA) platform.
                            </p>
                            <ul className="space-y-2">
                                <li className="flex items-start gap-2">
                                    <Check className="h-5 w-5 text-primary mt-1" />
                                    <span><strong>Register:</strong> Sign up to become a ProMo MEA affiliate and get your unique referral code.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Check className="h-5 w-5 text-primary mt-1" />
                                    <span><strong>Refer:</strong> Share your code with event organizers. When they add an event to MEA, you get credit.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Check className="h-5 w-5 text-primary mt-1" />
                                    <span><strong>Earn:</strong> Receive a commission on ticket sales from every event you successfully refer.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>
                
                <section className="container py-12 lg:py-24">
                     <div className="text-center mb-12">
                        <h2 className="text-3xl font-headline font-bold">Tiers & Commissions</h2>
                        <p className="mx-auto max-w-[700px] text-muted-foreground mt-2">
                            The more events you add, the more you earn. Advance through the tiers to unlock higher commission rates.
                        </p>
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {tiers.map((tier) => (
                        <Card key={tier.name}>
                            <CardHeader>
                            <CardTitle className="flex justify-between items-baseline">
                                <span>{tier.name}</span>
                                <span className="text-2xl font-bold text-primary">{tier.commission}%</span>
                            </CardTitle>
                            <CardDescription>{tier.description}</CardDescription>
                            </CardHeader>
                        </Card>
                        ))}
                    </div>
                </section>

                 <section className="bg-primary text-primary-foreground py-12 lg:py-24">
                    <div className="container text-center">
                         <h2 className="text-3xl font-headline font-bold">Ready to Start Earning?</h2>
                         <p className="mx-auto max-w-[600px] opacity-90 mt-2 mb-6">
                            Join a community of successful affiliates and start your journey with ProMo MEA today.
                         </p>
                         <Button size="lg" variant="secondary" asChild>
                            <Link href="/signup">Sign Up Now</Link>
                        </Button>
                    </div>
                 </section>
            </main>

            <footer className="border-t">
                <div className="container flex items-center justify-between py-6 text-sm text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} ProMo MEA. All rights reserved.</p>
                     <p>ProMo MEA - An Event Affiliate Program for My Event Advisor</p>
                </div>
            </footer>
        </div>
    )
}
