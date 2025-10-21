'use client';

import { Button, Text } from '@src/components/ui';
import { useAuthenticationStore } from '@src/hooks/stores';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './logo';
import { User2, LogOut, ShoppingBag, UserCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import SessionUtils from '@src/utils/session.utils';

const Navbar = () => {
    const router = useRouter();
    const isLoggedIn = useAuthenticationStore((state) => state.isLoggedIn);
    const user = useAuthenticationStore((state) => state.user);
    const { logout, setIsLoggedIn } = useAuthenticationStore();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        if (isDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isDropdownOpen]);

    const handleLogout = () => {
        logout();
        SessionUtils.removeToken();
        setIsLoggedIn(false);
        setIsDropdownOpen(false);
        router.push('/');
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const closeDropdown = () => {
        setIsDropdownOpen(false);
    };

    return (
        <nav className="shadow-lg sticky top-0 z-50 border-b border-gray-600/20 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Logo />

                    {isLoggedIn ? (
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={toggleDropdown}
                                className="border-primary p-2 border rounded-full cursor-pointer bg-primary/10 hover:bg-primary/20 transition-colors"
                            >
                                <User2 className="size-6 text-primary" />
                            </button>

                            <AnimatePresence>
                                {isDropdownOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute right-0 mt-2 w-64 bg-secondary rounded-lg shadow-xl border border-gray-200/10 overflow-hidden"
                                    >
                                        <div className="px-4 py-3 border-b border-gray-200/10 bg-primary/5">
                                            <Text weight="semibold" className="text-foreground truncate">
                                                {user?.name || 'User'}
                                            </Text>
                                            <Text size="sm" color="muted" className="truncate">
                                                {user?.email || ''}
                                            </Text>
                                        </div>

                                        <div className="py-2">
                                            <Link href="/profile" onClick={closeDropdown}>
                                                <div className="flex items-center gap-3 px-4 py-2.5 hover:bg-primary/10 transition-colors cursor-pointer">
                                                    <UserCircle className="h-5 w-5 text-primary" />
                                                    <Text size="sm" className="text-foreground">
                                                        Profile
                                                    </Text>
                                                </div>
                                            </Link>

                                            <Link href="/profile/orders" onClick={closeDropdown}>
                                                <div className="flex items-center gap-3 px-4 py-2.5 hover:bg-primary/10 transition-colors cursor-pointer">
                                                    <ShoppingBag className="h-5 w-5 text-primary" />
                                                    <Text size="sm" className="text-foreground">
                                                        Orders
                                                    </Text>
                                                </div>
                                            </Link>
                                        </div>

                                        <div className="border-t border-gray-200/10 p-2">
                                            <button
                                                onClick={handleLogout}
                                                className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-red-500/10 transition-colors cursor-pointer rounded-md"
                                            >
                                                <LogOut className="h-5 w-5 text-red-500" />
                                                <Text size="sm" weight="medium" className="text-red-500">
                                                    Logout
                                                </Text>
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
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