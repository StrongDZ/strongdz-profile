'use server';

import { db } from '@/db';
import { profile } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const profileSchema = z.object({
    fullName: z.string().min(1, 'Name is required'),
    headline: z.string().optional(),
    email: z.string().email('Valid email required'),
    phone: z.string().optional(),
    location: z.string().optional(),
    githubUrl: z.string().optional(),
    linkedinUrl: z.string().optional(),
    bio: z.string().optional(),
    avatarUrl: z.string().optional(),
    resumeUrl: z.string().optional(),
    isAvailable: z.boolean().optional(),
});

export type ProfileFormState = {
    success: boolean;
    message: string;
    errors?: Record<string, string[]>;
};

export async function updateProfile(
    id: number,
    _prev: ProfileFormState | null,
    formData: FormData
): Promise<ProfileFormState> {
    const raw = Object.fromEntries(formData);
    const parsed = profileSchema.safeParse({
        ...raw,
        isAvailable: formData.get('isAvailable') === 'on',
    });

    if (!parsed.success) {
        return { success: false, message: 'Validation failed', errors: parsed.error.flatten().fieldErrors };
    }

    try {
        await db.update(profile).set({
            fullName: parsed.data.fullName,
            headline: parsed.data.headline || null,
            email: parsed.data.email,
            phone: parsed.data.phone || null,
            location: parsed.data.location || null,
            githubUrl: parsed.data.githubUrl || null,
            linkedinUrl: parsed.data.linkedinUrl || null,
            bio: parsed.data.bio || null,
            avatarUrl: parsed.data.avatarUrl || null,
            resumeUrl: parsed.data.resumeUrl || null,
            isAvailable: parsed.data.isAvailable || false,
        }).where(eq(profile.id, id));

        revalidatePath('/admin/profile');
        revalidatePath('/');
        revalidatePath('/about');
        return { success: true, message: 'Profile updated successfully' };
    } catch {
        return { success: false, message: 'Failed to update profile' };
    }
}
