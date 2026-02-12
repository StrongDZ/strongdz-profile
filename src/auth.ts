import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';

const adminEmail = process.env.ADMIN_EMAIL;
const adminPassword = process.env.ADMIN_PASSWORD;

if (!adminEmail || !adminPassword) {
    console.warn('⚠️ ADMIN_EMAIL or ADMIN_PASSWORD not set in environment variables.');
}

const signInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1),
});

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                const { email, password } = await signInSchema.parseAsync(credentials);

                if (email === adminEmail && password === adminPassword) {
                    // Return a user object. The `id` is required.
                    return {
                        id: 'admin',
                        email: email,
                        name: 'Administrator',
                        image: `https://ui-avatars.com/api/?name=Admin&background=00f0ff&color=fff`, // Neo-cyan avatar
                    };
                }

                return null;
            },
        }),
    ],
    pages: {
        signIn: '/admin/login',
        error: '/admin/login', // Redirect back to login on error
    },
    callbacks: {
        jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
            }
            return token;
        },
        session({ session, token }) {
            if (token && session.user) {
                session.user.id = token.id as string;
                session.user.email = token.email as string;
            }
            return session;
        },
        authorized({ auth, request }) {
            const { pathname } = request.nextUrl;

            // Public routes — always allow
            if (!pathname.startsWith('/admin')) return true;

            // Auth API routes — always allow
            if (pathname.startsWith('/api/auth')) return true;

            // Login page — always allow (otherwise CSS/JS can't load)
            if (pathname === '/admin/login') return true;

            // All other /admin/* routes — require authentication
            return !!auth?.user;
        },
    },
});
