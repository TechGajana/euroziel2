// components/FloatingLogo.tsx
'use client';

import Image from 'next/image';

export default function FloatingLogo() {
    return (
        <div className="absolute top-0 left-6 z-50 w-[20vw] min-w-[48px] max-w-[900px] h-auto transition-all duration-300">
            <Image
                src="/images/logo/logo2.svg"
                alt="Logo"
                width={100}
                height={100}
                className="w-100 h-auto object-contain"
                priority // Ensures the logo loads instantly
            />
        </div>

    );
}