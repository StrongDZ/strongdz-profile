import Link from 'next/link';
import { db } from '@/db';
import { projects } from '@/db/schema';
import { ScrollReveal } from '@/components/scroll-reveal';
import { Folders } from 'lucide-react';
import { ProjectCard } from '@/components/project-card';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Explore my portfolio of projects spanning full-stack development, Web3, and data engineering.',
};

async function getProjects() {
  return db.select().from(projects);
}

export default async function ProjectsPage() {
  const allProjects = await getProjects();

  return (
    <div className="relative grid-bg">
      <div className="gradient-orb w-[400px] h-[400px] bg-neon-magenta top-[50px] right-[-150px]" />

      <div className="container mx-auto max-w-6xl px-4 py-12 relative z-10">
        {/* Header */}
        <ScrollReveal>
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Folders className="h-5 w-5 text-primary" />
              <span className="font-mono text-sm text-primary uppercase tracking-wider">Portfolio</span>
              <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-mono mb-4">
              All<span className="text-primary">.projects</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
              A collection of projects I've built, from Web3 DApps to full-stack platforms.
            </p>
          </div>
        </ScrollReveal>

        {/* Project Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {allProjects.map((project, index) => (
            <ScrollReveal key={project.id} delay={index * 80}>
            <ScrollReveal key={project.id} delay={index * 80}>
              <ProjectCard project={project} index={index} />
            </ScrollReveal>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}
