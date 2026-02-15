import { db } from '@/db';
import { skills } from '@/db/schema';
import { asc } from 'drizzle-orm';
import { SkillsClient } from './skills-client';

export default async function AdminSkillsPage() {
  const data = await db.select().from(skills).orderBy(asc(skills.displayOrder));
  return <SkillsClient skills={data} />;
}
