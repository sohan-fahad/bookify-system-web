'use client';

import { useState } from 'react';
import { Dialog } from '@src/components/ui';
import { useGlobalUIStore } from '@src/hooks/stores';
import SignInForm from './sign-in-form';
import SignUpForm from './sign-up-form';

const AuthModal = () => {
    const { isAuthModalOpen, setIsAuthModalOpen } = useGlobalUIStore();

    console.log('isAuthModalOpen', isAuthModalOpen);
    const [isSignUp, setIsSignUp] = useState(false);

    const handleClose = () => {
        setIsAuthModalOpen(false);
        setIsSignUp(false);
    };

    const switchToSignUp = () => {
        setIsSignUp(true);
    };

    const switchToSignIn = () => {
        setIsSignUp(false);
    };

    return (
        <Dialog
            open={isAuthModalOpen}
            onClose={handleClose}
            size="md"
            className="max-w-md"
        >
            <div className="space-y-6">
                {isSignUp ? (
                    <SignUpForm onSwitchToSignIn={switchToSignIn} />
                ) : (
                    <SignInForm onSwitchToSignUp={switchToSignUp} />
                )}
            </div>
        </Dialog>
    );
};

export default AuthModal;