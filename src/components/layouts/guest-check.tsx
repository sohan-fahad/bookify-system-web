'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import useIsJWTValid from '@src/hooks/useIsJWTValid';
import { useAuthenticationStore } from '@src/hooks/stores';
import { LoadingSpinner } from '../ui';

interface GuestCheckProps {
    children: React.ReactNode;
    redirectTo?: string;
}

const GuestCheck = ({ children, redirectTo = '/profile' }: GuestCheckProps) => {
    const router = useRouter();
    const isJWTValid = useIsJWTValid();
    const { isLoggedIn, user } = useAuthenticationStore();

    useEffect(() => {
        if (isJWTValid && isLoggedIn && user) {
            router.replace(redirectTo);
        }
    }, [isJWTValid, isLoggedIn, user, router, redirectTo]);

    if (isJWTValid && isLoggedIn) {
        return (
            <div className="flex items-center justify-center h-screen">
                <LoadingSpinner size="lg" text="Redirecting..." />
            </div>
        );
    }

    return <>{children}</>;
};

export default GuestCheck;