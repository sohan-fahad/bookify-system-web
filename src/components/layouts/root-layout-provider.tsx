'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

interface RootLayoutProviderProps {
    children: React.ReactNode;
}

const queryClient = new QueryClient();


const RootLayoutProvider = ({ children }: RootLayoutProviderProps) => {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
};

export default RootLayoutProvider;