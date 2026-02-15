import Link from 'next/link';
import { db } from '@/db';
import { projects } from '@/db/schema';
import { Badge } from '@/components/ui/badge';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { deleteProject } from '@/actions/projects';

export default async function AdminProjectsPage() {
  const allProjects = await db.select().from(projects);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold font-mono">
            <span className="text-primary">$</span> Projects
          </h1>
          <p className="text-sm text-muted-foreground font-mono mt-1">{allProjects.length} projects</p>
        </div>
        <Link
          href="/admin/projects/new"
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-mono hover:opacity-90 transition-all neon-border"
        >
          <Plus className="h-4 w-4" />
          New Project
        </Link>
      </div>

      <div className="rounded-xl border border-border/20 bg-card/20 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border/20 bg-card/30">
              <th className="text-left px-4 py-3 text-xs font-mono text-muted-foreground uppercase">Title</th>
              <th className="text-left px-4 py-3 text-xs font-mono text-muted-foreground uppercase">Slug</th>
              <th className="text-left px-4 py-3 text-xs font-mono text-muted-foreground uppercase">Featured</th>
              <th className="text-right px-4 py-3 text-xs font-mono text-muted-foreground uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            {allProjects.map((project) => (
              <tr key={project.id} className="border-b border-border/10 hover:bg-card/30 transition-colors">
                <td className="px-4 py-3 font-mono text-sm">{project.title}</td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{project.slug}</td>
                <td className="px-4 py-3">
                  {project.featured && (
                    <Badge className="font-mono text-xs bg-neon-yellow/10 text-neon-yellow border-neon-yellow/30">
                      Featured
                    </Badge>
                  )}
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/admin/projects/${project.id}/edit`}
                      className="p-1.5 rounded-lg border border-border/30 text-muted-foreground hover:text-primary hover:border-primary/30 transition-all"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </Link>
                    <form action={async () => {
                      'use server';
                      await deleteProject(project.id);
                    }}>
                      <button
                        type="submit"
                        className="p-1.5 rounded-lg border border-border/30 text-muted-foreground hover:text-red-400 hover:border-red-400/30 transition-all"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {allProjects.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-sm text-muted-foreground font-mono">
                  No projects yet. Create your first one!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
