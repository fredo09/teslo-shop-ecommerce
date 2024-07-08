'use server';

import { signIn } from '@/auth.config';
//import { sleep } from '@/utils';
// import { AuthError } from 'next-auth';

// ...

//! Forma del video
export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {

        // await sleep(2);

        await signIn('credentials', {
            ...Object.fromEntries(formData),
            redirect: false,
        });

        console.log("🚀 ~ si ocurrio algo:");
        return 'Success';


    } catch(error) {
        console.log("🚀 ~ error:", error);
        
        return 'CredentialsSignin';
        // if ((error as Error).message.includes('CredentialsSignin')) {
            // }
        //throw error;
        //return 'Error desconocido 🤡';
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
