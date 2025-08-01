
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';

export default function SignupPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            avatar_url: `https://placehold.co/100x100.png?text=${fullName.charAt(0) || 'U'}`,
          },
        },
      });

      if (error) {
        throw error;
      }
      
      if (data.session) {
        // This case handles auto-verification in local dev environments
        toast({
         title: 'Account Created!',
         description: "You've been signed in successfully.",
       });
       router.push('/dashboard');
      } else if (data.user) {
        toast({
          title: 'Account Creation Pending',
          description: "Please check your email to verify your account and complete signup.",
        });
        // Clear form only on successful submission that requires verification
        setFullName('');
        setEmail('');
        setPassword('');
      }

    } catch (error: any) {
       console.error('Signup error:', error);
       toast({
        variant: 'destructive',
        title: 'Signup Failed',
        description: error.message || 'An unexpected error occurred.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40">
      <div className="w-full max-w-md p-4">
        <Card>
          <form onSubmit={handleSignup}>
            <CardHeader className="text-center">
              <Link
                href="/"
                className="flex items-center gap-2 justify-center mb-2"
              >
                <span className="font-headline text-xl font-bold">
                  ProMo MEA
                </span>
              </Link>
              <CardTitle>Become an Affiliate</CardTitle>
              <CardDescription>
                Join the ProMo MEA Affiliate Program to start earning.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Jessica Wang"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  disabled={loading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button className="w-full" type="submit" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create Affiliate Account
              </Button>
              <p className="text-sm text-muted-foreground">
                Already have an affiliate account?{' '}
                <Link
                  href="/login"
                  className="text-primary font-medium hover:underline"
                >
                  Log in
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
