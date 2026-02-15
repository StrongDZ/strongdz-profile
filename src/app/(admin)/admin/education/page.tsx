import { db } from '@/db';
import { education } from '@/db/schema';
import { EducationClient } from './education-client';

export default async function AdminEducationPage() {
  const data = await db.select().from(education);
  return <EducationClient education={data} />;
}
