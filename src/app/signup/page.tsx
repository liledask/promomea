
'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function SignupPage() {
    const router = useRouter();

    const handleSignup = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically handle user registration
        // For now, we'll just redirect to the dashboard
        router.push('/dashboard');
    }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40">
       <div className="w-full max-w-md p-4">
         <Card>
            <form onSubmit={handleSignup}>
                <CardHeader className="text-center">
                    <Link href="/" className="flex items-center gap-2 justify-center mb-2">
                            <span className="font-headline text-xl font-bold">ProMo MEA</span>
                    </Link>
                    <CardTitle>Create an Account</CardTitle>
                    <CardDescription>Join the ProMo MEA Affiliate Program today.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                     <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" type="text" placeholder="Jessica Wang" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="name@example.com" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" required />
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                    <Button className="w-full" type="submit">Create Account</Button>
                    <p className="text-sm text-muted-foreground">
                        Already have an account?{" "}
                        <Link href="/login" className="text-primary font-medium hover:underline">
                            Log in
                        </Link>
                    </p>
                </CardFooter>
            </form>
         </Card>
       </div>
    </div>
  )
}
