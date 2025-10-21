'use client';

import { useEffect } from 'react';
import { Button, Text } from '@src/components/ui';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Error = ({
    error,
}: {
    error: Error & { digest?: string };
}) => {
    const router = useRouter();

    useEffect(() => {
        console.error('Application error:', error);
    }, [error]);

    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-background">
            <div className="max-w-2xl w-full text-center">
                <div className="mb-8">
                    <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-red-500/10 mb-4">
                        <AlertCircle className="h-12 w-12 text-red-500" />
                    </div>
                </div>

                <div className="mb-8 w-full">
                    <Text as="h1" size="4xl" weight="bold" className="text-foreground text-center mb-4">
                        Oops! Something went wrong
                    </Text>
                    <Text size="lg" color="muted" className="max-w-md mx-auto text-center mb-4">
                        We're sorry, but something unexpected happened. Don't worry, our team has been notified.
                    </Text>

                    {process.env.NODE_ENV === 'development' && (
                        <details className="mt-4 text-left bg-secondary p-4 rounded-lg max-w-lg mx-auto text-center">
                            <summary className="cursor-pointer text-sm font-medium text-muted-foreground mb-2">
                                Error Details (Development Only)
                            </summary>
                            <pre className="text-xs overflow-auto text-red-400">
                                {error.message}
                            </pre>
                            {error.digest && (
                                <Text size="xs" color="muted" className="mt-2">
                                    Error ID: {error.digest}
                                </Text>
                            )}
                        </details>
                    )}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Button
                        size="lg"
                        onClick={() => router.refresh()}
                        className="gap-2 min-w-[160px]"
                    >
                        <RefreshCw className="h-5 w-5" />
                        Try Again
                    </Button>
                    <Link href="/">
                        <Button
                            variant="outline"
                            size="lg"
                            className="gap-2 min-w-[160px]"
                        >
                            <Home className="h-5 w-5" />
                            Go Home
                        </Button>
                    </Link>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-200/10">
                    <Text size="sm" color="muted">
                        If this problem persists, please contact our support team.
                    </Text>
                </div>
            </div>
        </div>
    );
}

export default Error;