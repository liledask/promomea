
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Check, ArrowDown, Briefcase, Target, Users, BookOpen, Star, BarChart, Award, FolderKanban, HandCoins, Network, Presentation } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TIER_DETAILS } from "@/lib/constants";

const tiers = Object.values(TIER_DETAILS);

const benefits = [
    {
        icon: BarChart,
        title: "Competitive Commissions",
        description: "Earn attractive commissions for every successful event registration through your unique referral links.",
    },
    {
        icon: Star,
        title: "Exclusive Access",
        description: "Get early access to event information, VIP tickets, and behind-the-scenes content to share with your audience.",
    },
    {
        icon: FolderKanban,
        title: "Marketing Resources",
        description: "Access our library of promotional materials, templates, and strategies to boost your promotional efforts.",
    },
    {
        icon: Network,
        title: "Network Growth",
        description: "Connect with event organizers, venues, and fellow promoters across the MEA region to expand your professional network.",
    },
    {
        icon: Award,
        title: "Performance Bonuses",
        description: "Earn additional rewards when you exceed promotion targets or drive exceptional attendance to events.",
    },
    {
        icon: Presentation,
        title: "Analytics Dashboard",
        description: "Track your performance with real-time analytics on clicks, conversions, and earnings to optimize your strategy.",
    },
    {
        icon: HandCoins,
        title: "Recognition & Awards",
        description: "Get featured as a top ProMo and receive awards for outstanding promotional achievements.",
    },
    {
        icon: BookOpen,
        title: "Skill Development",
        description: "Enhance your digital marketing, content creation, and networking skills through our training resources.",
    },
    {
        icon: Users,
        title: "Legacy",
        description: "Commissions will pass down to your children or next to kin.",
    },
];


