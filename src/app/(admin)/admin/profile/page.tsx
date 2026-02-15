import { db } from '@/db';
import { profile } from '@/db/schema';
import { ProfileEditor } from './profile-editor';
import { redirect } from 'next/navigation';

export default async function AdminProfilePage() {
  const [p] = await db.select().from(profile).limit(1);

  if (!p) {
    return (
      <div className="text-center py-16">
        <p className="font-mono text-muted-foreground">No profile found. Run the seed script first.</p>
      </div>
    );
  }

  return <ProfileEditor profile={p} />;
}
