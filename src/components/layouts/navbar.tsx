'use client';

import { Button } from '@src/components/ui';
import { useAuthenticationStore } from '@src/hooks/stores';
import { motion } from 'framer-motion';
import Logo from './logo';
import { User2 } from 'lucide-react';
import { useRouter } from 'next/navigation';


const Navbar = () => {
    const router = useRouter();
    const isLoggedIn = useAuthenticationStore((state) => state.isLoggedIn);
    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6 }}
            className="shadow-lg sticky top-0 z-50 border-b border-gray-600/20 bg-background"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Logo />

                    {isLoggedIn ? (
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon">
                                <User2 className="w-4 h-4" />
                            </Button>
                        </div>
                    ) : (
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button onClick={() => router.push('/auth')}>Sign In</Button>
                        </motion.div>
                    )}
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar;