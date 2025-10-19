'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Text } from '../ui/text';
import { Home, Link, Package } from 'lucide-react';
import { LogOut } from 'lucide-react';
import { usePathname } from 'next/navigation';

const ProfileAsideNav = () => {
    const pathname = usePathname();
    const sidebarItems = [
        {
            id: 'dashboard',
            label: 'Dashboard',
            icon: Home,
            href: '/profile'
        },
        {
            id: 'orders',
            label: 'Orders',
            icon: Package,
            href: '/profile/orders'
        },
    ];
    return (
        <motion.aside
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="fixed left-0 top-16 w-64 h-[calc(100vh-4rem)] bg-secondary z-40 overflow-y-auto"
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
                                className={`${isActive ? "bg-primary/80 text-white" : "text-foreground hover:bg-primary/10 hover:text-primary transition-all duration-200"} flex items-center space-x-3 px-4 py-3 rounded-lg`}
                            >
                                <item.icon className={`h-5 w-5 ${isActive ? "text-white" : "text-foreground"}`} />
                                <Text weight="medium" className={`${isActive ? "text-white" : "text-foreground"}`}>{item.label}</Text>
                            </Link>
                        );
                    })}

                    <motion.button
                        whileHover={{ x: 4 }}
                        className="flex items-center space-x-3 px-4 py-3 rounded-lg text-foreground hover:bg-destructive/10 hover:text-destructive transition-all duration-200 w-full text-left"
                    >
                        <LogOut className="h-5 w-5" />
                        <Text weight="medium">Logout</Text>
                    </motion.button>
                </nav>
            </div>
        </motion.aside>
    );
};

export default ProfileAsideNav;