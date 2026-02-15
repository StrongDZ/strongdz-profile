import { auth, signOut } from '@/auth';
import { redirect } from 'next/navigation';
import { AdminSidebar } from '@/components/admin-sidebar';
import { LogOut } from 'lucide-react';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect('/admin/login');
  }

  return (
    <div className="min-h-screen grid-bg">
      <AdminSidebar />

      {/* Main Content */}
      <div className="ml-64">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 border-b border-border/20 bg-background/80 backdrop-blur-xl">
          <div className="flex items-center justify-end px-6 py-3">
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground font-mono">
                {session.user.email}
              </span>
              {session.user.image && (
                <img
                  src={session.user.image}
                  alt=""
                  className="w-7 h-7 rounded-full border border-border/30"
                />
              )}
              <form
                action={async () => {
                  'use server';
                  await signOut({ redirectTo: '/' });
                }}
              >
                <button
                  type="submit"
                  className="p-1.5 rounded-lg border border-border/30 text-muted-foreground hover:text-red-400 hover:border-red-400/30 transition-all"
                  title="Sign out"
                >
                  <LogOut className="h-3.5 w-3.5" />
                </button>
              </form>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
