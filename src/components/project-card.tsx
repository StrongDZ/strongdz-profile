import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Github, ExternalLink, ArrowRight } from 'lucide-react';
import type { Project } from '@/db/schema';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.slug}`} className="group relative overflow-hidden rounded-xl border border-border/30 bg-card/30 hover:bg-card/60 transition-all duration-500 hover:-translate-y-1 h-full block">
      {/* Hover gradient top border */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-neon-cyan via-primary to-neon-magenta opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="p-6 h-full flex flex-col">
        <div className="flex items-start justify-between mb-4">
          <span className="font-mono text-4xl font-bold text-primary group-hover:text-neon-cyan transition-colors duration-300">
            {String(index + 1).padStart(2, '0')}
          </span>
          <div className="flex gap-3">
            {project.featured && (
              <Badge className="bg-neon-yellow/10 text-neon-yellow border-neon-yellow/30 font-mono text-xs hidden sm:inline-flex">
                Featured
              </Badge>
            )}
            <div className="flex gap-2">
              {project.repoUrl && project.repoUrl !== '#' && (
                <span className="text-muted-foreground hover:text-primary transition-colors">
                  <Github className="h-4 w-4" />
                </span>
              )}
              {project.demoUrl && project.demoUrl !== '#' && (
                <span className="text-muted-foreground hover:text-primary transition-colors">
                  <ExternalLink className="h-4 w-4" />
                </span>
              )}
            </div>
          </div>
        </div>

        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors font-mono">
          {project.title}
        </h3>

        <p className="text-muted-foreground text-sm mb-4 line-clamp-2 flex-grow">
          {project.brief}
        </p>

        <div className="flex flex-wrap gap-2 mt-auto">
          {project.techStack?.slice(0, 5).map((tech) => (
            <Badge
              key={tech}
              variant="outline"
              className="text-xs font-mono border-border/50 group-hover:border-primary/30 transition-colors"
            >
              {tech}
            </Badge>
          ))}
          {(project.techStack?.length || 0) > 5 && (
            <Badge variant="outline" className="text-xs font-mono">
              +{(project.techStack?.length || 0) - 5}
            </Badge>
          )}
        </div>
        
        <div className="flex items-center gap-1 text-xs text-muted-foreground group-hover:text-primary transition-colors font-mono mt-4">
            <span>View details</span>
            <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}
