'use client';

import { useActionState, startTransition, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Pencil, Trash2, Plus, Save, X, Loader2 } from 'lucide-react';
import { createSkill, updateSkill, deleteSkill, type SkillFormState } from '@/actions/skills';
import type { Skill } from '@/db/schema';

type SkillItem = { name: string; icon?: string };

function SkillForm({ skill, onCancel }: { skill?: Skill; onCancel: () => void }) {
  const isEdit = !!skill;

  const initialItems: SkillItem[] = skill?.items?.map((i) =>
    typeof i === 'string' ? { name: i } : { name: i.name, icon: i.icon || '' }
  ) || [{ name: '', icon: '' }];

  const [items, setItems] = useState<SkillItem[]>(initialItems);

  const [state, formAction, isPending] = useActionState<SkillFormState | null, FormData>(
    async (_prev, formData) => {
      const result = isEdit
        ? await updateSkill(skill!.id, null, formData)
        : await createSkill(null, formData);
      if (result.success) onCancel();
      return result;
    },
    null
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    // Serialize items as JSON into a hidden field
    formData.set('items', JSON.stringify(items.filter(i => i.name.trim())));
    startTransition(() => formAction(formData));
  };

  const addItem = () => setItems([...items, { name: '', icon: '' }]);

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, field: 'name' | 'icon', value: string) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: value };
    setItems(updated);
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-primary/20 bg-card/20 p-5 space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1">
          <Label className="font-mono text-xs uppercase">Category</Label>
          <Input name="category" defaultValue={skill?.category || ''} className="bg-background/50 font-mono text-sm" />
        </div>
        <div className="space-y-1">
          <Label className="font-mono text-xs uppercase">Display Order</Label>
          <Input name="displayOrder" type="number" defaultValue={skill?.displayOrder || 0} className="bg-background/50 font-mono text-sm" />
        </div>
      </div>

      {/* Dynamic skill items */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="font-mono text-xs uppercase">Skills</Label>
          <button
            type="button"
            onClick={addItem}
            className="flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-mono text-primary border border-primary/30 hover:bg-primary/10 transition-all"
          >
            <Plus className="h-3 w-3" /> Add a skill
          </button>
        </div>
        <div className="space-y-2">
          {items.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <Input
                value={item.name}
                onChange={(e) => updateItem(index, 'name', e.target.value)}
                placeholder="Skill name"
                className="bg-background/50 font-mono text-sm flex-1"
              />
              <Input
                value={item.icon || ''}
                onChange={(e) => updateItem(index, 'icon', e.target.value)}
                placeholder="Icon slug (e.g. react)"
                className="bg-background/50 font-mono text-sm flex-1"
              />
              {item.icon && (
                <img
                  src={`https://cdn.simpleicons.org/${item.icon}`}
                  alt=""
                  className="h-5 w-5 shrink-0"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
              )}
              <button
                type="button"
                onClick={() => removeItem(index)}
                className="p-1.5 rounded-lg border border-border/30 text-muted-foreground hover:text-red-400 hover:border-red-400/30 transition-all shrink-0"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground font-mono">
          Use <a href="https://simpleicons.org" target="_blank" className="text-primary hover:underline">Simple Icons</a> slug names for icons.
        </p>
      </div>

      {state?.message && !state.success && (
        <div className="p-2 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono">
          {state.message}
        </div>
      )}

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

export function SkillsClient({ skills }: { skills: Skill[] }) {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold font-mono"><span className="text-primary">$</span> Skills</h1>
          <p className="text-sm text-muted-foreground font-mono mt-1">{skills.length} groups</p>
        </div>
        <button onClick={() => { setShowForm(true); setEditingId(null); }} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-mono hover:opacity-90 neon-border">
          <Plus className="h-4 w-4" /> Add Group
        </button>
      </div>

      {showForm && !editingId && <div className="mb-6"><SkillForm onCancel={() => setShowForm(false)} /></div>}

      <div className="space-y-3">
        {skills.map((skill) => (
          <div key={skill.id}>
            {editingId === skill.id ? (
              <SkillForm skill={skill} onCancel={() => setEditingId(null)} />
            ) : (
              <div className="rounded-xl border border-border/20 bg-card/20 p-4 flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono font-bold text-sm mb-2">{skill.category}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {skill.items.map((item) => {
                      const name = typeof item === 'string' ? item : item.name;
                      const icon = typeof item === 'string' ? undefined : item.icon;
                      return (
                        <Badge key={name} variant="outline" className="text-xs font-mono flex items-center gap-1.5">
                          {icon && <img src={`https://cdn.simpleicons.org/${icon}`} alt="" className="h-3.5 w-3.5" />}
                          {name}
                        </Badge>
                      );
                    })}
                  </div>
                </div>
                <div className="flex gap-1.5">
                  <button onClick={() => setEditingId(skill.id)} className="p-1.5 rounded-lg border border-border/30 text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                  <form action={async () => { await deleteSkill(skill.id); }}>
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
