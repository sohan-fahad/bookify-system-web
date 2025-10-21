'use client';

import { motion } from 'framer-motion';
import ProductCard from './product-card';
import { useBooks } from '@src/hooks/queries';
import { BookEntity } from '@src/models/entities';
import { useState } from 'react';
import useAuthenticationStore from '@src/hooks/stores/useAuthenticationStore';
import { useRouter } from 'next/navigation';
import CheckoutModal from './checkout-modal';

const FeaturedBooksSection = () => {

    const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState<BookEntity | null>(null);

    const { data: books, isLoading } = useBooks();

    const router = useRouter();

    const isLoggedIn = useAuthenticationStore(state => state.isLoggedIn);

    const handleBuyNow = (book: BookEntity) => {
        if (!isLoggedIn) {
            router.push('/auth/login');
            return;
        }
        setSelectedBook(book);
        setIsCheckoutModalOpen(true);
    };


    return (
        <>
            <motion.section
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="py-0 sm:py-8"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
                        {books?.map((book: BookEntity, index: number) => (
                            <ProductCard
                                key={book._id}
                                book={book}
                                index={index}
                                isLoading={isLoading}
                                onBuyNow={handleBuyNow}
                            />
                        ))}
                    </div>
                </div>
            </motion.section>
            <CheckoutModal
                open={isCheckoutModalOpen}
                onClose={() => setIsCheckoutModalOpen(false)}
                book={selectedBook || (undefined as unknown as BookEntity)}
                quantity={1}
            />
        </>
    );
};

export default FeaturedBooksSection;