
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Check, ArrowDown } from "lucide-react";
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
                <section className="relative w-full bg-gradient-to-r from-red-500 to-rose-400 py-24 sm:py-32 lg:py-40 text-white overflow-hidden">
                    <div className="absolute inset-0 bg-[url('/dots.svg')] bg-repeat opacity-20"></div>
                    <div className="container relative grid lg:grid-cols-2 items-center gap-12">
                        <div className="space-y-6 text-center lg:text-left">
                            <h1 className="text-4xl font-headline font-bold tracking-tight sm:text-5xl md:text-6xl text-white">
                                INCREASE YOUR IMPACT & INCOME WITH BEING A PROMO
                            </h1>
                            <p className="text-lg text-white/90">
                                investing in your future while you invest in yourself!
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                <Button size="lg" asChild className="bg-white text-red-500 hover:bg-white/90">
                                    <Link href="/signup">Register Now</Link>
                                </Button>
                                <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white/10 hover:text-white">
                                    <Link href="#how-it-works">Learn More</Link>
                                </Button>
                            </div>
                        </div>
                        <div className="relative hidden lg:flex items-center justify-center">
                            <div className="w-64 h-64 bg-white/90 rounded-full flex items-center justify-center shadow-2xl backdrop-blur-sm">
                                <span className="text-8xl font-serif text-red-500">mea</span>
                            </div>
                            <div className="absolute -inset-16 bg-white/10 rounded-full blur-3xl"></div>
                        </div>
                    </div>
                     <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/80">
                        <span>Scroll to explore</span>
                        <ArrowDown className="w-5 h-5 animate-bounce" />
                    </div>
                </section>

                <section id="how-it-works" className="bg-muted py-12 lg:py-24">
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
                                    <span><strong>Register:</strong> Sign up as a ProMo MEA affiliate to get your unique referral code.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Check className="h-5 w-5 text-primary mt-1" />
                                    <span><strong>Refer Organizers:</strong> Share your code with event organizers. When they sign up and add events to MEA, you get credit.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Check className="h-5 w-5 text-primary mt-1" />
                                    <span><strong>Earn Commission:</strong> Receive a commission from the ticket sales of every event hosted by your referred organizers.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>
                
                <section className="container py-12 lg:py-24">
                     <div className="text-center mb-12">
                        <h2 className="text-3xl font-headline font-bold">Tiers & Commissions</h2>
                        <p className="mx-auto max-w-[700px] text-muted-foreground mt-2">
                            The more successful events your referred organizers create, the more you earn. Advance through tiers to unlock higher commission rates.
                        </p>
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                        {tiers.map((tier) => (
                        <Card key={tier.name} className="flex flex-col">
                            <CardHeader>
                            <CardTitle className="flex flex-col items-start gap-2">
                                <span className="text-primary text-3xl font-bold">{tier.commission}%</span>
                                <span>{tier.name}</span>
                            </CardTitle>
                            <CardDescription>{tier.description}</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                    {tier.benefits.map((benefit, index) => (
                                        <li key={index} className="flex items-start gap-2">
                                            <Check className="h-4 w-4 text-primary mt-1 shrink-0" />
                                            <span>{benefit}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
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
