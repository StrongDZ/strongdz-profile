import { db } from '@/db';
import { profile } from '@/db/schema';
import { ScrollReveal } from '@/components/scroll-reveal';
import { ContactForm } from '@/components/contact-form';
import { Mail, Phone, MapPin, Github, Linkedin, MessageCircle } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with me. Send a message or reach out through social media.',
};

export const dynamic = 'force-dynamic';

export default async function ContactPage() {
  const [profileData] = await db.select().from(profile).limit(1);

  const contactItems = [
    profileData?.email && {
      icon: Mail,
      label: 'Email',
      value: profileData.email,
      href: `mailto:${profileData.email}`,
    },
    profileData?.phone && {
      icon: Phone,
      label: 'Phone',
      value: profileData.phone,
      href: `tel:${profileData.phone.replace(/[^+\d]/g, '')}`,
    },
    profileData?.location && {
      icon: MapPin,
      label: 'Location',
      value: profileData.location,
      href: null,
    },
    profileData?.githubUrl && {
      icon: Github,
      label: 'GitHub',
      value: profileData.githubUrl.replace('https://github.com/', '@'),
      href: profileData.githubUrl,
    },
    profileData?.linkedinUrl && {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'LinkedIn Profile',
      href: profileData.linkedinUrl,
    },
  ].filter(Boolean) as {
    icon: typeof Mail;
    label: string;
    value: string;
    href: string | null;
  }[];

  return (
    <div className="relative grid-bg">
      {/* Gradient Orbs */}
      <div className="gradient-orb w-[500px] h-[500px] bg-neon-cyan top-[-100px] right-[-200px]" />
      <div className="gradient-orb w-[400px] h-[400px] bg-neon-magenta bottom-[200px] left-[-150px]" style={{ animationDelay: '5s' }} />

      <section className="container mx-auto max-w-5xl px-4 py-20 relative z-10">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-mono mb-4">
              <MessageCircle className="h-3 w-3" />
              GET IN TOUCH
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Contact <span className="neon-text">Me</span>
            </h1>
            <p className="text-muted-foreground max-w-md mx-auto">
              Have a question or want to work together? Drop me a message and I&apos;ll get back to you as soon as possible.
            </p>
          </div>
        </ScrollReveal>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left: Contact Form */}
          <ScrollReveal delay={0.1} className="lg:col-span-3">
            <div className="glass rounded-2xl p-6 md:p-8 neon-border h-full">
              <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                Send a Message
              </h2>
              <ContactForm />
            </div>
          </ScrollReveal>

          {/* Right: Contact Info */}
          <ScrollReveal delay={0.2} className="lg:col-span-2">
            <div className="glass rounded-2xl p-6 md:p-8 neon-border h-full">
              <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                Contact Info
              </h2>

              <div className="space-y-5">
                {contactItems.map((item) => (
                  <div key={item.label} className="flex items-start gap-4 group">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 group-hover:border-primary/50 transition-colors">
                      <item.icon className="h-4 w-4 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider">{item.label}</p>
                      {item.href ? (
                        <a
                          href={item.href}
                          target={item.href.startsWith('http') ? '_blank' : undefined}
                          rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="text-sm font-medium hover:text-primary transition-colors break-all"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-sm font-medium">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Availability Badge */}
              {profileData?.isAvailable && (
                <div className="mt-8 pt-6 border-t border-border/30">
                  <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-green-500/5 border border-green-500/20">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
                    </span>
                    <span className="text-sm text-green-500 font-medium">
                      Available for opportunities
                    </span>
                  </div>
                </div>
              )}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
