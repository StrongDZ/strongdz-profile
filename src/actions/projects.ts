'use server';

import { db } from '@/db';
import { projects } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const projectSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    slug: z.string().min(1, 'Slug is required'),
    brief: z.string().optional(),
    content: z.string().optional(),
    techStack: z.string().optional(), // comma-separated
    repoUrl: z.string().optional(),
    demoUrl: z.string().optional(),
    thumbnailUrl: z.string().optional(),
    featured: z.boolean().optional(),
});

export type ProjectFormState = {
    success: boolean;
    message: string;
    errors?: Record<string, string[]>;
};

export async function createProject(
    _prev: ProjectFormState | null,
    formData: FormData
): Promise<ProjectFormState> {
    const raw = Object.fromEntries(formData);
    const parsed = projectSchema.safeParse({
        ...raw,
        featured: formData.get('featured') === 'on',
    });

    if (!parsed.success) {
        return { success: false, message: 'Validation failed', errors: parsed.error.flatten().fieldErrors };
    }

    try {
        const techStack = parsed.data.techStack
            ? parsed.data.techStack.split(',').map((s) => s.trim()).filter(Boolean)
            : [];

        await db.insert(projects).values({
            title: parsed.data.title,
            slug: parsed.data.slug,
            brief: parsed.data.brief || null,
            content: parsed.data.content || null,
            techStack,
            repoUrl: parsed.data.repoUrl || null,
            demoUrl: parsed.data.demoUrl || null,
            thumbnailUrl: parsed.data.thumbnailUrl || null,
            featured: parsed.data.featured || false,
        });

        revalidatePath('/admin/projects');
        revalidatePath('/projects');
        revalidatePath('/');
        return { success: true, message: 'Project created successfully' };
    } catch (e) {
        return { success: false, message: 'Failed to create project' };
    }
}

export async function updateProject(
    id: number,
    _prev: ProjectFormState | null,
    formData: FormData
): Promise<ProjectFormState> {
    const raw = Object.fromEntries(formData);
    const parsed = projectSchema.safeParse({
        ...raw,
        featured: formData.get('featured') === 'on',
    });

    if (!parsed.success) {
        return { success: false, message: 'Validation failed', errors: parsed.error.flatten().fieldErrors };
    }

    try {
        const techStack = parsed.data.techStack
            ? parsed.data.techStack.split(',').map((s) => s.trim()).filter(Boolean)
            : [];

        await db.update(projects).set({
            title: parsed.data.title,
            slug: parsed.data.slug,
            brief: parsed.data.brief || null,
            content: parsed.data.content || null,
            techStack,
            repoUrl: parsed.data.repoUrl || null,
            demoUrl: parsed.data.demoUrl || null,
            thumbnailUrl: parsed.data.thumbnailUrl || null,
            featured: parsed.data.featured || false,
        }).where(eq(projects.id, id));

        revalidatePath('/admin/projects');
        revalidatePath('/projects');
        revalidatePath('/');
        return { success: true, message: 'Project updated successfully' };
    } catch (e) {
        return { success: false, message: 'Failed to update project' };
    }
}

export async function deleteProject(id: number) {
    await db.delete(projects).where(eq(projects.id, id));
    revalidatePath('/admin/projects');
    revalidatePath('/projects');
    revalidatePath('/');
}
