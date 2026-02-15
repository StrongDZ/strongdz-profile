'use client';

import { useActionState, startTransition } from 'react';
import { db } from '@/db';
import { experiences } from '@/db/schema';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Pencil, Trash2, Plus, Save, X, Loader2 } from 'lucide-react';
import { createExperience, updateExperience, deleteExperience, type ExpFormState } from '@/actions/experiences';
import { useState } from 'react';
import type { Experience } from '@/db/schema';

function ExpForm({ exp, onCancel }: { exp?: Experience; onCancel: () => void }) {
  const isEdit = !!exp;
  const [state, formAction, isPending] = useActionState<ExpFormState | null, FormData>(
    async (_prev, formData) => {
      if (isEdit) {
        const result = await updateExperience(exp!.id, null, formData);
        if (result.success) onCancel();
        return result;
      } else {
        const result = await createExperience(null, formData);
        if (result.success) onCancel();
        return result;
      }
    },
    null
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(() => formAction(new FormData(e.currentTarget)));
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-primary/20 bg-card/20 p-5 space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1">
          <Label className="font-mono text-xs uppercase">Type</Label>
          <select name="type" defaultValue={exp?.type || 'WORK'} className="w-full rounded-lg border border-border/30 bg-background/50 px-3 py-2 text-sm font-mono">
            <option value="WORK">Work</option>
            <option value="ACTIVITY">Activity</option>
          </select>
        </div>
        <div className="space-y-1">
          <Label className="font-mono text-xs uppercase">Role</Label>
          <Input name="role" defaultValue={exp?.role || ''} className="bg-background/50 font-mono text-sm" />
          {state?.errors?.role && <p className="text-xs text-red-400">{state.errors.role[0]}</p>}
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1">
          <Label className="font-mono text-xs uppercase">Company/Org</Label>
          <Input name="company" defaultValue={exp?.company || ''} className="bg-background/50 font-mono text-sm" />
        </div>
        <div className="space-y-1">
          <Label className="font-mono text-xs uppercase">Location</Label>
          <Input name="location" defaultValue={exp?.location || ''} className="bg-background/50 font-mono text-sm" />
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="space-y-1">
          <Label className="font-mono text-xs uppercase">Start Date</Label>
          <Input name="startDate" defaultValue={exp?.startDate || ''} placeholder="Sep 2022" className="bg-background/50 font-mono text-sm" />
        </div>
        <div className="space-y-1">
          <Label className="font-mono text-xs uppercase">End Date</Label>
          <Input name="endDate" defaultValue={exp?.endDate || ''} placeholder="Present" className="bg-background/50 font-mono text-sm" />
        </div>
        <div className="space-y-1">
          <Label className="font-mono text-xs uppercase">Order</Label>
          <Input name="order" type="number" defaultValue={exp?.order || 0} className="bg-background/50 font-mono text-sm" />
        </div>
      </div>
      <div className="space-y-1">
        <Label className="font-mono text-xs uppercase">Description</Label>
        <Textarea name="description" defaultValue={exp?.description || ''} rows={3} className="bg-background/50 font-mono text-sm resize-none" />
      </div>
      <div className="space-y-1">
        <Label className="font-mono text-xs uppercase">Traits (comma-separated)</Label>
        <Input name="traits" defaultValue={exp?.traits?.join(', ') || ''} className="bg-background/50 font-mono text-sm" />
      </div>
      <div className="flex gap-2">
        <button type="submit" disabled={isPending} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-mono disabled:opacity-50">
          {isPending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
          {isEdit ? 'Save' : 'Create'}
        </button>
        <button type="button" onClick={onCancel} className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border/30 text-sm font-mono text-muted-foreground hover:text-foreground">
          <X className="h-3.5 w-3.5" /> Cancel
        </button>
      </div>
    </form>
  );
}

export function ExperiencesClient({ experiences: exps }: { experiences: Experience[] }) {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold font-mono"><span className="text-primary">$</span> Experiences</h1>
          <p className="text-sm text-muted-foreground font-mono mt-1">{exps.length} entries</p>
        </div>
        <button
          onClick={() => { setShowForm(true); setEditingId(null); }}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-mono hover:opacity-90 neon-border"
        >
          <Plus className="h-4 w-4" /> Add
        </button>
      </div>

      {showForm && !editingId && (
        <div className="mb-6">
          <ExpForm onCancel={() => setShowForm(false)} />
        </div>
      )}

      <div className="space-y-3">
        {exps.map((exp) => (
          <div key={exp.id}>
            {editingId === exp.id ? (
              <ExpForm exp={exp} onCancel={() => setEditingId(null)} />
            ) : (
              <div className="rounded-xl border border-border/20 bg-card/20 p-4 flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline" className="font-mono text-xs">
                      {exp.type}
                    </Badge>
                    <span className="font-mono font-bold text-sm">{exp.role}</span>
                  </div>
                  <p className="text-xs text-muted-foreground font-mono">
                    {exp.company} • {exp.startDate} - {exp.endDate || 'Present'}
                  </p>
                  {exp.traits && exp.traits.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {exp.traits.map((t) => (
                        <Badge key={t} variant="outline" className="text-xs font-mono">{t}</Badge>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex gap-1.5">
                  <button onClick={() => setEditingId(exp.id)} className="p-1.5 rounded-lg border border-border/30 text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                  <form action={async () => { await deleteExperience(exp.id); }}>
                    <button type="submit" className="p-1.5 rounded-lg border border-border/30 text-muted-foreground hover:text-red-400 hover:border-red-400/30 transition-all">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
