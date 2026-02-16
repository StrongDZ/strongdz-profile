'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { Menu, Github, Download, Terminal } from 'lucide-react';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/30 glass">
      <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary/10 border border-primary/30 group-hover:border-primary/60 transition-all duration-300">
            <Terminal className="h-4 w-4 text-primary" />
          </div>
          <span className="font-mono font-bold text-sm tracking-wider text-primary">
            KM<span className="text-muted-foreground">.dev</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'relative px-4 py-2 text-sm font-medium transition-all duration-300',
                pathname === item.href
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {item.label}
              {pathname === item.href && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-primary rounded-full" />
              )}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button asChild variant="ghost" size="icon" className="hidden sm:flex hover:text-primary transition-colors">
            <a
              href="https://github.com/hoanmanh04"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-4 w-4" />
              <span className="sr-only">GitHub</span>
            </a>
          </Button>
          <Button asChild size="sm" className="hidden sm:flex gap-2 neon-border">
            <a href="#" download>
              <Download className="h-4 w-4" />
              <span className="font-mono text-xs">Resume</span>
            </a>
          </Button>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 glass">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <div className="flex flex-col gap-4 mt-8">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'px-4 py-3 text-lg font-medium rounded-lg transition-all duration-300',
                      pathname === item.href
                        ? 'text-primary bg-primary/10 neon-border'
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="border-t border-border/30 pt-4 flex items-center gap-2">
                  <Button asChild variant="outline" size="sm" className="flex-1">
                    <a href="https://github.com/hoanmanh04" target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 mr-2" />
                      GitHub
                    </a>
                  </Button>
                  <Button asChild size="sm" className="flex-1 neon-border">
                    <a href="#" download>
                      <Download className="h-4 w-4 mr-2" />
                      Resume
                    </a>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
