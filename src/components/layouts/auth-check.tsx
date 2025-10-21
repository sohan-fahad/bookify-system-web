'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import useIsJWTValid from '@src/hooks/useIsJWTValid';
import { useAuthenticationStore } from '@src/hooks/stores';
import { useMe } from '@src/hooks/queries';
import { LoadingSpinner } from '../ui';

interface AuthCheckProps {
  children: React.ReactNode;
}

const AuthCheck = ({ children }: AuthCheckProps) => {
  const router = useRouter();
  const isJWTValid = useIsJWTValid();
  const { setUser, setIsLoggedIn } = useAuthenticationStore();

  const { data: user, isLoading, isError } = useMe();

  useEffect(() => {
    if (!isJWTValid) {
      setIsLoggedIn(false);
      setUser(null);
      router.replace('/auth');
      return;
    }

    if (user) {
      setUser(user);
      setIsLoggedIn(true);
    }

    if (isError) {
      setIsLoggedIn(false);
      setUser(null);
      router.replace('/auth');
    }
  }, [isJWTValid, user, isError, router, setUser, setIsLoggedIn]);

  if (isLoading || !user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner size="lg" text="Loading..." />
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthCheck;