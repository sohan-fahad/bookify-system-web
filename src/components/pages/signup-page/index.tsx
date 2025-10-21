'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Mail, Lock, User, CheckCircle } from 'lucide-react';
import { Button } from '@src/components/ui';
import { Input } from '@src/components/ui';
import { Text } from '@src/components/ui';
import { useAuthenticationStore } from '@src/hooks/stores';
import { SignUpFormData, signUpSchema } from '@src/schemas';
import { AuthService } from '@src/services/apis';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const SignUpPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { setIsLoggedIn, setUser, setToken } = useAuthenticationStore();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm<SignUpFormData>({
        resolver: zodResolver(signUpSchema),
    });

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const referralCode = urlParams.get('r');

        if (referralCode) {
            setValue('referralCode', referralCode);
        }
    }, []);

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
            toast.success('Account created successfully!');

            router.push('/');

        } catch (error: any) {
            toast.error(error?.message || 'Registration failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-full max-w-md mx-auto">
                <div className="bg-secondary rounded-lg shadow-lg p-8">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <User className="h-8 w-8 text-primary" />
                        </div>
                        <Text as="h2" size="3xl" weight="bold" align="center" className="mb-2 text-foreground">
                            Create Account
                        </Text>
                        <Text size="lg" color="muted" align="center">
                            Join our community today
                        </Text>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="space-y-2">
                            <Input
                                {...register('name')}
                                label="Full Name"
                                type="text"
                                placeholder="Enter your full name"
                                leftIcon={<User className="h-4 w-4" />}
                                error={!!errors.name}
                                helperText={errors.name?.message}
                                size="lg"
                            />
                        </div>

                        <div className="space-y-2">
                            <Input
                                {...register('email')}
                                label="Email Address"
                                type="email"
                                placeholder="Enter your email"
                                leftIcon={<Mail className="h-4 w-4" />}
                                error={!!errors.email}
                                helperText={errors.email?.message}
                                size="lg"
                            />
                        </div>

                        <div className="space-y-2">
                            <Input
                                {...register('password')}
                                label="Password"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Create a strong password"
                                leftIcon={<Lock className="h-4 w-4" />}
                                rightIcon={
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="hover:text-primary transition-colors mt-2"
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
                                size="lg"
                            />
                        </div>

                        {errors.root && (
                            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                                <div className="flex items-center space-x-2">
                                    <div className="w-5 h-5 bg-destructive/20 rounded-full flex items-center justify-center">
                                        <Text size="xs" className="text-destructive">!</Text>
                                    </div>
                                    <Text size="sm" className="text-destructive">
                                        {errors.root.message}
                                    </Text>
                                </div>
                            </div>
                        )}

                        <Button
                            type="submit"
                            className="w-full h-12 text-lg font-semibold"
                            disabled={isLoading}
                            size="lg"
                        >
                            {isLoading ? (
                                <div className="flex items-center space-x-2">
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    <span>Creating Account...</span>
                                </div>
                            ) : (
                                <div className="flex items-center space-x-2">
                                    <CheckCircle className="h-5 w-5" />
                                    <span>Create Account</span>
                                </div>
                            )}
                        </Button>
                    </form>

                    <div className="mt-8 text-center">
                        <Text size="sm" color="muted">
                            Already have an account?{' '}
                            <button
                                type="button"
                                onClick={() => router.push('/auth')}
                                className="text-primary cursor-pointer hover:underline font-semibold transition-colors"
                            >
                                Sign in
                            </button>
                        </Text>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;