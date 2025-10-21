'use client';

import { Skeleton, Text } from '@src/components/ui';
import { Button } from '@src/components/ui';
import { ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import { BookEntity } from '@src/models/entities';

interface ProductCardProps {
    book: BookEntity;
    index: number;
    onBuyNow: (book: BookEntity) => void;
}

const ProductCard = ({ book, index, onBuyNow }: ProductCardProps) => {

    const handleBuyNow = () => {
        onBuyNow(book);
    };

    return (
        <div key={index} className="group bg-secondary rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-500 ease-out cursor-pointer">
            <div className="w-full rounded-xl">
                <div className="w-full h-52 relative overflow-hidden">
                    <Image
                        src={book.imageLink}
                        alt={book.title}
                        width={200}
                        height={200}
                        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />

                    <div className='absolute bottom-0 left-0 right-0 px-4 pb-4 opacity-0 translate-y-full group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out bg-gradient-to-t from-black/60 via-black/40 to-transparent'>
                        <Button className='w-full bg-primary hover:bg-primary/90 transition-colors duration-300' onClick={handleBuyNow}>
                            <ShoppingCart className='w-4 h-4 mr-2' />
                            Buy Now
                        </Button>
                    </div>
                </div>

                <div className="content-wrapper px-4 py-3">
                    <Text as="p" size="sm" weight="semibold" className="mb-1 line-clamp-2 text-foreground">{book.title}</Text>
                    <Text as="p" size="xs" color="muted" className="mb-1 line-clamp-2">
                        by <span className="text-primary">{book.author} ({book.year})</span>
                    </Text>
                    <Text as="p" size="xs" color="muted" className="mb-1 line-clamp-2">
                        in <span className="text-primary">{book.language}</span>
                    </Text>
                    <Text as="p" size="sm" color="muted" weight="semibold" className="line-clamp-2">
                        ${book.price}
                    </Text>
                </div>
            </div>
        </div>
    );
};


const ProductCardSkeleton = () => {
    return (
        <div className="group bg-secondary rounded-xl shadow-lg overflow-hidden cursor-pointer">
            <div className="w-full rounded-xl">
                <div className="w-full h-52 relative overflow-hidden">
                    <Skeleton className="w-full h-full" />
                </div>

                <div className="content-wrapper px-4 py-3 space-y-2">
                    <Skeleton className="h-4 w-3/4" />

                    <Skeleton className="h-3 w-1/2" />

                    <Skeleton className="h-3 w-1/3" />

                    <Skeleton className="h-4 w-1/4" />
                </div>
            </div>
        </div>
    );
};


export default ProductCard;