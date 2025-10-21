'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import RouteChangeLoader from './route-change-loader';

interface RootLayoutProviderProps {
    children: React.ReactNode;
}

const queryClient = new QueryClient();


const RootLayoutProvider = ({ children }: RootLayoutProviderProps) => {
    return (
        <QueryClientProvider client={queryClient}>
            <RouteChangeLoader />
            {children}
        </QueryClientProvider>
    );
};

export default RootLayoutProvider;