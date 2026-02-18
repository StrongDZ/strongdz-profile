import { db } from '@/db';
import { profile, experiences, education, skills, awards } from '@/db/schema';
import { eq, asc } from 'drizzle-orm';
import { Badge } from '@/components/ui/badge';
import { ScrollReveal } from '@/components/scroll-reveal';
import {
  Briefcase, GraduationCap, Trophy, Award, MapPin,
  Calendar, Building2, Mail, Github, Heart, GitBranch,
  GitCommit, CheckCircle2
} from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn more about my background, skills, and experience as a Full-stack Developer.',
};

export const dynamic = 'force-dynamic';

async function getAboutData() {
  const [profileData] = await db.select().from(profile).limit(1);
  const experienceData = await db.select().from(experiences).orderBy(experiences.order);
  const educationData = await db.select().from(education);
  const skillsData = await db.select().from(skills).orderBy(asc(skills.displayOrder));
  const awardsData = await db.select().from(awards);

  return {
    profile: profileData,
    workExperiences: experienceData.filter(e => e.type === 'WORK'),
    activities: experienceData.filter(e => e.type === 'ACTIVITY'),
    education: educationData,
    skills: skillsData,
    awards: awardsData
  };
}

// Pipeline stage component
function PipelineStage({
  icon,
  title,
  subtitle,
  date,
  description,
  traits,
  status = 'completed',
  color = 'cyan',
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  date: string;
  description?: string | null;
  traits?: string[] | null;
  status?: 'completed' | 'running' | 'pending';
  color?: 'cyan' | 'magenta' | 'yellow' | 'green';
}) {
  const colorMap = {
    cyan: { dot: 'border-neon-cyan shadow-[0_0_8px_rgba(0,240,255,0.5)]', badge: 'border-neon-cyan/30 text-neon-cyan bg-neon-cyan/10' },
    magenta: { dot: 'border-neon-magenta shadow-[0_0_8px_rgba(255,0,229,0.5)]', badge: 'border-neon-magenta/30 text-neon-magenta bg-neon-magenta/10' },
    yellow: { dot: 'border-neon-yellow shadow-[0_0_8px_rgba(240,255,0,0.5)]', badge: 'border-neon-yellow/30 text-neon-yellow bg-neon-yellow/10' },
    green: { dot: 'border-neon-green shadow-[0_0_8px_rgba(0,255,136,0.5)]', badge: 'border-neon-green/30 text-neon-green bg-neon-green/10' },
  };

  const statusIcons = {
    completed: <CheckCircle2 className="h-3.5 w-3.5 text-green-400" />,
    running: <GitCommit className="h-3.5 w-3.5 text-neon-cyan animate-pulse" />,
    pending: <GitCommit className="h-3.5 w-3.5 text-muted-foreground" />,
  };

  return (
    <div className="relative pl-12 pb-10 last:pb-0 group">
      {/* Connector line */}
      <div className="absolute left-[19px] top-0 bottom-0 w-px bg-gradient-to-b from-border/60 via-border/30 to-transparent dark:from-primary/30 dark:via-primary/10 dark:to-transparent group-last:hidden" />

      {/* Stage dot */}
      <div className={`absolute left-[12px] top-1 w-4 h-4 rounded-full border-2 bg-background dark:${colorMap[color].dot} z-10`} />

      {/* Content */}
      <div className="rounded-xl border border-border/30 bg-card/30 p-5 hover:bg-card/50 hover:border-primary/20 transition-all duration-300">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            {icon}
            <h3 className="font-mono font-bold text-base">{title}</h3>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
            {statusIcons[status]}
            <Calendar className="h-3 w-3" />
            <span>{date}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
          <Building2 className="h-3.5 w-3.5" />
          <span>{subtitle}</span>
        </div>

        {description && (
          <div className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed mb-3">
            {description}
          </div>
        )}

        {traits && traits.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {traits.map((trait) => (
              <Badge
                key={trait}
                variant="outline"
                className={`text-xs font-mono dark:${colorMap[color].badge}`}
              >
                {trait}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default async function AboutPage() {
  const { profile: profileData, workExperiences, activities, education: educationData, skills: skillsData, awards: awardsData } = await getAboutData();

  const certificatesData = awardsData.filter(a => a.type === 'CERTIFICATE');
  const achievementsData = awardsData.filter(a => a.type === 'AWARD');

  return (
    <div className="relative grid-bg">
      {/* Gradient Orbs */}
      <div className="gradient-orb w-[400px] h-[400px] bg-neon-cyan top-[100px] right-[-100px]" />
      <div className="gradient-orb w-[300px] h-[300px] bg-neon-magenta bottom-[300px] left-[-100px]" style={{ animationDelay: '7s' }} />

      <div className="container mx-auto max-w-6xl px-4 py-12 relative z-10">
        {/* Header */}
        <ScrollReveal>
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <GitBranch className="h-5 w-5 text-primary" />
              <span className="font-mono text-sm text-primary uppercase tracking-wider">Pipeline</span>
              <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-mono mb-4">
              About<span className="text-primary">.me</span>
            </h1>
            <p className="text-muted-foreground max-w-3xl leading-relaxed">
              {profileData?.bio}
            </p>
          </div>
        </ScrollReveal>

        {/* Quick Info */}
        <ScrollReveal delay={100}>
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4 mb-12">
            {profileData?.location && (
              <div className="flex items-center gap-2 px-4 py-3 rounded-lg border border-border/30 bg-card/30 font-mono text-sm">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">{profileData.location}</span>
              </div>
            )}
            {profileData?.email && (
              <div className="flex items-center gap-2 px-4 py-3 rounded-lg border border-border/30 bg-card/30 font-mono text-sm">
                <Mail className="h-4 w-4 text-primary" />
                <a href={`mailto:${profileData.email}`} className="text-muted-foreground hover:text-primary transition-colors truncate">
                  {profileData.email}
                </a>
              </div>
            )}
            {profileData?.githubUrl && (
              <div className="flex items-center gap-2 px-4 py-3 rounded-lg border border-border/30 bg-card/30 font-mono text-sm">
                <Github className="h-4 w-4 text-primary" />
                <a href={profileData.githubUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  GitHub
                </a>
              </div>
            )}
          </div>
        </ScrollReveal>

        <div className="grid gap-12 lg:grid-cols-3">
          {/* Main Pipeline */}
          <div className="lg:col-span-2 space-y-12">
            {/* Work Experience Pipeline */}
            <section>
              <ScrollReveal>
                <div className="flex items-center gap-3 mb-8">
                  <div className="flex items-center justify-center w-8 h-8 rounded-md bg-neon-cyan/10 border border-neon-cyan/30">
                    <Briefcase className="h-4 w-4 text-neon-cyan" />
                  </div>
                  <h2 className="text-xl font-bold font-mono">
                    Work<span className="text-neon-cyan">.experience</span>
                  </h2>
                  <Badge variant="outline" className="font-mono text-xs border-neon-cyan/30 text-neon-cyan">
                    {workExperiences.length} stages
                  </Badge>
                </div>
              </ScrollReveal>

              {workExperiences.map((exp, i) => (
                <ScrollReveal key={exp.id} delay={i * 100}>
                  <PipelineStage
                    icon={<Briefcase className="h-4 w-4 text-neon-cyan" />}
                    title={exp.role}
                    subtitle={`${exp.company}${exp.location ? ` • ${exp.location}` : ''}`}
                    date={`${exp.startDate} - ${exp.endDate || 'Present'}`}
                    description={exp.description}
                    traits={exp.traits}
                    status={exp.endDate === 'Present' || !exp.endDate ? 'running' : 'completed'}
                    color="cyan"
                  />
                </ScrollReveal>
              ))}
            </section>

            {/* Education Pipeline */}
            <section>
              <ScrollReveal>
                <div className="flex items-center gap-3 mb-8">
                  <div className="flex items-center justify-center w-8 h-8 rounded-md bg-neon-magenta/10 border border-neon-magenta/30">
                    <GraduationCap className="h-4 w-4 text-neon-magenta" />
                  </div>
                  <h2 className="text-xl font-bold font-mono">
                    Education<span className="text-neon-magenta">.timeline</span>
                  </h2>
                  <Badge variant="outline" className="font-mono text-xs border-neon-magenta/30 text-neon-magenta">
                    {educationData.length} stages
                  </Badge>
                </div>
              </ScrollReveal>

              {educationData.map((edu, i) => (
                <ScrollReveal key={edu.id} delay={i * 100}>
                  <PipelineStage
                    icon={<GraduationCap className="h-4 w-4 text-neon-magenta" />}
                    title={edu.school}
                    subtitle={`${edu.degree || ''}${edu.gpa ? ` • ${edu.gpa}` : ''}`}
                    date={`${edu.startDate} - ${edu.endDate || 'Present'}`}
                    description={edu.achievements}
                    status={edu.endDate === 'Present' || !edu.endDate ? 'running' : 'completed'}
                    color="magenta"
                  />
                </ScrollReveal>
              ))}
            </section>

            {/* Extracurricular Activities Pipeline */}
            <section>
              <ScrollReveal>
                <div className="flex items-center gap-3 mb-8">
                  <div className="flex items-center justify-center w-8 h-8 rounded-md bg-neon-green/10 border border-neon-green/30">
                    <Heart className="h-4 w-4 text-neon-green" />
                  </div>
                  <h2 className="text-xl font-bold font-mono">
                    Extracurricular<span className="text-neon-green">.activities</span>
                  </h2>
                  <Badge variant="outline" className="font-mono text-xs border-neon-green/30 text-neon-green">
                    {activities.length} stages
                  </Badge>
                </div>
              </ScrollReveal>

              {activities.map((act, i) => (
                <ScrollReveal key={act.id} delay={i * 100}>
                  <PipelineStage
                    icon={<Heart className="h-4 w-4 text-neon-green" />}
                    title={act.role}
                    subtitle={`${act.company}${act.location ? ` • ${act.location}` : ''}`}
                    date={`${act.startDate} - ${act.endDate || 'Present'}`}
                    description={act.description}
                    traits={act.traits}
                    status={act.endDate === 'Present' || !act.endDate ? 'running' : 'completed'}
                    color="green"
                  />
                </ScrollReveal>
              ))}
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            {/* Skills */}
            <ScrollReveal>
              <section className="rounded-xl border border-border/30 bg-card/30 p-5">
                <h2 className="text-lg font-bold font-mono mb-4">
                  <span className="text-primary">$</span> Skills
                </h2>
                <div className="space-y-5">
                  {skillsData.map((skillGroup) => (
                    <div key={skillGroup.id}>
                      <h3 className="text-xs font-medium text-muted-foreground mb-2 font-mono uppercase tracking-wider">
                        {skillGroup.category}
                      </h3>
                      <div className="flex flex-wrap gap-1.5">
                        {skillGroup.items.map((skill) => (
                          <Badge
                            key={skill.name}
                            variant="outline"
                            className="text-xs font-mono border-border/50 hover:border-primary/40 hover:text-primary transition-colors cursor-default"
                          >
                            {skill.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </ScrollReveal>

            {/* Achievements */}
            {achievementsData.length > 0 && (
              <ScrollReveal delay={100}>
                <section className="rounded-xl border border-border/30 bg-card/30 p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <Trophy className="h-4 w-4 text-neon-yellow" />
                    <h2 className="text-lg font-bold font-mono">Achievements</h2>
                  </div>
                  <ul className="space-y-3">
                    {achievementsData.map((award) => (
                      <li key={award.id} className="text-sm flex items-start gap-2">
                        <span className="text-neon-yellow mt-1">▸</span>
                        <div>
                          <span className="font-medium">{award.title}</span>
                          {award.date && <span className="text-muted-foreground text-xs ml-1">({award.date})</span>}
                        </div>
                      </li>
                    ))}
                  </ul>
                </section>
              </ScrollReveal>
            )}

            {/* Certificates */}
            {certificatesData.length > 0 && (
              <ScrollReveal delay={200}>
                <section className="rounded-xl border border-border/30 bg-card/30 p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <Award className="h-4 w-4 text-primary" />
                    <h2 className="text-lg font-bold font-mono">Certificates</h2>
                  </div>
                  <ul className="space-y-3">
                    {certificatesData.map((cert) => (
                      <li key={cert.id} className="text-sm flex items-start gap-2">
                        <span className="text-primary mt-1">▸</span>
                        <div>
                          <span className="font-medium">{cert.title}</span>
                          {cert.issuer && <span className="text-muted-foreground text-xs ml-1">• {cert.issuer}</span>}
                        </div>
                      </li>
                    ))}
                  </ul>
                </section>
              </ScrollReveal>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
