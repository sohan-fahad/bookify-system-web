'use client';

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

const RouteChangeLoader = () => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        const timer = setTimeout(() => {
            setLoading(false);
        }, 300);

        return () => clearTimeout(timer);
    }, [pathname, searchParams]);

    if (!loading) return null;

    return (
        <>
            <div className="fixed top-0 left-0 right-0 z-[9999] h-1 bg-primary/20">
                <div className="h-full bg-primary animate-[loading_1s_ease-in-out_infinite]"
                    style={{ width: '50%' }} />
            </div>

        </>
    );
};

export default RouteChangeLoader;