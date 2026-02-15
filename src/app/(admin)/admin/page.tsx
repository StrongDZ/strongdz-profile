import { db } from '@/db';
import { projects, experiences, education, skills, awards, messages } from '@/db/schema';
import { count, eq } from 'drizzle-orm';
import {
  FolderOpen, Briefcase, GraduationCap, Wrench,
  Trophy, MessageSquare, Mail, Activity,
} from 'lucide-react';
import Link from 'next/link';

async function getStats() {
  const [projectCount] = await db.select({ count: count() }).from(projects);
  const [expCount] = await db.select({ count: count() }).from(experiences);
  const [eduCount] = await db.select({ count: count() }).from(education);
  const [skillCount] = await db.select({ count: count() }).from(skills);
  const [awardCount] = await db.select({ count: count() }).from(awards);
  const [totalMessages] = await db.select({ count: count() }).from(messages);
  const [unreadMessages] = await db.select({ count: count() }).from(messages).where(eq(messages.isRead, false));

  return {
    projects: projectCount.count,
    experiences: expCount.count,
    education: eduCount.count,
    skills: skillCount.count,
    awards: awardCount.count,
    messages: totalMessages.count,
    unread: unreadMessages.count,
  };
}

const statCards = [
  { key: 'projects', label: 'Projects', icon: FolderOpen, href: '/admin/projects', color: 'text-neon-cyan', border: 'border-neon-cyan/20', bg: 'bg-neon-cyan/5' },
  { key: 'experiences', label: 'Experiences', icon: Briefcase, href: '/admin/experiences', color: 'text-neon-magenta', border: 'border-neon-magenta/20', bg: 'bg-neon-magenta/5' },
  { key: 'education', label: 'Education', icon: GraduationCap, href: '/admin/education', color: 'text-neon-yellow', border: 'border-neon-yellow/20', bg: 'bg-neon-yellow/5' },
  { key: 'skills', label: 'Skill Groups', icon: Wrench, href: '/admin/skills', color: 'text-primary', border: 'border-primary/20', bg: 'bg-primary/5' },
  { key: 'awards', label: 'Awards', icon: Trophy, href: '/admin/awards', color: 'text-neon-yellow', border: 'border-neon-yellow/20', bg: 'bg-neon-yellow/5' },
  { key: 'messages', label: 'Messages', icon: MessageSquare, href: '/admin/messages', color: 'text-green-400', border: 'border-green-400/20', bg: 'bg-green-400/5' },
] as const;

export default async function AdminDashboardPage() {
  const stats = await getStats();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold font-mono">
          <span className="text-primary">$</span> Dashboard
        </h1>
        <p className="text-sm text-muted-foreground font-mono mt-1">
          System overview & statistics
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-8">
        {statCards.map(({ key, label, icon: Icon, href, color, border, bg }) => (
          <Link key={key} href={href}>
            <div className={`rounded-xl border ${border} ${bg} p-5 hover:bg-card/50 transition-all duration-300 group`}>
              <div className="flex items-center justify-between mb-3">
                <Icon className={`h-5 w-5 ${color}`} />
                <span className="font-mono text-3xl font-bold text-foreground">
                  {stats[key as keyof typeof stats]}
                </span>
              </div>
              <p className="text-sm text-muted-foreground font-mono">{label}</p>
              {key === 'messages' && stats.unread > 0 && (
                <div className="mt-2 flex items-center gap-1.5">
                  <Mail className="h-3 w-3 text-neon-cyan animate-pulse" />
                  <span className="text-xs text-neon-cyan font-mono">{stats.unread} unread</span>
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="rounded-xl border border-border/20 bg-card/20 p-5">
        <div className="flex items-center gap-2 mb-4">
          <Activity className="h-4 w-4 text-primary" />
          <h2 className="font-mono text-sm font-bold">Quick Actions</h2>
        </div>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { href: '/admin/projects', label: 'Manage Projects' },
            { href: '/admin/profile', label: 'Edit Profile' },
            { href: '/admin/messages', label: 'View Messages' },
            { href: '/', label: 'View Public Site' },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="px-4 py-2.5 rounded-lg border border-border/20 text-xs font-mono text-muted-foreground hover:text-primary hover:border-primary/30 transition-all text-center"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
