import { db } from '@/db';
import { experiences } from '@/db/schema';
import { asc } from 'drizzle-orm';
import { ExperiencesClient } from './experiences-client';

export default async function AdminExperiencesPage() {
  const allExps = await db.select().from(experiences).orderBy(asc(experiences.order));
  return <ExperiencesClient experiences={allExps} />;
}
