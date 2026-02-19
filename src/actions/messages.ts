'use server';

import { db } from '@/db';
import { messages } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function markAsRead(id: number) {
    await db.update(messages).set({ isRead: true }).where(eq(messages.id, id));
    revalidatePath('/admin/messages');
    revalidatePath('/admin');
}

export async function markAsUnread(id: number) {
    await db.update(messages).set({ isRead: false }).where(eq(messages.id, id));
    revalidatePath('/admin/messages');
    revalidatePath('/admin');
}

export async function deleteMessage(id: number) {
    await db.delete(messages).where(eq(messages.id, id));
    revalidatePath('/admin/messages');
    revalidatePath('/admin');
}

export async function sendMessage(formData: FormData) {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const subject = formData.get('subject') as string;
    const message = formData.get('message') as string;

    if (!name || !email || !message) {
        return { error: 'Please fill in all required fields.' };
    }

    await db.insert(messages).values({ name, email, subject, message });
    revalidatePath('/admin/messages');
    return { success: true };
}
