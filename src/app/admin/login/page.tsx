'use client';

import { useActionState } from 'react';
import { authenticate } from '@/actions/auth';
import { Terminal, LogIn, Lock, Mail, Loader2 } from 'lucide-react';

export default function AdminLoginPage() {
  const [errorMessage, formAction, isPending] = useActionState(authenticate, undefined);

  return (
    <div className="min-h-screen grid-bg flex items-center justify-center relative">
      <div className="gradient-orb w-[400px] h-[400px] bg-neon-cyan top-[10%] right-[20%]" />
      <div className="gradient-orb w-[300px] h-[300px] bg-neon-magenta bottom-[20%] left-[10%]" style={{ animationDelay: '5s' }} />

      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="rounded-xl border border-border/30 bg-card/50 backdrop-blur-xl overflow-hidden">
          {/* Terminal header */}
          <div className="flex items-center gap-2 px-5 py-3 bg-card/50 border-b border-border/20">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
            </div>
            <span className="font-mono text-xs text-muted-foreground ml-2">admin-login.sh</span>
          </div>

          <div className="p-8">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center">
                  <Terminal className="h-8 w-8 text-primary" />
                </div>
              </div>

              <h1 className="text-2xl font-bold font-mono mb-2">
                Admin<span className="text-primary">.access</span>
              </h1>
              <p className="text-muted-foreground text-sm font-mono">
                Enter your credentials to continue
              </p>
            </div>

            <form action={formAction} className="space-y-4">
              <div className="space-y-2">
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <input
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 pl-9 font-mono"
                    id="email"
                    type="email"
                    name="email"
                    placeholder="admin@example.com"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <input
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 pl-9 font-mono"
                    id="password"
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    required
                    minLength={4}
                  />
                </div>
              </div>

              {errorMessage && (
                <div className="text-xs text-red-400 font-mono bg-red-500/10 border border-red-500/20 p-2 rounded">
                  Error: {errorMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={isPending}
                className="w-full flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-mono text-sm font-medium hover:opacity-90 transition-all neon-border disabled:opacity-50"
              >
                {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogIn className="h-4 w-4" />}
                {isPending ? 'Authenticating...' : 'Authenticate'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
