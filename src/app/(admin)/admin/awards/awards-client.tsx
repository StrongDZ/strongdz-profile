'use client';

import { useActionState, startTransition, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Pencil, Trash2, Plus, Save, X, Loader2 } from 'lucide-react';
import { createAward, updateAward, deleteAward, type AwardFormState } from '@/actions/awards';
import type { Award } from '@/db/schema';

function AwardForm({ award, onCancel }: { award?: Award; onCancel: () => void }) {
  const isEdit = !!award;
  const [state, formAction, isPending] = useActionState<AwardFormState | null, FormData>(
    async (_prev, formData) => {
      const result = isEdit
        ? await updateAward(award!.id, null, formData)
        : await createAward(null, formData);
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
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1">
          <Label className="font-mono text-xs uppercase">Title</Label>
          <Input name="title" defaultValue={award?.title || ''} className="bg-background/50 font-mono text-sm" />
          {state?.errors?.title && <p className="text-xs text-red-400">{state.errors.title[0]}</p>}
        </div>
        <div className="space-y-1">
          <Label className="font-mono text-xs uppercase">Type</Label>
          <select name="type" defaultValue={award?.type || 'CERTIFICATE'} className="w-full rounded-lg border border-border/30 bg-background/50 px-3 py-2 text-sm font-mono">
            <option value="CERTIFICATE">Certificate</option>
            <option value="AWARD">Award</option>
          </select>
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1">
          <Label className="font-mono text-xs uppercase">Issuer</Label>
          <Input name="issuer" defaultValue={award?.issuer || ''} className="bg-background/50 font-mono text-sm" />
        </div>
        <div className="space-y-1">
          <Label className="font-mono text-xs uppercase">Date</Label>
          <Input name="date" defaultValue={award?.date || ''} placeholder="Dec 2024" className="bg-background/50 font-mono text-sm" />
        </div>
      </div>
      <div className="space-y-1">
        <Label className="font-mono text-xs uppercase">URL</Label>
        <Input name="url" defaultValue={award?.url || ''} placeholder="https://..." className="bg-background/50 font-mono text-sm" />
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

export function AwardsClient({ awards }: { awards: Award[] }) {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold font-mono"><span className="text-primary">$</span> Awards & Certificates</h1>
          <p className="text-sm text-muted-foreground font-mono mt-1">{awards.length} entries</p>
        </div>
        <button onClick={() => { setShowForm(true); setEditingId(null); }} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-mono hover:opacity-90 neon-border">
          <Plus className="h-4 w-4" /> Add
        </button>
      </div>

      {showForm && !editingId && <div className="mb-6"><AwardForm onCancel={() => setShowForm(false)} /></div>}

      <div className="space-y-3">
        {awards.map((award) => (
          <div key={award.id}>
            {editingId === award.id ? (
              <AwardForm award={award} onCancel={() => setEditingId(null)} />
            ) : (
              <div className="rounded-xl border border-border/20 bg-card/20 p-4 flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline" className={`font-mono text-xs ${award.type === 'AWARD' ? 'text-neon-yellow border-neon-yellow/30' : 'text-neon-cyan border-neon-cyan/30'}`}>
                      {award.type}
                    </Badge>
                    <span className="font-mono font-bold text-sm">{award.title}</span>
                  </div>
                  <p className="text-xs text-muted-foreground font-mono">
                    {award.issuer} • {award.date}
                  </p>
                </div>
                <div className="flex gap-1.5">
                  <button onClick={() => setEditingId(award.id)} className="p-1.5 rounded-lg border border-border/30 text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                  <form action={async () => { await deleteAward(award.id); }}>
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
