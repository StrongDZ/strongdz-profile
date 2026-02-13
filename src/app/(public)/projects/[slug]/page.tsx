import Link from 'next/link';
import { db } from '@/db';
import { projects } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Github, ExternalLink, Calendar, Code2 } from 'lucide-react';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ScrollReveal } from '@/components/scroll-reveal';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

async function getProject(slug: string) {
  const [project] = await db.select().from(projects).where(eq(projects.slug, slug)).limit(1);
  return project;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    return { title: 'Project Not Found' };
  }

  return {
    title: project.title,
    description: project.brief || undefined,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="relative grid-bg">
      <div className="gradient-orb w-[400px] h-[400px] bg-neon-cyan top-[50px] right-[-150px]" />

      <article className="container mx-auto max-w-3xl px-4 py-12 relative z-10">
        {/* Back Button */}
        <ScrollReveal>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors font-mono mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            cd ../projects
          </Link>
        </ScrollReveal>

        {/* Header */}
        <ScrollReveal delay={100}>
          <header className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              {project.featured && (
                <Badge className="bg-neon-yellow/10 text-neon-yellow border-neon-yellow/30 font-mono text-xs">
                  Featured
                </Badge>
              )}
              {project.createdAt && (
                <div className="flex items-center text-sm text-muted-foreground font-mono">
                  <Calendar className="h-3.5 w-3.5 mr-1" />
                  {new Date(project.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                  })}
                </div>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl font-bold font-mono mb-4">
              {project.title}
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed">
              {project.brief}
            </p>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2 mt-6">
              {project.techStack?.map((tech) => (
                <Badge
                  key={tech}
                  variant="outline"
                  className="font-mono text-xs border-primary/30 text-primary/90"
                >
                  {tech}
                </Badge>
              ))}
            </div>

            {/* Links */}
            <div className="flex gap-3 mt-6">
              {project.repoUrl && project.repoUrl !== '#' && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border/30 text-sm font-mono hover:border-primary/50 hover:text-primary transition-all"
                >
                  <Github className="h-4 w-4" />
                  View Code
                </a>
              )}
              {project.demoUrl && project.demoUrl !== '#' && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-mono neon-border hover:opacity-90 transition-all"
                >
                  <ExternalLink className="h-4 w-4" />
                  Live Demo
                </a>
              )}
            </div>
          </header>
        </ScrollReveal>

        {/* Separator */}
        <div className="my-8 h-px bg-gradient-to-r from-transparent via-border/50 to-transparent" />

        {/* Content */}
        <ScrollReveal delay={200}>
          <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-mono prose-headings:text-primary prose-code:font-mono prose-code:text-primary/90 prose-a:text-primary">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {project.content || ''}
            </ReactMarkdown>
          </div>
        </ScrollReveal>
      </article>
    </div>
  );
}
