import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogFooter } from '@src/components/ui';
import { Button } from '@src/components/ui/button';
import { Text } from '@src/components/ui/text';
import { useAuthenticationStore } from '@src/hooks/stores';
import { BookEntity } from '@src/models/entities';
import { OrderService } from '@src/services/apis';
import Image from 'next/image';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

interface CheckoutModalProps {
    open: boolean;
    onClose: () => void;
    book: BookEntity;
    quantity?: number;
}

const CheckoutModal = ({ open, onClose, book, quantity = 1 }: CheckoutModalProps) => {
    const user = useAuthenticationStore(state => state.user);
    const [isLoading, setIsLoading] = useState(false);

    const handleConfirmCheckout = async () => {
        if (!user) return;

        setIsLoading(true);
        try {

            const response = await OrderService.createOrder([{ bookId: book._id, quantity }]);

            if (!response?.success) {
                toast.error(response?.message || 'Checkout failed');
                return;
            }

            onClose();
            toast.success('Book purchased successfully');

        } catch (error) {
            toast.error('Checkout failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} size="md" className="max-w-md">
            <DialogContent>
                <DialogTitle>
                    Confirm Your Purchase
                </DialogTitle>
                <DialogDescription>
                    Please review your order details before confirming
                </DialogDescription>

                <div className="space-y-4">
                    <div className="rounded-lg p-4 bg-secondary">
                        <Text as="h3" weight="semibold" size="base" className="mb-3">
                            Book Details
                        </Text>
                        <div className="flex gap-4">
                            {book?.imageLink && (
                                <Image
                                    src={book?.imageLink}
                                    alt={book?.title}
                                    width={80}
                                    height={80}
                                    className="w-20 h-20 object-contain rounded"
                                />
                            )}
                            <div className="flex-1 space-y-2">
                                <div className="flex items-center gap-2">
                                    <Text as="span" weight="medium" size="sm">
                                        Title:
                                    </Text>
                                    <Text as="p" size="sm" weight="semibold" color="primary">
                                        {book?.title}
                                    </Text>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Text as="span" weight="medium" size="sm">
                                        Author:
                                    </Text>
                                    <Text as="p" size="sm" weight="semibold" color="primary">
                                        {book?.author}
                                    </Text>
                                </div>
                                <div className="flex gap-4">
                                    <div className="flex items-center gap-2">
                                        <Text as="span" weight="medium" size="sm">
                                            Year:
                                        </Text>
                                        <Text as="p" size="sm" weight="semibold" color="primary">
                                            {book?.year}
                                        </Text>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Text as="span" weight="medium" size="sm">
                                            Pages:
                                        </Text>
                                        <Text as="p" size="sm" weight="semibold" color="primary">
                                            {book?.pages}
                                        </Text>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-lg p-4 bg-secondary">
                        <Text as="h3" weight="semibold" size="base" className="mb-3">
                            Order Summary
                        </Text>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <Text as="span" size="sm" weight="medium">
                                    Quantity:
                                </Text>
                                <Text as="span" weight="semibold" size="sm" color="primary">
                                    x{quantity}
                                </Text>
                            </div>
                            <div className="flex justify-between">
                                <Text as="span" size="sm" weight="medium">
                                    Price per item:
                                </Text>
                                <Text as="span" weight="semibold" size="sm" color="primary">
                                    ${(book?.price || 0).toFixed(2)}
                                </Text>
                            </div>
                            <div className="border-t pt-2 mt-2 flex justify-between">
                                <Text as="span" weight="semibold" size="sm">
                                    Total:
                                </Text>
                                <Text as="span" weight="bold" size="lg" color="primary">
                                    ${(book?.price || 0 * quantity).toFixed(2)}
                                </Text>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-lg p-4 bg-secondary">
                        <Text as="h3" weight="semibold" size="base" className="mb-3">
                            Customer Information
                        </Text>
                        <div className="space-y-2">
                            <div>
                                <Text as="span" weight="medium" size="sm">
                                    Name:
                                </Text>
                                <Text as="p" size="sm" color="primary">
                                    {user?.name}
                                </Text>
                            </div>
                            <div>
                                <Text as="span" weight="medium" size="sm">
                                    Email:
                                </Text>
                                <Text as="p" size="sm" color="primary">
                                    {user?.email}
                                </Text>
                            </div>
                        </div>
                    </div>
                </div>

                <DialogFooter>
                    <div className="flex justify-between gap-4 w-full">
                        <Button
                            variant="outline"
                            onClick={onClose}
                            disabled={isLoading}
                            className="w-1/2"
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="default"
                            onClick={handleConfirmCheckout}
                            disabled={isLoading}
                            className="w-1/2"
                        >
                            {isLoading ? 'Processing...' : 'Confirm Purchase'}
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default CheckoutModal;