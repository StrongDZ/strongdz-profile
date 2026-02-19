import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { db } from "@/db";
import { profile } from "@/db/schema";

export const dynamic = 'force-dynamic';

export default async function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [profileData] = await db.select().from(profile).limit(1);

  return (
    <div className="flex min-h-screen flex-col">
      <Header
        githubUrl={profileData?.githubUrl}
        resumeUrl={profileData?.resumeUrl}
      />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
