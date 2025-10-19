'use client';

import { Text } from '@src/components/ui';
import { motion } from 'framer-motion';
import ProductCard from './product-card';
import { useState } from 'react';

const FeaturedBooksSection = () => {
    const [favorites, setFavorites] = useState<Set<string>>(new Set());

    const toggleFavorite = (id: string) => {
        setFavorites(prev => {
            const newFavorites = new Set(prev);
            if (newFavorites.has(id)) {
                newFavorites.delete(id);
            } else {
                newFavorites.add(id);
            }
            return newFavorites;
        });
    };

    const featuredBooks = [
        {
            id: '1',
            title: 'The Great Gatsby',
            author: 'F. Scott Fitzgerald',
            price: 12.99,
            originalPrice: 19.99,
            rating: 4.8,
            reviews: 1247,
            image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop',
            category: 'Classic Literature'
        },
        {
            id: '2',
            title: 'To Kill a Mockingbird',
            author: 'Harper Lee',
            price: 14.99,
            originalPrice: 22.99,
            rating: 4.9,
            reviews: 2156,
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop',
            category: 'Fiction'
        },
        {
            id: '3',
            title: '1984',
            author: 'George Orwell',
            price: 11.99,
            originalPrice: 18.99,
            rating: 4.7,
            reviews: 1893,
            image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop',
            category: 'Dystopian Fiction'
        },
        {
            id: '4',
            title: 'Pride and Prejudice',
            author: 'Jane Austen',
            price: 13.99,
            originalPrice: 21.99,
            rating: 4.6,
            reviews: 1672,
            image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=400&fit=crop',
            category: 'Romance'
        },
        {
            id: '5',
            title: 'The Catcher in the Rye',
            author: 'J.D. Salinger',
            price: 15.99,
            originalPrice: 24.99,
            rating: 4.5,
            reviews: 1432,
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop',
            category: 'Coming-of-age'
        },
        {
            id: '6',
            title: 'The Hobbit',
            author: 'J.R.R. Tolkien',
            price: 16.99,
            originalPrice: 26.99,
            rating: 4.9,
            reviews: 3241,
            image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop',
            category: 'Fantasy'
        }
    ];

    return (
        <motion.section
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="py-12 sm:py-8"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
                    {featuredBooks.map((book, index) => (
                        <ProductCard
                            key={book.id}
                            book={book}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </motion.section>
    );
};

export default FeaturedBooksSection;