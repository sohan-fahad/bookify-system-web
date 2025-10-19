'use client';

import { Text } from '@src/components/ui';
import { TrendingUp, Clock, CheckCircle, ArrowUpRight } from 'lucide-react';

const MetricsCard = () => {
    const metrics = [
        {
            title: 'Total',
            value: '24',
            icon: TrendingUp,
            color: 'text-primary',
            bgColor: 'bg-primary/10',
            borderColor: 'border-primary/20'
        },
        {
            title: 'Pending',
            value: '3',
            icon: Clock,
            color: 'text-warning',
            bgColor: 'bg-yellow-500/10',
            borderColor: 'border-yellow-500/20'
        },
        {
            title: 'Completed',
            value: '21',
            icon: CheckCircle,
            color: 'text-success',
            bgColor: 'bg-green-500/10',
            borderColor: 'border-success/20'
        }
    ];

    return (
        <div className="bg-secondary rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <Text as="h3" size="xl" weight="bold" className="text-foreground">
                        Referral Overview
                    </Text>
                    <Text size="sm" color="muted" className="mt-1">
                        Track your referral statistics
                    </Text>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
                {metrics.map((metric, index) => (
                    <div
                        key={index}
                        className={`${metric.bgColor} rounded-xl p-4 transition-all duration-300 hover:scale-105 cursor-pointer group relative`}
                    >

                        <div className={`rounded-lg group-hover:scale-110 transition-transform absolute top-4 left-4 lg:block hidden`}>
                            <metric.icon className={`h-5 w-5 ${metric.color}`} />
                        </div>
                        <Text size="3xl" weight="bold" className={`${metric.color} mb-1 !text-center `}>
                            {metric.value}
                        </Text>
                        <Text size="sm" color="muted" weight="medium" className="!text-center">
                            {metric.title}
                        </Text>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MetricsCard;