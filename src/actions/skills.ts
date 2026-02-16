'use server';

import { db } from '@/db';
import { skills } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const skillSchema = z.object({
    category: z.string().min(1, 'Category is required'),
    items: z.string().min(1, 'Items are required'), // JSON string
    displayOrder: z.coerce.number().optional(),
});

export type SkillFormState = {
    success: boolean;
    message: string;
    errors?: Record<string, string[]>;
};

function parseItems(itemsJson: string): { name: string; icon?: string }[] {
    try {
        const parsed = JSON.parse(itemsJson);
        if (!Array.isArray(parsed)) return [];
        return parsed
            .filter((i: { name?: string }) => i.name?.trim())
            .map((i: { name: string; icon?: string }) => {
                const item: { name: string; icon?: string } = { name: i.name.trim() };
                if (i.icon?.trim()) item.icon = i.icon.trim();
                return item;
            });
    } catch {
        return [];
    }
}

export async function createSkill(
    _prev: SkillFormState | null,
    formData: FormData
): Promise<SkillFormState> {
    const raw = Object.fromEntries(formData);
    const parsed = skillSchema.safeParse(raw);

    if (!parsed.success) {
        return { success: false, message: 'Validation failed', errors: parsed.error.flatten().fieldErrors };
    }

    try {
        const items = parseItems(parsed.data.items);
        if (items.length === 0) {
            return { success: false, message: 'At least one skill item is required' };
        }

        await db.insert(skills).values({
            category: parsed.data.category,
            items,
            displayOrder: parsed.data.displayOrder || 0,
        });

        revalidatePath('/admin/skills');
        revalidatePath('/about');
        revalidatePath('/');
        return { success: true, message: 'Skill group created successfully' };
    } catch {
        return { success: false, message: 'Failed to create skill group' };
    }
}

export async function updateSkill(
    id: number,
    _prev: SkillFormState | null,
    formData: FormData
): Promise<SkillFormState> {
    const raw = Object.fromEntries(formData);
    const parsed = skillSchema.safeParse(raw);

    if (!parsed.success) {
        return { success: false, message: 'Validation failed', errors: parsed.error.flatten().fieldErrors };
    }

    try {
        const items = parseItems(parsed.data.items);
        if (items.length === 0) {
            return { success: false, message: 'At least one skill item is required' };
        }

        await db.update(skills).set({
            category: parsed.data.category,
            items,
            displayOrder: parsed.data.displayOrder || 0,
        }).where(eq(skills.id, id));

        revalidatePath('/admin/skills');
        revalidatePath('/about');
        revalidatePath('/');
        return { success: true, message: 'Skill group updated successfully' };
    } catch {
        return { success: false, message: 'Failed to update skill group' };
    }
}

export async function deleteSkill(id: number) {
    await db.delete(skills).where(eq(skills.id, id));
    revalidatePath('/admin/skills');
    revalidatePath('/about');
    revalidatePath('/');
}
