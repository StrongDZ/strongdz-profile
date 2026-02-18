import Link from 'next/link';
import { db } from '@/db';
import { profile, projects, skills } from '@/db/schema';
import { eq, asc } from 'drizzle-orm';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Github, ExternalLink, Sparkles } from 'lucide-react';
import { TerminalHero } from '@/components/terminal-hero';
import { ScrollReveal } from '@/components/scroll-reveal';
import { TechMarquee } from '@/components/tech-marquee';
import { ProjectCard } from '@/components/project-card';

async function getHomeData() {
  const [profileData] = await db.select().from(profile).limit(1);
  const featuredProjects = await db.select().from(projects).where(eq(projects.featured, true)).limit(4);
  const skillsData = await db.select().from(skills).orderBy(asc(skills.displayOrder));
  const allTech = skillsData.flatMap(s => s.items);

  return { profile: profileData, featuredProjects, allTech };
}

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const { profile: profileData, featuredProjects, allTech } = await getHomeData();

  return (
    <div className="relative grid-bg">
      {/* Gradient Orbs */}
      <div className="gradient-orb w-[500px] h-[500px] bg-neon-cyan top-[-100px] right-[-200px]" />
      <div className="gradient-orb w-[400px] h-[400px] bg-neon-magenta bottom-[200px] left-[-150px]" style={{ animationDelay: '5s' }} />
      <div className="gradient-orb w-[300px] h-[300px] bg-neon-yellow top-[50%] right-[10%]" style={{ animationDelay: '10s' }} />

      <div className="container mx-auto max-w-6xl px-4 relative z-10">
        {/* Hero Section */}
        <section className="py-16 md:py-28 lg:py-36">
          <div className="flex flex-col items-center text-center gap-10">
            {/* Availability Badge */}
            {profileData?.isAvailable && (
              <ScrollReveal>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 neon-border">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                  </span>
                  <span className="text-sm font-medium text-green-400 font-mono">Available for work</span>
                </div>
              </ScrollReveal>
            )}

            {/* Glitch Name */}
            <ScrollReveal delay={100}>
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight font-mono">
                <span className="text-muted-foreground text-2xl sm:text-3xl md:text-4xl block mb-2">{'// Hello World'}</span>
                <span
                  className="glitch-text bg-gradient-to-r from-neon-cyan via-primary to-neon-magenta bg-clip-text text-transparent"
                  data-text={profileData?.fullName?.split(' ').pop() || 'Mạnh'}
                >
                  {profileData?.fullName?.split(' ').pop() || 'Mạnh'}
                </span>
              </h1>
            </ScrollReveal>

            {/* Subtitle */}
            <ScrollReveal delay={200}>
              <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed">
                {profileData?.headline || 'Full-stack Developer'}
              </p>
            </ScrollReveal>

            {/* Terminal */}
            <ScrollReveal delay={300} className="w-full">
              <TerminalHero />
            </ScrollReveal>

            {/* CTA Buttons */}
            <ScrollReveal delay={400}>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-mono text-sm font-medium hover:opacity-90 transition-all duration-300 neon-border"
                >
                  <span>{'>'}</span> View My Work
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border/50 text-foreground font-mono text-sm font-medium hover:border-primary/50 hover:text-primary transition-all duration-300"
                >
                  sudo hire-me
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Tech Stack Marquee */}
        <section className="py-8 -mx-4">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-6 px-4">
              <span className="font-mono text-xs text-primary">{'<'}</span>
              <h2 className="font-mono text-sm text-muted-foreground uppercase tracking-wider">Tech Stack</h2>
              <span className="font-mono text-xs text-primary">{'/>'}</span>
              <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent" />
            </div>
            <TechMarquee items={allTech} />
          </ScrollReveal>
        </section>

        {/* Featured Projects */}
        <section className="py-16">
          <ScrollReveal>
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-3">
                <Sparkles className="h-5 w-5 text-neon-yellow" />
                <h2 className="text-2xl md:text-3xl font-bold font-mono">
                  Featured<span className="text-primary">.projects</span>
                </h2>
              </div>
              <Link
                href="/projects"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors font-mono"
              >
                View all
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid gap-6 md:grid-cols-2">
            {featuredProjects.map((project, index) => (
              <ScrollReveal key={project.id} delay={index * 100}>
              <ScrollReveal key={project.id} delay={index * 100}>
                <ProjectCard project={project} index={index} />
              </ScrollReveal>
              </ScrollReveal>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
