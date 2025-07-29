
'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from '@/hooks/use-auth';
import { Loader2, Camera } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { updateUserProfileAction, updateUserAvatarAction, updateNotificationSettingsAction } from '@/app/actions';
import { supabase } from '@/lib/supabaseClient';

export default function SettingsPage() {
  const { user, loading, setUser } = useAuth();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [fullName, setFullName] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const [emailNotifications, setEmailNotifications] = useState(true);
  const [promotionalUpdates, setPromotionalUpdates] = useState(false);
  const [isSavingNotifications, setIsSavingNotifications] = useState(false);


  useEffect(() => {
    if (user) {
      setFullName(user.full_name || '');
      setEmailNotifications(user.email_notifications_enabled ?? true);
      setPromotionalUpdates(user.promotional_updates_enabled ?? false);
    }
  }, [user]);

  if (loading || !user) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setIsSaving(true);
    
    const formData = new FormData();
    formData.append('fullName', fullName);
    formData.append('userId', user.id);

    const result = await updateUserProfileAction(formData);
    
    setIsSaving(false);

    if (result.success && result.data) {
      setUser({ ...user, ...result.data });
      toast({
        title: "Profile Updated",
        description: "Your information has been successfully saved.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Update Failed",
        description: result.error || "An unexpected error occurred.",
      });
    }
  };

  const handleAvatarChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0 || !user) {
      return;
    }

    const file = event.target.files[0];
    
    if (!file.type.startsWith('image/')) {
      toast({ variant: 'destructive', title: 'Invalid File Type', description: 'Please select an image file.' });
      return;
    }
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      toast({ variant: 'destructive', title: 'File Too Large', description: 'Please select an image smaller than 5MB.' });
      return;
    }

    const fileExt = file.name.split('.').pop();
    const filePath = `${user.id}/${Date.now()}.${fileExt}`;

    setIsUploading(true);

    try {
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) {
        throw new Error(`Storage Error: ${uploadError.message}`);
      }

      const { data } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      const publicUrl = data.publicUrl;

      if (!publicUrl) {
        throw new Error("Could not get public URL for the uploaded avatar.");
      }
      
      const result = await updateUserAvatarAction({ userId: user.id, avatarUrl: publicUrl });
      
      if (result.success && result.data?.avatar_url) {
        // Update local user state for immediate UI feedback
        setUser({ ...user, avatar_url: result.data.avatar_url });
        toast({
          title: "Avatar Updated",
          description: "Your new profile picture has been saved.",
        });
      } else {
        throw new Error(result.error || "Failed to update avatar in the database.");
      }
    } catch (error: any) {
      console.error("Avatar upload process failed:", error);
      toast({
        variant: "destructive",
        title: "Update Failed",
        description: error.message || "An unexpected error occurred while uploading your photo.",
      });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleNotificationSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setIsSavingNotifications(true);

    const formData = new FormData();
    formData.append('email_notifications_enabled', String(emailNotifications));
    formData.append('promotional_updates_enabled', String(promotionalUpdates));
    formData.append('userId', user.id);

    const result = await updateNotificationSettingsAction(formData);

    setIsSavingNotifications(false);

    if (result.success && result.data) {
        setUser({ ...user, ...result.data });
        toast({
            title: "Settings Saved",
            description: "Your notification preferences have been updated.",
        });
    } else {
        toast({
            variant: "destructive",
            title: "Save Failed",
            description: result.error || "Could not save your preferences.",
        });
    }
  }
  
  const userInitial = user.full_name ? user.full_name.charAt(0).toUpperCase() : (user.email ? user.email.charAt(0).toUpperCase() : '');

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <div>
        <h1 className="text-3xl font-headline font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your account and notification preferences.</p>
      </div>

      <Card>
        <form onSubmit={handleProfileSave}>
            <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Update your personal information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                    <div 
                        className="relative group cursor-pointer"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <Avatar className="h-24 w-24">
                            {isUploading ? (
                                <div className="flex h-full w-full items-center justify-center rounded-full bg-muted">
                                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                                </div>
                            ) : (
                            <>
                                <AvatarImage src={user.avatar_url || ''} alt={user.full_name || ''} data-ai-hint="profile picture" />
                                <AvatarFallback>{userInitial}</AvatarFallback>
                            </>
                            )}
                        </Avatar>
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                            <Camera className="h-8 w-8 text-white" />
                        </div>
                    </div>
                    <input 
                        type="file" 
                        ref={fileInputRef}
                        onChange={handleAvatarChange}
                        className="hidden" 
                        accept="image/*"
                        disabled={isUploading || isSaving}
                    />
                     <Button 
                        variant="outline" 
                        type="button" 
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isUploading || isSaving}
                    >
                      Change Photo
                    </Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input 
                          id="name" 
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          disabled={isSaving || isUploading}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" value={user.email || ''} disabled />
                    </div>
                </div>
              <Button type="submit" disabled={isSaving || isUploading}>
                {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Profile
              </Button>
            </CardContent>
        </form>
      </Card>
      
      <Separator />

      <Card>
        <form onSubmit={handleNotificationSave}>
            <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Choose how you want to be notified.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between rounded-lg border p-4 gap-4">
                    <div className="flex-grow">
                        <h4 className="font-medium">Email Notifications</h4>
                        <p className="text-sm text-muted-foreground">Receive updates on earnings, payouts, and tier progress.</p>
                    </div>
                    <Switch 
                        checked={emailNotifications}
                        onCheckedChange={setEmailNotifications}
                        disabled={isSavingNotifications}
                    />
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between rounded-lg border p-4 gap-4">
                    <div className="flex-grow">
                        <h4 className="font-medium">Promotional Updates</h4>
                        <p className="text-sm text-muted-foreground">Get news about new bonuses and company announcements.</p>
                    </div>
                    <Switch 
                         checked={promotionalUpdates}
                         onCheckedChange={setPromotionalUpdates}
                         disabled={isSavingNotifications}
                    />
                </div>
            <Button type="submit" disabled={isSavingNotifications}>
                {isSavingNotifications && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Notification Settings
            </Button>
            </CardContent>
        </form>
      </Card>
    </div>
  );
}
