import { db } from '@/db';
import { awards } from '@/db/schema';
import { AwardsClient } from './awards-client';

export default async function AdminAwardsPage() {
  const data = await db.select().from(awards);
  return <AwardsClient awards={data} />;
}
