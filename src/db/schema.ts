import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

// --- 1. PROFILE & BIO (Thông tin cá nhân) ---
export const profile = sqliteTable('profile', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    fullName: text('full_name').notNull(),
    headline: text('headline'),
    email: text('email').notNull(),
    phone: text('phone'),
    location: text('location'),
    githubUrl: text('github_url'),
    linkedinUrl: text('linkedin_url'),
    bio: text('bio'),
    avatarUrl: text('avatar_url'),
    resumeUrl: text('resume_url'),
    isAvailable: integer('is_available', { mode: 'boolean' }).default(true),
});

// --- 2. EXPERIENCES (Work + Extracurricular Activities) ---
export const experiences = sqliteTable('experiences', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    type: text('type').notNull(), // 'WORK' | 'ACTIVITY'
    role: text('role').notNull(),
    company: text('company').notNull(),
    location: text('location'),
    startDate: text('start_date'),
    endDate: text('end_date'),
    description: text('description'),
    traits: text('traits', { mode: 'json' }).$type<string[]>(),
    order: integer('order').default(0),
});

// --- 3. PROJECTS (Dự án nổi bật) ---
export const projects = sqliteTable('projects', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    title: text('title').notNull(),
    slug: text('slug').notNull().unique(),
    brief: text('brief'),
    content: text('content'),
    techStack: text('tech_stack', { mode: 'json' }).$type<string[]>(),
    repoUrl: text('repo_url'),
    demoUrl: text('demo_url'),
    thumbnailUrl: text('thumbnail_url'),
    featured: integer('featured', { mode: 'boolean' }).default(false),
    createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`),
});

// --- 4. EDUCATION (Học vấn) ---
export const education = sqliteTable('education', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    school: text('school').notNull(),
    degree: text('degree'),
    gpa: text('gpa'),
    startDate: text('start_date'),
    endDate: text('end_date'),
    achievements: text('achievements'),
});

// --- 5. SKILLS (Kỹ năng) ---
export const skills = sqliteTable('skills', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    category: text('category').notNull(),
    items: text('items', { mode: 'json' }).$type<{ name: string; icon?: string }[]>().notNull(),
    displayOrder: integer('display_order').default(0),
});

// --- 6. CERTIFICATES & AWARDS (Chứng chỉ & Giải thưởng) ---
export const awards = sqliteTable('awards', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    title: text('title').notNull(),
    issuer: text('issuer'),
    date: text('date'),
    url: text('url'),
    type: text('type').notNull(), // 'CERTIFICATE' | 'AWARD'
});

// --- 7. CONTACT MESSAGES ---
export const messages = sqliteTable('messages', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    name: text('name').notNull(),
    email: text('email').notNull(),
    subject: text('subject'),
    message: text('message').notNull(),
    isRead: integer('is_read', { mode: 'boolean' }).default(false),
    createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`),
});

// Type exports
export type Profile = typeof profile.$inferSelect;
export type Experience = typeof experiences.$inferSelect;
export type Project = typeof projects.$inferSelect;
export type Education = typeof education.$inferSelect;
export type Skill = typeof skills.$inferSelect;
export type Award = typeof awards.$inferSelect;
export type Message = typeof messages.$inferSelect;
