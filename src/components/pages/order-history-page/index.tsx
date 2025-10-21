'use client';

import { useState } from 'react';
import { Skeleton, Text, Button } from '@src/components/ui';
import { useMyOrders } from '@src/hooks/queries';
import { OrderEntity } from '@src/models/entities';
import { cn } from '@src/utils/cn.utils';
import { ShoppingCart, Package, ChevronLeft, ChevronRight, Calendar, DollarSign } from 'lucide-react';

const OrderHistoryPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 10;

    const { data: orders, isLoading } = useMyOrders({ page: currentPage, limit });

    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const handlePreviousPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    };

    const handleNextPage = () => {
        if (orders && orders.length === limit) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    if (isLoading) {
        return <OrderHistorySkeleton />;
    }

    return (
        <div className="bg-secondary rounded-lg p-4 lg:p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                        <ShoppingCart className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                        <Text as="h3" size="xl" weight="bold" className="text-foreground">
                            Order History
                        </Text>
                        <Text size="sm" color="muted">
                            View all your past orders
                        </Text>
                    </div>
                </div>
            </div>

            {orders && orders.length > 0 ? (
                <div className="space-y-0">
                    {orders.map((order: OrderEntity) => (
                        <div
                            key={order._id}
                            className="flex items-center gap-4 py-4 first:pt-0 border-b border-gray-200/10 last:border-b-0"
                        >
                            <div className="flex-shrink-0">
                                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary border border-primary/20 flex items-center justify-center">
                                    <Package className="h-6 w-6 text-primary" />
                                </div>
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-3">
                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <Text weight="semibold" className="text-foreground">
                                                Order #{order._id.slice(-8).toUpperCase()}
                                            </Text>
                                            {order.isFirstPurchase && (
                                                <span className="px-2 py-0.5 bg-primary/20 text-primary rounded-full">
                                                    <Text size="xs" weight="medium" className="text-primary">
                                                        First Order
                                                    </Text>
                                                </span>
                                            )}
                                        </div>

                                        <div className="flex items-center gap-4 mt-1 flex-wrap">
                                            <div className="flex items-center gap-1.5 text-muted-foreground">
                                                <Calendar className="h-3.5 w-3.5" />
                                                <Text size="sm" color="muted">
                                                    {formatDate(order.createdAt)}
                                                </Text>
                                            </div>
                                            <div className="flex items-center gap-1.5 text-muted-foreground">
                                                <Package className="h-3.5 w-3.5" />
                                                <Text size="sm" color="muted">
                                                    {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                                                </Text>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-end gap-1 flex-shrink-0">
                                        <div className="flex items-center gap-1">
                                            <Text weight="bold" size="lg" className="text-foreground">
                                                ${order.totalAmount.toFixed(2)}
                                            </Text>
                                        </div>
                                        {order.totalCreditsEarned > 0 && (
                                            <div className={cn(
                                                "flex items-center gap-1 px-2 py-1 rounded-full bg-green-500/10"
                                            )}>
                                                <Text size="xs" weight="medium" className="text-success">
                                                    +{order.totalCreditsEarned} credits
                                                </Text>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center flex flex-col items-center justify-center py-12">
                    <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <Text size="lg" weight="semibold" className="text-foreground mb-2">
                        No orders yet
                    </Text>
                    <Text size="sm" color="muted">
                        Your order history will appear here
                    </Text>
                </div>
            )}

            {orders && orders.length > 0 && (
                <div className="flex items-center justify-between pt-6 mt-6 border-t border-gray-200/10">
                    <Text size="sm" color="muted">
                        Page {currentPage}
                    </Text>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handlePreviousPage}
                            disabled={currentPage === 1}
                            className="gap-1"
                        >
                            <ChevronLeft className="h-4 w-4" />
                            Previous
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleNextPage}
                            disabled={!orders || orders.length < limit}
                            className="gap-1"
                        >
                            Next
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

const OrderHistorySkeleton = () => {
    return (
        <div className="bg-secondary rounded-lg p-4 lg:p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                        <Skeleton variant="circular" className="h-5 w-5" />
                    </div>
                    <div>
                        <Skeleton className="h-6 w-32 mb-2" />
                        <Skeleton className="h-4 w-48" />
                    </div>
                </div>
            </div>

            <div className="space-y-0">
                {[1, 2, 3, 4, 5].map((index) => (
                    <div
                        key={index}
                        className={cn(
                            "flex items-center gap-4 py-4",
                            index === 1 && "pt-0",
                            index < 5 && "border-b border-gray-200/10"
                        )}
                    >
                        <div className="flex-shrink-0">
                            <Skeleton variant="circular" className="w-12 h-12" />
                        </div>

                        <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-3">
                                <div className="min-w-0 flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Skeleton className="h-4 w-32" />
                                        <Skeleton className="h-5 w-20 rounded-full" />
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <Skeleton className="h-3 w-24" />
                                        <Skeleton className="h-3 w-16" />
                                    </div>
                                </div>

                                <div className="flex flex-col items-end gap-2">
                                    <Skeleton className="h-6 w-20" />
                                    <Skeleton className="h-5 w-24 rounded-full" />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex items-center justify-between pt-6 mt-6 border-t border-gray-200/10">
                <Skeleton className="h-4 w-16" />
                <div className="flex items-center gap-2">
                    <Skeleton className="h-8 w-24" />
                    <Skeleton className="h-8 w-20" />
                </div>
            </div>
        </div>
    );
};

export default OrderHistoryPage;