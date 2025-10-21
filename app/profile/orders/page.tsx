import { Suspense } from 'react';
import OrderHistoryPage from '@src/components/pages/order-history-page';
import { LoadingSpinner } from '@src/components/ui';

export default function OrdersPage() {
    return (
        <Suspense fallback={<LoadingSpinner />}>
            <OrderHistoryPage />
        </Suspense>
    );
}