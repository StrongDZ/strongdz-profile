'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard, FolderOpen, Briefcase, GraduationCap,
  Wrench, Trophy, User, MessageSquare, Terminal, ExternalLink,
} from 'lucide-react';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/projects', label: 'Projects', icon: FolderOpen },
  { href: '/admin/experiences', label: 'Experiences', icon: Briefcase },
  { href: '/admin/education', label: 'Education', icon: GraduationCap },
  { href: '/admin/skills', label: 'Skills', icon: Wrench },
  { href: '/admin/awards', label: 'Awards', icon: Trophy },
  { href: '/admin/profile', label: 'Profile', icon: User },
  { href: '/admin/messages', label: 'Messages', icon: MessageSquare },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 border-r border-border/20 bg-card/30 backdrop-blur-xl z-40 flex flex-col">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-border/20">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-primary/10 border border-primary/30">
            <Terminal className="h-4 w-4 text-primary" />
          </div>
          <span className="font-mono font-bold text-sm">
            <span className="text-primary">KM</span>.admin
          </span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = href === '/admin'
            ? pathname === '/admin'
            : pathname.startsWith(href);

          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-mono transition-all duration-200',
                isActive
                  ? 'bg-primary/10 text-primary border border-primary/20'
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-border/20">
        <Link
          href="/"
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-muted-foreground hover:text-foreground transition-colors font-mono"
        >
          <ExternalLink className="h-3.5 w-3.5" />
          View Public Site
        </Link>
      </div>
    </aside>
  );
}
