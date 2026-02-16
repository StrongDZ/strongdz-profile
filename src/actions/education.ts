'use server';

import { db } from '@/db';
import { education } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const eduSchema = z.object({
    school: z.string().min(1, 'School is required'),
    degree: z.string().optional(),
    gpa: z.string().optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    achievements: z.string().optional(),
});

export type EduFormState = {
    success: boolean;
    message: string;
    errors?: Record<string, string[]>;
};

export async function createEducation(
    _prev: EduFormState | null,
    formData: FormData
): Promise<EduFormState> {
    const raw = Object.fromEntries(formData);
    const parsed = eduSchema.safeParse(raw);

    if (!parsed.success) {
        return { success: false, message: 'Validation failed', errors: parsed.error.flatten().fieldErrors };
    }

    try {
        await db.insert(education).values({
            school: parsed.data.school,
            degree: parsed.data.degree || null,
            gpa: parsed.data.gpa || null,
            startDate: parsed.data.startDate || null,
            endDate: parsed.data.endDate || null,
            achievements: parsed.data.achievements || null,
        });

        revalidatePath('/admin/education');
        revalidatePath('/about');
        return { success: true, message: 'Education created successfully' };
    } catch {
        return { success: false, message: 'Failed to create education' };
    }
}

export async function updateEducation(
    id: number,
    _prev: EduFormState | null,
    formData: FormData
): Promise<EduFormState> {
    const raw = Object.fromEntries(formData);
    const parsed = eduSchema.safeParse(raw);

    if (!parsed.success) {
        return { success: false, message: 'Validation failed', errors: parsed.error.flatten().fieldErrors };
    }

    try {
        await db.update(education).set({
            school: parsed.data.school,
            degree: parsed.data.degree || null,
            gpa: parsed.data.gpa || null,
            startDate: parsed.data.startDate || null,
            endDate: parsed.data.endDate || null,
            achievements: parsed.data.achievements || null,
        }).where(eq(education.id, id));

        revalidatePath('/admin/education');
        revalidatePath('/about');
        return { success: true, message: 'Education updated successfully' };
    } catch {
        return { success: false, message: 'Failed to update education' };
    }
}

export async function deleteEducation(id: number) {
    await db.delete(education).where(eq(education.id, id));
    revalidatePath('/admin/education');
    revalidatePath('/about');
}
