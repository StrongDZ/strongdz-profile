'use client';

import { useActionState, startTransition, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Pencil, Trash2, Plus, Save, X, Loader2 } from 'lucide-react';
import { createEducation, updateEducation, deleteEducation, type EduFormState } from '@/actions/education';
import type { Education } from '@/db/schema';

function EduForm({ edu, onCancel }: { edu?: Education; onCancel: () => void }) {
  const isEdit = !!edu;
  const [state, formAction, isPending] = useActionState<EduFormState | null, FormData>(
    async (_prev, formData) => {
      const result = isEdit
        ? await updateEducation(edu!.id, null, formData)
        : await createEducation(null, formData);
      if (result.success) onCancel();
      return result;
    },
    null
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(() => formAction(new FormData(e.currentTarget)));
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-primary/20 bg-card/20 p-5 space-y-3">
      <div className="space-y-1">
        <Label className="font-mono text-xs uppercase">School</Label>
        <Input name="school" defaultValue={edu?.school || ''} className="bg-background/50 font-mono text-sm" />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1">
          <Label className="font-mono text-xs uppercase">Degree / Major</Label>
          <Input name="degree" defaultValue={edu?.degree || ''} className="bg-background/50 font-mono text-sm" />
        </div>
        <div className="space-y-1">
          <Label className="font-mono text-xs uppercase">GPA</Label>
          <Input name="gpa" defaultValue={edu?.gpa || ''} className="bg-background/50 font-mono text-sm" />
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1">
          <Label className="font-mono text-xs uppercase">Start Date</Label>
          <Input name="startDate" defaultValue={edu?.startDate || ''} placeholder="Sep 2019" className="bg-background/50 font-mono text-sm" />
        </div>
        <div className="space-y-1">
          <Label className="font-mono text-xs uppercase">End Date</Label>
          <Input name="endDate" defaultValue={edu?.endDate || ''} placeholder="Present" className="bg-background/50 font-mono text-sm" />
        </div>
      </div>
      <div className="space-y-1">
        <Label className="font-mono text-xs uppercase">Achievements</Label>
        <Textarea name="achievements" defaultValue={edu?.achievements || ''} rows={2} className="bg-background/50 font-mono text-sm resize-none" />
      </div>
      <div className="flex gap-2">
        <button type="submit" disabled={isPending} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-mono disabled:opacity-50">
          {isPending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
          {isEdit ? 'Save' : 'Create'}
        </button>
        <button type="button" onClick={onCancel} className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border/30 text-sm font-mono text-muted-foreground">
          <X className="h-3.5 w-3.5" /> Cancel
        </button>
      </div>
    </form>
  );
}

export function EducationClient({ education }: { education: Education[] }) {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold font-mono"><span className="text-primary">$</span> Education</h1>
          <p className="text-sm text-muted-foreground font-mono mt-1">{education.length} entries</p>
        </div>
        <button onClick={() => { setShowForm(true); setEditingId(null); }} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-mono hover:opacity-90 neon-border">
          <Plus className="h-4 w-4" /> Add
        </button>
      </div>

      {showForm && !editingId && <div className="mb-6"><EduForm onCancel={() => setShowForm(false)} /></div>}

      <div className="space-y-3">
        {education.map((edu) => (
          <div key={edu.id}>
            {editingId === edu.id ? (
              <EduForm edu={edu} onCancel={() => setEditingId(null)} />
            ) : (
              <div className="rounded-xl border border-border/20 bg-card/20 p-4 flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono font-bold text-sm">{edu.school}</p>
                  <p className="text-xs text-muted-foreground font-mono">{edu.degree} • {edu.gpa} • {edu.startDate} - {edu.endDate || 'Present'}</p>
                  {edu.achievements && <p className="text-xs text-muted-foreground mt-1">{edu.achievements}</p>}
                </div>
                <div className="flex gap-1.5">
                  <button onClick={() => setEditingId(edu.id)} className="p-1.5 rounded-lg border border-border/30 text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                  <form action={async () => { await deleteEducation(edu.id); }}>
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
