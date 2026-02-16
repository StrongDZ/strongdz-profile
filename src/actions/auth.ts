'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        const email = formData.get('email'); ``
        const password = formData.get('password');
        // Using check logic from previous plan but here wrapped in server action
        // Note: redirectTo in v5 seems to work as an option or part of config
        await signIn('credentials', {
            email,
            password,
            redirectTo: '/admin'
        });
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    }
}
