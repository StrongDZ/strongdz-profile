'use client';

import { useState } from 'react';
import { sendMessage } from '@/actions/messages';
import { Button } from '@/components/ui/button';
import { Send, Mail, User, MessageSquare, FileText, CheckCircle2, AlertCircle } from 'lucide-react';

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    const formData = new FormData(e.currentTarget);

    try {
      const result = await sendMessage(formData);
      if (result?.error) {
        setStatus('error');
        setErrorMsg(result.error);
      } else {
        setStatus('success');
        (e.target as HTMLFormElement).reset();
      }
    } catch {
      setStatus('error');
      setErrorMsg('Something went wrong. Please try again.');
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
        <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center">
          <CheckCircle2 className="h-8 w-8 text-green-500" />
        </div>
        <h3 className="text-xl font-semibold">Message Sent!</h3>
        <p className="text-muted-foreground text-sm max-w-sm">
          Thank you for reaching out. I&apos;ll get back to you soon.
        </p>
        <Button variant="outline" className="mt-4" onClick={() => setStatus('idle')}>
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Name */}
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium flex items-center gap-2">
          <User className="h-3.5 w-3.5 text-primary" />
          Name <span className="text-red-500">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          placeholder="Your name"
          className="w-full rounded-lg border border-border/50 bg-background/50 px-4 py-2.5 text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
        />
      </div>

      {/* Email */}
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
          <Mail className="h-3.5 w-3.5 text-primary" />
          Email <span className="text-red-500">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="your@email.com"
          className="w-full rounded-lg border border-border/50 bg-background/50 px-4 py-2.5 text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
        />
      </div>

      {/* Subject */}
      <div className="space-y-2">
        <label htmlFor="subject" className="text-sm font-medium flex items-center gap-2">
          <FileText className="h-3.5 w-3.5 text-primary" />
          Subject
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          placeholder="What is this about?"
          className="w-full rounded-lg border border-border/50 bg-background/50 px-4 py-2.5 text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
        />
      </div>

      {/* Message */}
      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium flex items-center gap-2">
          <MessageSquare className="h-3.5 w-3.5 text-primary" />
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Your message..."
          className="w-full rounded-lg border border-border/50 bg-background/50 px-4 py-2.5 text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all resize-none"
        />
      </div>

      {/* Error */}
      {status === 'error' && (
        <div className="flex items-center gap-2 text-sm text-red-500 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2.5">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          {errorMsg}
        </div>
      )}

      {/* Submit */}
      <Button type="submit" disabled={status === 'loading'} className="w-full gap-2 neon-border" size="lg">
        {status === 'loading' ? (
          <>
            <span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
            Sending...
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            Send Message
          </>
        )}
      </Button>
    </form>
  );
}