export default function LandingPage() {
    return (
        <div className="flex flex-col min-h-screen bg-background">
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-14 items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <span className="font-headline text-xl font-bold">ProMo MEA</span>
                    </Link>
                    <nav className="hidden md:flex gap-6">
                        <Link href="#what-is-it" className="text-sm font-medium hover:underline underline-offset-4">What is ProMo MEA?</Link>
                        <Link href="#benefits" className="text-sm font-medium hover:underline underline-offset-4">Benefits</Link>
                    </nav>
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
                <section className="relative w-full bg-primary py-24 sm:py-32 lg:py-40 text-primary-foreground overflow-hidden">
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
                                <Button size="lg" asChild className="bg-white text-primary hover:bg-white/90">
                                    <Link href="/signup">Register Now</Link>
                                </Button>
                                <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white/10 hover:text-white">
                                    <Link href="#what-is-it">Learn More</Link>
                                </Button>
                            </div>
                        </div>
                         <div className="relative hidden lg:flex items-center justify-center">
                            <div className="w-64 h-64 bg-white/90 rounded-full flex items-center justify-center shadow-2xl backdrop-blur-sm">
                                <span className="text-8xl font-headline text-primary">mea</span>
                            </div>
                            <div className="absolute -inset-16 bg-white/10 rounded-full blur-3xl"></div>
                        </div>
                    </div>
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/80">
                        <span>Scroll to explore</span>
                        <ArrowDown className="w-5 h-5 animate-bounce" />
                    </div>
                </section>
                
                <section id="what-is-it" className="py-16 lg:py-24 bg-muted">
                    <div className="container">
                        <div className="max-w-3xl mx-auto text-center mb-12">
                            <h2 className="text-3xl font-headline font-bold">What is ProMo MEA?</h2>
                            <p className="mt-4 text-lg text-muted-foreground">
                                ProMo MEA is an Event Affiliate Program for My Event Advisor (MEA). A Certified ProMo allows you to earn extra money from events just by sending people to the MEA platform and providing your ProMo Code.
                            </p>
                        </div>
                        <div className="grid md:grid-cols-3 gap-8 text-center">
                            <div className="p-6 rounded-lg">
                                <Target className="h-10 w-10 mx-auto text-primary mb-4" />
                                <h3 className="text-xl font-semibold font-headline mb-2">The Purpose</h3>
                                <p className="text-muted-foreground">ProMo MEA is dedicated to elevating event visibility on the My Event Advisor platform. Successful events drive economic impact to MEA Foundations/MEA LaunchBox Program, where we focus on feeding children across the globe.</p>
                            </div>
                            <div className="p-6 rounded-lg">
                                <Users className="h-10 w-10 mx-auto text-primary mb-4" />
                                <h3 className="text-xl font-semibold font-headline mb-2">The Role of ProMos</h3>
                                <p className="text-muted-foreground">As a ProMo, you earn commission from ticket sales of events added to the platform through our tiered system. Start at 1% and advance up to 25% commission for life of the program, with additional benefits like stock shares.</p>
                            </div>
                             <div className="p-6 rounded-lg">
                                <Briefcase className="h-10 w-10 mx-auto text-primary mb-4" />
                                <h3 className="text-xl font-semibold font-headline mb-2">Program Structure</h3>
                                <p className="text-muted-foreground">Our 5-tier affiliate program offers escalating commission structures from 1% to 25%, performance bonuses, recognition awards, virtual onboarding, certificates, and even stock shares for top performers.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="levels" className="container py-16 lg:py-24">
                     <div className="text-center mb-12">
                        <h2 className="text-3xl font-headline font-bold">ProMo Affiliate Program Levels</h2>
                        <p className="mx-auto max-w-[700px] text-muted-foreground mt-4">
                            Our tiered affiliate program rewards you as you grow your network and help more event planners succeed.
                        </p>
                    </div>
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {tiers.map((tier) => (
                        <Card key={tier.name} className="flex flex-col border-2 hover:border-primary hover:shadow-lg transition-all">
                            <CardHeader className="text-center bg-muted">
                                <CardTitle className="flex flex-col items-center gap-2">
                                    <div className="text-5xl font-bold text-primary">{tier.commission}%</div>
                                    <div className="text-xl font-headline">{tier.name}</div>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="flex-grow p-6 space-y-4">
                                <div>
                                    <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-2">Requirements</h4>
                                    <p className="text-sm">{tier.description}</p>
                                </div>
                                <div className="pt-4 border-t">
                                     <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-2">Benefits</h4>
                                    <ul className="space-y-2 text-sm text-muted-foreground">
                                        {tier.benefits.map((benefit, index) => (
                                            <li key={index} className="flex items-start gap-2">
                                                <Check className="h-4 w-4 text-green-500 mt-1 shrink-0" />
                                                <span>{benefit}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                {tier.advanceRequirement && (
                                <div className="pt-4 border-t">
                                    <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-2">To Advance</h4>
                                    <p className="text-sm font-semibold">{tier.advanceRequirement}</p>
                                </div>
                                )}
                            </CardContent>
                        </Card>
                        ))}
                    </div>
                    <p className="text-center text-muted-foreground mt-12 text-sm">Note: ProMo MEA Affiliates aren't allowed to Market or be or become affiliates for other event ticketing or entertainment platforms.</p>
                </section>

                <section id="benefits" className="bg-muted py-16 lg:py-24">
                    <div className="container">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-headline font-bold">Benefits of Becoming a ProMo</h2>
                            <p className="mx-auto max-w-[700px] text-muted-foreground mt-4">
                                Join our network of event enthusiasts and enjoy these exclusive advantages.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {benefits.map((benefit, index) => (
                                <div key={index} className="flex items-start gap-4">
                                    <div className="flex-shrink-0">
                                        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary text-primary-foreground">
                                            <benefit.icon className="h-6 w-6" />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold font-headline">{benefit.title}</h3>
                                        <p className="text-muted-foreground mt-1">{benefit.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                 <section className="bg-primary text-primary-foreground py-16 lg:py-24">
                    <div className="container text-center">
                         <h2 className="text-4xl font-headline font-bold">Ready to Start Earning?</h2>
                         <p className="mx-auto max-w-[600px] opacity-90 mt-4 mb-8 text-lg">
                            Join a community of successful affiliates and start your journey with ProMo MEA today.
                         </p>
                         <Button size="lg" variant="secondary" asChild className="text-lg py-7 px-10">
                            <Link href="/signup">Sign Up Now and Get Your Code</Link>
                        </Button>
                    </div>
                 </section>
            </main>

            <footer className="border-t">
                <div className="container flex h-14 items-center justify-center">
                    <p className="text-sm text-muted-foreground">
                        &copy; {new Date().getFullYear()} My Event Advisor. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    )
}
