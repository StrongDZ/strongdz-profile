import { db } from '@/db';
import { messages } from '@/db/schema';
import { desc, eq } from 'drizzle-orm';
import { Badge } from '@/components/ui/badge';
import { Mail, MailOpen, Trash2 } from 'lucide-react';
import { markAsRead, markAsUnread, deleteMessage } from '@/actions/messages';

export default async function AdminMessagesPage() {
  const allMessages = await db.select().from(messages).orderBy(desc(messages.createdAt));

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold font-mono">
          <span className="text-primary">$</span> Messages
        </h1>
        <p className="text-sm text-muted-foreground font-mono mt-1">{allMessages.length} total messages</p>
      </div>

      <div className="space-y-3">
        {allMessages.map((msg) => (
          <div key={msg.id} className={`rounded-xl border bg-card/20 p-5 transition-all ${msg.isRead ? 'border-border/20 opacity-70' : 'border-neon-cyan/30 bg-neon-cyan/5'}`}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  {!msg.isRead && (
                    <Badge className="font-mono text-xs bg-neon-cyan/10 text-neon-cyan border-neon-cyan/30">
                      NEW
                    </Badge>
                  )}
                  <span className="font-mono font-bold text-sm">{msg.name}</span>
                  <span className="text-xs text-muted-foreground font-mono">&lt;{msg.email}&gt;</span>
                </div>
                {msg.subject && (
                  <p className="text-sm font-mono text-foreground/80 mb-1">{msg.subject}</p>
                )}
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{msg.message}</p>
                <p className="text-xs text-muted-foreground/50 font-mono mt-2">
                  {msg.createdAt ? new Date(msg.createdAt).toLocaleString() : 'Unknown date'}
                </p>
              </div>
              <div className="flex gap-1.5 shrink-0">
                {msg.isRead ? (
                  <form action={async () => { 'use server'; await markAsUnread(msg.id); }}>
                    <button type="submit" className="p-1.5 rounded-lg border border-border/30 text-muted-foreground hover:text-neon-cyan hover:border-neon-cyan/30 transition-all" title="Mark unread">
                      <Mail className="h-3.5 w-3.5" />
                    </button>
                  </form>
                ) : (
                  <form action={async () => { 'use server'; await markAsRead(msg.id); }}>
                    <button type="submit" className="p-1.5 rounded-lg border border-border/30 text-muted-foreground hover:text-green-400 hover:border-green-400/30 transition-all" title="Mark read">
                      <MailOpen className="h-3.5 w-3.5" />
                    </button>
                  </form>
                )}
                <form action={async () => { 'use server'; await deleteMessage(msg.id); }}>
                  <button type="submit" className="p-1.5 rounded-lg border border-border/30 text-muted-foreground hover:text-red-400 hover:border-red-400/30 transition-all" title="Delete">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        ))}
        {allMessages.length === 0 && (
          <div className="text-center py-16">
            <Mail className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
            <p className="font-mono text-muted-foreground text-sm">No messages yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
