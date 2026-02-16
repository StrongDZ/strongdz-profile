import Link from 'next/link';
import { Github, Linkedin, Mail, Terminal } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border/20 bg-card/20">
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Terminal className="h-4 w-4 text-primary" />
            <span className="font-mono text-sm text-muted-foreground">
              <span className="text-primary">KM</span>.dev
            </span>
            <span className="text-muted-foreground/50 text-xs font-mono">
              © {new Date().getFullYear()}
            </span>
          </div>

          {/* Links */}
          <nav className="flex items-center gap-6">
            <Link href="/projects" className="text-sm text-muted-foreground hover:text-primary transition-colors font-mono">
              Projects
            </Link>
            <Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors font-mono">
              About
            </Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors font-mono">
              Contact
            </Link>
          </nav>

          {/* Social */}
          <div className="flex items-center gap-3">
            <a href="https://github.com/hoanmanh04" target="_blank" rel="noopener noreferrer"
              className="p-2 rounded-lg border border-border/20 text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">
              <Github className="h-4 w-4" />
            </a>
            <a href="mailto:hoanmanh04@gmail.com"
              className="p-2 rounded-lg border border-border/20 text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Bottom text */}
        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground/50 font-mono">
            Built with Next.js, TypeScript, Tailwind CSS & Drizzle ORM
          </p>
        </div>
      </div>
    </footer>
  );
}
