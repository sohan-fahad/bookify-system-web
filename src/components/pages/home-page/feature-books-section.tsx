'use client';

import { motion } from 'framer-motion';
import ProductCard from './product-card';
import { useBooks } from '@src/hooks/queries';
import { BookEntity } from '@src/models/entities';
import { Suspense, useState } from 'react';
import useAuthenticationStore from '@src/hooks/stores/useAuthenticationStore';
import { useRouter } from 'next/navigation';
import CheckoutModal from './checkout-modal';
import { Skeleton } from '@src/components/ui';

interface FeaturedBooksSectionProps {
    books: BookEntity[];
}

const FeaturedBooksSection = ({ books }: FeaturedBooksSectionProps) => {

    const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState<BookEntity | null>(null);

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
                    {books.length === 0 ? <BooksListSkeleton />
                        :
                        <Suspense fallback={<BooksListSkeleton />}>
                            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
                                {books?.map((book: BookEntity, index: number) => (
                                    <ProductCard
                                        key={book._id}
                                        book={book}
                                        index={index}
                                        onBuyNow={handleBuyNow}
                                    />
                                ))}
                            </div>
                        </Suspense>
                    }
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

const BooksListSkeleton = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
                <div key={index} className="bg-secondary rounded-lg overflow-hidden shadow-sm">
                    <Skeleton className="w-full h-64" />
                    <div className="p-4 space-y-3">
                        <Skeleton className="h-5 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                        <div className="flex items-center justify-between pt-2">
                            <Skeleton className="h-6 w-16" />
                            <Skeleton className="h-9 w-24 rounded-md" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default FeaturedBooksSection;