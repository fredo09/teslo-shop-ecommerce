/**
 * Page Login
 */

import { titleFont } from '@/config/fonts';
import { LoginFrom } from './ui/LoginForm/index';

export default function LoginPage() {
    return (
        <div className="flex flex-col min-h-screen pt-24 sm:pt-40">

            <h1 className={`${titleFont.className} text-4xl mb-5`}>Ingresar</h1>

            {/* LoginFrom */}
            <LoginFrom/>
        </div>
    );
}