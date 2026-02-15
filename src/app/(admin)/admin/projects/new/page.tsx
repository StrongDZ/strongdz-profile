'use client';

import { useActionState, startTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { createProject, type ProjectFormState } from '@/actions/projects';

export default function NewProjectPage() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState<ProjectFormState | null, FormData>(
    async (_prev, formData) => {
      const result = await createProject(null, formData);
      if (result.success) {
        router.push('/admin/projects');
      }
      return result;
    },
    null
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(() => formAction(formData));
  };

  return (
    <div className="max-w-2xl">
      <Link href="/admin/projects" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors font-mono mb-6">
        <ArrowLeft className="h-4 w-4" />
        cd ../projects
      </Link>

      <h1 className="text-2xl font-bold font-mono mb-6">
        <span className="text-primary">$</span> New Project
      </h1>

      {state?.message && !state.success && (
        <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm font-mono">
          {state.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-border/20 bg-card/20 p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label className="font-mono text-xs uppercase">Title</Label>
            <Input name="title" placeholder="Project name" className="bg-background/50 font-mono text-sm" />
            {state?.errors?.title && <p className="text-xs text-red-400 font-mono">{state.errors.title[0]}</p>}
          </div>
          <div className="space-y-2">
            <Label className="font-mono text-xs uppercase">Slug</Label>
            <Input name="slug" placeholder="project-slug" className="bg-background/50 font-mono text-sm" />
            {state?.errors?.slug && <p className="text-xs text-red-400 font-mono">{state.errors.slug[0]}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <Label className="font-mono text-xs uppercase">Brief Description</Label>
          <Input name="brief" placeholder="Short description" className="bg-background/50 font-mono text-sm" />
        </div>

        <div className="space-y-2">
          <Label className="font-mono text-xs uppercase">Content (Markdown)</Label>
          <Textarea name="content" placeholder="Detailed project description in Markdown..." rows={8} className="bg-background/50 font-mono text-sm resize-none" />
        </div>

        <div className="space-y-2">
          <Label className="font-mono text-xs uppercase">Tech Stack (comma-separated)</Label>
          <Input name="techStack" placeholder="React, Node.js, PostgreSQL" className="bg-background/50 font-mono text-sm" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label className="font-mono text-xs uppercase">Repo URL</Label>
            <Input name="repoUrl" placeholder="https://github.com/..." className="bg-background/50 font-mono text-sm" />
          </div>
          <div className="space-y-2">
            <Label className="font-mono text-xs uppercase">Demo URL</Label>
            <Input name="demoUrl" placeholder="https://..." className="bg-background/50 font-mono text-sm" />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="font-mono text-xs uppercase">Thumbnail URL</Label>
          <Input name="thumbnailUrl" placeholder="https://..." className="bg-background/50 font-mono text-sm" />
        </div>

        <div className="flex items-center gap-3">
          <Switch name="featured" id="featured" />
          <Label htmlFor="featured" className="font-mono text-sm">Featured Project</Label>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-mono hover:opacity-90 transition-all disabled:opacity-50"
        >
          {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          {isPending ? 'Creating...' : 'Create Project'}
        </button>
      </form>
    </div>
  );
}
