'use client';

import { Text } from '@src/components/ui';
import { motion } from 'framer-motion';

const CategoriesSection = () => {
    const categories = [
        'Fiction', 'Non-Fiction', 'Mystery', 'Romance', 'Sci-Fi', 'Biography', 'History', 'Self-Help'
    ];

    return (
        <motion.section
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="py-16 bg-secondary"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <Text as="h2" size="4xl" weight="bold" className="mb-4 text-foreground">
                        Browse by Category
                    </Text>
                    <Text size="lg" className="text-muted-foreground">
                        Find books that match your interests
                    </Text>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
                    {categories.map((category, index) => (
                        <motion.div
                            key={category}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                            className="bg-muted/10 hover:bg-primary/10 border border-border hover:border-primary rounded-lg p-4 text-center cursor-pointer transition-all duration-200"
                        >
                            <Text weight="medium" className="text-foreground hover:text-primary transition-colors">
                                {category}
                            </Text>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.section>
    );
};

export default CategoriesSection;