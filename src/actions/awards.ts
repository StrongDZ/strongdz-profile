'use server';

import { db } from '@/db';
import { awards } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const awardSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    issuer: z.string().optional(),
    date: z.string().optional(),
    url: z.string().optional(),
    type: z.enum(['CERTIFICATE', 'AWARD']),
});

export type AwardFormState = {
    success: boolean;
    message: string;
    errors?: Record<string, string[]>;
};

export async function createAward(
    _prev: AwardFormState | null,
    formData: FormData
): Promise<AwardFormState> {
    const raw = Object.fromEntries(formData);
    const parsed = awardSchema.safeParse(raw);

    if (!parsed.success) {
        return { success: false, message: 'Validation failed', errors: parsed.error.flatten().fieldErrors };
    }

    try {
        await db.insert(awards).values({
            title: parsed.data.title,
            issuer: parsed.data.issuer || null,
            date: parsed.data.date || null,
            url: parsed.data.url || null,
            type: parsed.data.type,
        });

        revalidatePath('/admin/awards');
        revalidatePath('/about');
        return { success: true, message: 'Award created successfully' };
    } catch {
        return { success: false, message: 'Failed to create award' };
    }
}

export async function updateAward(
    id: number,
    _prev: AwardFormState | null,
    formData: FormData
): Promise<AwardFormState> {
    const raw = Object.fromEntries(formData);
    const parsed = awardSchema.safeParse(raw);

    if (!parsed.success) {
        return { success: false, message: 'Validation failed', errors: parsed.error.flatten().fieldErrors };
    }

    try {
        await db.update(awards).set({
            title: parsed.data.title,
            issuer: parsed.data.issuer || null,
            date: parsed.data.date || null,
            url: parsed.data.url || null,
            type: parsed.data.type,
        }).where(eq(awards.id, id));

        revalidatePath('/admin/awards');
        revalidatePath('/about');
        return { success: true, message: 'Award updated successfully' };
    } catch {
        return { success: false, message: 'Failed to update award' };
    }
}

export async function deleteAward(id: number) {
    await db.delete(awards).where(eq(awards.id, id));
    revalidatePath('/admin/awards');
    revalidatePath('/about');
}
