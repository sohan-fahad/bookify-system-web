'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import { Button } from '@src/components/ui';
import { Input } from '@src/components/ui';
import { Text } from '@src/components/ui';
import { useGlobalUIStore, useAuthenticationStore } from '@src/hooks/stores';
import { SignUpFormData, signUpSchema } from '@src/schemas';
import { AuthService } from '@src/services/apis/auth.service';
import { toast } from 'react-toastify';


interface SignUpFormProps {
    onSwitchToSignIn: () => void;
}

const SignUpForm = ({ onSwitchToSignIn }: SignUpFormProps) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { setIsAuthModalOpen } = useGlobalUIStore();
    const { setIsLoggedIn, setUser, setToken } = useAuthenticationStore();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignUpFormData>({
        resolver: zodResolver(signUpSchema),
    });

    const onSubmit = async (data: SignUpFormData) => {
        setIsLoading(true);

        try {
            const response = await AuthService.signUp(data);

            if (!response?.success) {
                toast.error(response?.message || 'Registration failed. Please try again.');
                return;
            }

            setUser(response?.data?.user);
            setToken(response?.data?.token);
            setIsLoggedIn(true);
            setIsAuthModalOpen(false);

        } catch (error: any) {
            toast.error(error?.message || 'Registration failed. Please try again.');

        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="space-y-6">
            <div className="text-center">
                <Text as="h2" size="2xl" weight="bold" className="mb-2">
                    Create Account
                </Text>
                <Text color="muted">
                    Sign up to get started with your account
                </Text>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Input
                    {...register('name')}
                    label="Full Name"
                    type="text"
                    placeholder="Enter your full name"
                    leftIcon={<User className="h-4 w-4" />}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                />

                <Input
                    {...register('email')}
                    label="Email Address"
                    type="email"
                    placeholder="Enter your email"
                    leftIcon={<Mail className="h-4 w-4" />}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                />

                <Input
                    {...register('password')}
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    leftIcon={<Lock className="h-4 w-4" />}
                    rightIcon={
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="hover:text-gray-600 transition-colors"
                        >
                            {showPassword ? (
                                <EyeOff className="h-4 w-4" />
                            ) : (
                                <Eye className="h-4 w-4" />
                            )}
                        </button>
                    }
                    error={!!errors.password}
                    helperText={errors.password?.message}
                />

                {errors.root && (
                    <div className="text-sm text-red-500 bg-red-50 p-3 rounded-md">
                        {errors.root.message}
                    </div>
                )}

                <Button
                    type="submit"
                    className="w-full"
                    disabled={isLoading}
                >
                    {isLoading ? 'Creating Account...' : 'Sign Up'}
                </Button>
            </form>

            <div className="text-center">
                <Text size="sm" color="muted">
                    Already have an account?{' '}
                    <button
                        type="button"
                        onClick={onSwitchToSignIn}
                        className="text-primary hover:underline font-medium"
                    >
                        Sign in
                    </button>
                </Text>
            </div>
        </div>
    );
};

export default SignUpForm;