'use client';

import Link from 'next/link';
import { Button, Text } from '@src/components/ui';
import { Home, Search, ArrowLeft } from 'lucide-react';

const NotFound = () => {
    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-background">
            <div className="max-w-2xl w-full text-center">
                <div className="mb-8">
                    <Text as="h1" size="6xl" weight="bold" className="text-primary">
                        404
                    </Text>
                    <div className="flex justify-center mt-4">
                        <Search className="h-24 w-24 text-muted-foreground opacity-50" />
                    </div>
                </div>

                <div className="mb-8">
                    <Text as="h2" size="3xl" weight="bold" className="text-foreground mb-4">
                        Page Not Found
                    </Text>
                    <Text size="lg" color="muted" className="max-w-md mx-auto">
                        Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
                    </Text>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Link href="/">
                        <Button size="lg" className="gap-2 min-w-[160px]">
                            <Home className="h-5 w-5" />
                            Go Home
                        </Button>
                    </Link>
                    <Button
                        variant="outline"
                        size="lg"
                        onClick={() => window.history.back()}
                        className="gap-2 min-w-[160px]"
                    >
                        <ArrowLeft className="h-5 w-5" />
                        Go Back
                    </Button>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-200/10">
                    <Text size="sm" color="muted" className="mb-4">
                        You might be looking for:
                    </Text>
                    <div className="flex flex-wrap gap-3 justify-center">
                        <Link href="/">
                            <Text size="sm" className="text-primary hover:underline">
                                Home
                            </Text>
                        </Link>
                        <span className="text-muted-foreground">•</span>
                        <Link href="/profile">
                            <Text size="sm" className="text-primary hover:underline">
                                Profile
                            </Text>
                        </Link>
                        <span className="text-muted-foreground">•</span>
                        <Link href="/profile/orders">
                            <Text size="sm" className="text-primary hover:underline">
                                Orders
                            </Text>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NotFound;