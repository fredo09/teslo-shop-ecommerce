'use server';

import { signIn } from '@/auth.config';
// import { AuthError } from 'next-auth';

// ...

//! Forma del video
export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        console.log("🚀 ~ Object.fromEntries(formData):", Object.fromEntries(formData))
        await signIn('credentials', Object.fromEntries(formData));
    } catch(error) {
        // if ((error as Error).message.includes('CredentialsSignin')) {
            // }
        //throw error;
        return 'CredentialsSignin';
    }
}

//! Forma que esta en la documentacion
// export async function authenticate(
// prevState: string | undefined,
// formData: FormData,
// ) {
//     try {
//         console.log("🚀 ~ formData:", formData);
//         await signIn('credentials', formData);
//     } catch (error) {

//         console.log("🚀 ~ error:", error);

//         if (error instanceof AuthError) {
//             switch (error.type) {
//                 case 'CredentialsSignin':
//                     return 'Invalid credentials.';
//                 default:
//                     return 'Something went wrong.';
//             }
//         }
//         throw error;
//     }
// }
