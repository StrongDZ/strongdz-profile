'use client';

import { useActionState, startTransition } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Save, Loader2, User } from 'lucide-react';
import { updateProfile, type ProfileFormState } from '@/actions/profile';
import type { Profile } from '@/db/schema';

export function ProfileEditor({ profile }: { profile: Profile }) {
  const [state, formAction, isPending] = useActionState<ProfileFormState | null, FormData>(
    async (_prev, formData) => {
      return await updateProfile(profile.id, null, formData);
    },
    null
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(() => formAction(new FormData(e.currentTarget)));
  };

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold font-mono"><span className="text-primary">$</span> Profile</h1>
        <p className="text-sm text-muted-foreground font-mono mt-1">Edit your personal information</p>
      </div>

      {state?.message && (
        <div className={`mb-4 p-3 rounded-lg text-sm font-mono ${state.success ? 'bg-green-500/10 border border-green-500/30 text-green-400' : 'bg-red-500/10 border border-red-500/30 text-red-400'}`}>
          {state.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-border/20 bg-card/20 p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center">
            <User className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="font-mono font-bold">{profile.fullName}</p>
            <p className="text-xs text-muted-foreground font-mono">{profile.email}</p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label className="font-mono text-xs uppercase">Full Name</Label>
            <Input name="fullName" defaultValue={profile.fullName} className="bg-background/50 font-mono text-sm" />
          </div>
          <div className="space-y-2">
            <Label className="font-mono text-xs uppercase">Email</Label>
            <Input name="email" type="email" defaultValue={profile.email} className="bg-background/50 font-mono text-sm" />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="font-mono text-xs uppercase">Headline</Label>
          <Input name="headline" defaultValue={profile.headline || ''} className="bg-background/50 font-mono text-sm" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label className="font-mono text-xs uppercase">Phone</Label>
            <Input name="phone" defaultValue={profile.phone || ''} className="bg-background/50 font-mono text-sm" />
          </div>
          <div className="space-y-2">
            <Label className="font-mono text-xs uppercase">Location</Label>
            <Input name="location" defaultValue={profile.location || ''} className="bg-background/50 font-mono text-sm" />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label className="font-mono text-xs uppercase">GitHub URL</Label>
            <Input name="githubUrl" defaultValue={profile.githubUrl || ''} className="bg-background/50 font-mono text-sm" />
          </div>
          <div className="space-y-2">
            <Label className="font-mono text-xs uppercase">LinkedIn URL</Label>
            <Input name="linkedinUrl" defaultValue={profile.linkedinUrl || ''} className="bg-background/50 font-mono text-sm" />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="font-mono text-xs uppercase">Bio</Label>
          <Textarea name="bio" defaultValue={profile.bio || ''} rows={4} className="bg-background/50 font-mono text-sm resize-none" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label className="font-mono text-xs uppercase">Avatar URL</Label>
            <Input name="avatarUrl" defaultValue={profile.avatarUrl || ''} className="bg-background/50 font-mono text-sm" />
          </div>
          <div className="space-y-2">
            <Label className="font-mono text-xs uppercase">Resume URL</Label>
            <Input name="resumeUrl" defaultValue={profile.resumeUrl || ''} className="bg-background/50 font-mono text-sm" />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Switch name="isAvailable" id="isAvailable" defaultChecked={profile.isAvailable || false} />
          <Label htmlFor="isAvailable" className="font-mono text-sm">Available for hire</Label>
        </div>

        <button type="submit" disabled={isPending} className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-mono hover:opacity-90 transition-all disabled:opacity-50">
          {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          {isPending ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
}
