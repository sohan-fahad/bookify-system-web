export type OrderEntity = {
    _id: string;
    customerId: string;
    totalAmount: number;
    totalCreditsEarned: number;
    isFirstPurchase: boolean;
    items: OrderItemEntity[];
    createdAt: Date;
    updatedAt: Date;
};

export type OrderItemEntity = {
    _id: string;
    bookId: string;
    quantity: number;
    price: number;
};