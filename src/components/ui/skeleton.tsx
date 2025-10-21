'use client';

import { cn } from "@src/utils/cn.utils";

interface SkeletonProps {
    className?: string;
    variant?: 'default' | 'circular' | 'rectangular';
    animation?: 'pulse' | 'wave' | 'none';
}

const Skeleton = ({
    className,
    variant = 'default',
    animation = 'pulse'
}: SkeletonProps) => {
    const baseClasses = "bg-muted";

    const variantClasses = {
        default: "rounded",
        circular: "rounded-full",
        rectangular: "rounded-none"
    };

    const animationClasses = {
        pulse: "animate-pulse",
        wave: "animate-wave",
        none: ""
    };

    return (
        <div
            className={cn(
                baseClasses,
                variantClasses[variant],
                animationClasses[animation],
                className
            )}
        />
    );
};

export { Skeleton };