'use client';

import { Button } from '@src/components/ui';
import { useAuthenticationStore } from '@src/hooks/stores';
import { motion } from 'framer-motion';
import Logo from './logo';
import { User2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';


const Navbar = () => {
    const router = useRouter();
    const isLoggedIn = useAuthenticationStore((state) => state.isLoggedIn);
    return (
        <nav
            className="shadow-lg sticky top-0 z-50 border-b border-gray-600/20 bg-background"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Logo />

                    {isLoggedIn ? (
                        <div className="flex items-center gap-2">
                            <Link href="/profile">
                                <button className=" border-primary p-2 border rounded-full cursor-pointer bg-primary/10">
                                    <User2 className="size-6 text-primary" />
                                </button>
                            </Link>
                        </div>
                    ) : (
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button onClick={() => router.push('/auth')}>Sign In</Button>
                        </motion.div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;