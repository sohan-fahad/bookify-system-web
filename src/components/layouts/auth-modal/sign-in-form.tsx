'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { Button } from '@src/components/ui';
import { Input } from '@src/components/ui';
import { Text } from '@src/components/ui';
import { useGlobalUIStore, useAuthenticationStore } from '@src/hooks/stores';
import { SignInFormData, signInSchema } from '@src/schemas';
import { AuthService } from '@src/services/apis/auth.service';
import { toast } from 'react-toastify';


interface SignInFormProps {
    onSwitchToSignUp: () => void;
}


const SignInForm = ({ onSwitchToSignUp }: SignInFormProps) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { setIsAuthModalOpen } = useGlobalUIStore();
    const { setIsLoggedIn, setUser, setToken } = useAuthenticationStore();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<SignInFormData>({
        resolver: zodResolver(signInSchema),
    });

    const onSubmit = async (data: SignInFormData) => {
        setIsLoading(true);

        try {
            const response = await AuthService.signIn(data);

            if (!response?.success) {
                toast.error(response?.message);
                return;
            }

            setUser(response?.data?.user);
            setToken(response?.data?.token);
            setIsLoggedIn(true);
            setIsAuthModalOpen(false);

        } catch (error) {
            setError('root', {
                message: 'Invalid email or password. Please try again.',
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="text-center">
                <Text as="h2" size="2xl" weight="bold" className="mb-2">
                    Welcome Back
                </Text>
                <Text color="muted">
                    Sign in to your account to continue
                </Text>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                            className="hover:text-gray-600 transition-colors mt-2"
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

                <div className="flex items-center justify-between">
                    <label className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            className="rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <Text size="sm" color="muted">Remember me</Text>
                    </label>
                    <button
                        type="button"
                        className="text-sm text-primary hover:underline"
                    >
                        Forgot password?
                    </button>
                </div>

                <Button
                    type="submit"
                    className="w-full"
                    disabled={isLoading}
                >
                    {isLoading ? 'Signing in...' : 'Sign In'}
                </Button>
            </form>

            <div className="text-center">
                <Text size="sm" color="muted">
                    Don't have an account?{' '}
                    <button
                        type="button"
                        onClick={onSwitchToSignUp}
                        className="text-primary hover:underline font-medium"
                    >
                        Sign up
                    </button>
                </Text>
            </div>
        </div>
    );
};

export default SignInForm;