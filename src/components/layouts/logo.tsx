import { Text } from '@src/components/ui';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const Logo = () => {
    return (
        <Link href="/">
            <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-2 cursor-pointer"
            >
                <BookOpen className="h-8 w-8 text-primary" />
                <Text as="h1" size="xl" weight="bold" color="primary">
                    Bookify
                </Text>
            </motion.div>
        </Link>

    );
};

export default Logo;