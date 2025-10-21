'use client';

import { Text } from '@src/components/ui';
import { motion } from 'framer-motion';
import { BookOpen, Users, Award } from 'lucide-react';

const HeroBanner = () => {
    const stats = [
        { icon: BookOpen, value: '50K+', label: 'Books Available' },
        { icon: Users, value: '100K+', label: 'Happy Readers' },
        { icon: Award, value: '4.9/5', label: 'Average Rating' }
    ];

    return (
        <motion.section
            className="relative sm:pt-20 py-12"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 sm:gap-12 gap-4 items-center">
                    <motion.div
                    >
                        <Text as="h1" weight="bold" className="mb-6 text-4xl sm:text-5xl lg:text-6xl text-foreground">
                            Discover Your Next
                            <span className="block text-primary">Favorite Book</span>
                        </Text>
                        <Text size="lg" className="mb-8 text-muted-foreground">
                            Explore our vast collection of e-books from classic literature to modern bestsellers.
                            Find your next great read today!
                        </Text>

                    </motion.div>

                    <motion.div
                        className="relative"
                    >
                        <div className="bg-secondary backdrop-blur-sm rounded-lg sm:p-8 p-4 border border-primary">
                            <div className="grid grid-cols-3 gap-4">
                                {stats.map((stat, index) => (
                                    <motion.div
                                        key={index}
                                        className="text-center flex flex-col items-center justify-center"
                                    >
                                        <stat.icon className="h-8 w-8 mx-auto mb-2 text-primary" />
                                        <Text weight="bold" align="center" className="text-xl sm:text-2xl text-foreground">{stat.value}</Text>
                                        <Text size="sm" className="text-white !text-center">{stat.label}</Text>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.section>
    );
};

export default HeroBanner;