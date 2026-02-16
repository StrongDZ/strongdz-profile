'use server';

import { db } from '@/db';
import { experiences } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const expSchema = z.object({
    type: z.enum(['WORK', 'ACTIVITY']),
    role: z.string().min(1, 'Role is required'),
    company: z.string().min(1, 'Company/Organization is required'),
    location: z.string().optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    description: z.string().optional(),
    traits: z.string().optional(), // comma-separated
    order: z.coerce.number().optional(),
});

export type ExpFormState = {
    success: boolean;
    message: string;
    errors?: Record<string, string[]>;
};

export async function createExperience(
    _prev: ExpFormState | null,
    formData: FormData
): Promise<ExpFormState> {
    const raw = Object.fromEntries(formData);
    const parsed = expSchema.safeParse(raw);

    if (!parsed.success) {
        return { success: false, message: 'Validation failed', errors: parsed.error.flatten().fieldErrors };
    }

    try {
        const traits = parsed.data.traits
            ? parsed.data.traits.split(',').map((s) => s.trim()).filter(Boolean)
            : [];

        await db.insert(experiences).values({
            type: parsed.data.type,
            role: parsed.data.role,
            company: parsed.data.company,
            location: parsed.data.location || null,
            startDate: parsed.data.startDate || null,
            endDate: parsed.data.endDate || null,
            description: parsed.data.description || null,
            traits,
            order: parsed.data.order || 0,
        });

        revalidatePath('/admin/experiences');
        revalidatePath('/about');
        return { success: true, message: 'Experience created successfully' };
    } catch {
        return { success: false, message: 'Failed to create experience' };
    }
}

export async function updateExperience(
    id: number,
    _prev: ExpFormState | null,
    formData: FormData
): Promise<ExpFormState> {
    const raw = Object.fromEntries(formData);
    const parsed = expSchema.safeParse(raw);

    if (!parsed.success) {
        return { success: false, message: 'Validation failed', errors: parsed.error.flatten().fieldErrors };
    }

    try {
        const traits = parsed.data.traits
            ? parsed.data.traits.split(',').map((s) => s.trim()).filter(Boolean)
            : [];

        await db.update(experiences).set({
            type: parsed.data.type,
            role: parsed.data.role,
            company: parsed.data.company,
            location: parsed.data.location || null,
            startDate: parsed.data.startDate || null,
            endDate: parsed.data.endDate || null,
            description: parsed.data.description || null,
            traits,
            order: parsed.data.order || 0,
        }).where(eq(experiences.id, id));

        revalidatePath('/admin/experiences');
        revalidatePath('/about');
        return { success: true, message: 'Experience updated successfully' };
    } catch {
        return { success: false, message: 'Failed to update experience' };
    }
}

export async function deleteExperience(id: number) {
    await db.delete(experiences).where(eq(experiences.id, id));
    revalidatePath('/admin/experiences');
    revalidatePath('/about');
}
