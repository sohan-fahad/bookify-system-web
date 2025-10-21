'use client';

import { Text } from '@src/components/ui';
import { motion } from 'framer-motion';
import { User, History, Settings, LogOut } from 'lucide-react';
import Navbar from '@src/components/layouts/navbar';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthenticationStore } from '@src/hooks/stores';
import { toast } from 'react-toastify';
import AuthCheck from '@src/components/layouts/auth-check';

interface ProfileLayoutProps {
    children: React.ReactNode;
}

const ProfileLayout = ({ children }: ProfileLayoutProps) => {
    const pathname = usePathname();
    const router = useRouter();
    const sidebarItems = [
        {
            id: 'profile',
            label: 'Profile',
            icon: User,
            href: '/profile'
        },
        {
            id: 'orders',
            label: 'Order History',
            icon: History,
            href: '/profile/orders'
        }
    ];

    const logout = useAuthenticationStore((state) => state.logout);

    const handleLogout = () => {
        toast.success('Logged out successfully');
        logout();
        router.push('/');
    };

    return (
        <AuthCheck>
            <div className="min-h-screen bg-background">
                <Navbar />

                <div className="flex">
                    <motion.aside
                        initial={{ x: -300, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="fixed left-0 top-16 w-64 h-[calc(100vh-4rem)] bg-secondary z-40 overflow-y-auto hidden md:block"
                    >
                        <div className="p-6">
                            <Text as="h2" size="xl" weight="bold" className="mb-6 text-foreground">
                                Account
                            </Text>

                            <nav className="space-y-2">
                                {sidebarItems.map((item) => {
                                    const isActive = pathname === item.href;
                                    console.log(pathname, item.href, isActive);
                                    return (
                                        <Link
                                            href={item.href}
                                            key={item.id}
                                            className={`${isActive ? "bg-primary/80 text-white" : "text-foreground hover:bg-primary/10 hover:text-primary transition-all duration-200"} flex items-center space-x-3 px-4 py-2 rounded-lg`}
                                        >
                                            <item.icon className={`size-4 ${isActive ? "text-white" : "text-foreground"}`} />
                                            <Text size="sm" weight="semibold" className={`${isActive ? "text-white" : "text-foreground"}`}>{item.label}</Text>
                                        </Link>
                                    );
                                })}

                                <motion.button
                                    whileHover={{ x: 4 }}
                                    className="flex items-center space-x-3 px-4 py-3 rounded-lg text-foreground hover:bg-destructive/10 hover:text-destructive transition-all duration-200 w-full text-left cursor-pointer"
                                    onClick={handleLogout}
                                >
                                    <LogOut className="size-4" />
                                    <Text size="sm" weight="semibold">Logout</Text>
                                </motion.button>
                            </nav>
                        </div>
                    </motion.aside>

                    <motion.main
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="flex-1 ml-0 md:ml-64 p-4"
                    >
                        {children}
                    </motion.main>
                </div>
            </div>
        </AuthCheck>
    );
};

export default ProfileLayout;