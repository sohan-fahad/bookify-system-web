'use client';

import { Text } from '@src/components/ui';
import { Button } from '@src/components/ui';
import { ChevronRight, CheckCircle2, Clock, XCircle, User as UserIcon, Mail, Link2 } from 'lucide-react';

type ReferralStatus = "Converted" | "Pending" | "Rejected";

interface ReferralItem {
    id: string;
    name: string;
    email: string;
    date: string;
    status: ReferralStatus;
    earning?: number;
}

const RecentReferral = () => {
    const referrals: ReferralItem[] = [
        { id: 'RF-1001', name: 'Ava Johnson', email: 'ava.j@example.com', date: 'Mar 12, 2025', status: 'Converted', earning: 5 },
        { id: 'RF-1002', name: 'Noah Smith', email: 'noah.s@example.com', date: 'Mar 10, 2025', status: 'Pending' },
        { id: 'RF-1003', name: 'Mia Brown', email: 'mia.b@example.com', date: 'Mar 08, 2025', status: 'Rejected' },
        { id: 'RF-1004', name: 'Liam Davis', email: 'liam.d@example.com', date: 'Mar 02, 2025', status: 'Converted', earning: 5 },
        { id: 'RF-1005', name: 'Emma Wilson', email: 'emma.w@example.com', date: 'Mar 01, 2025', status: 'Pending' },
    ];

    const statusConfig: Record<ReferralStatus, { color: string; bg: string; icon: any; badgeText: string }> = {
        Converted: {
            color: 'text-success',
            bg: 'bg-success/10',
            icon: CheckCircle2,
            badgeText: 'Converted',
        },
        Pending: {
            color: 'text-warning',
            bg: 'bg-warning/10',
            icon: Clock,
            badgeText: 'Pending',
        },
        Rejected: {
            color: 'text-destructive',
            bg: 'bg-destructive/10',
            icon: XCircle,
            badgeText: 'Rejected',
        },
    };

    const getInitials = (name: string) => {
        const parts = name.trim().split(' ');
        if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
        return (parts[0][0] + parts[1][0]).toUpperCase();
    };

    return (
        <div className="bg-secondary rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                        <Link2 className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                        <Text as="h3" size="xl" weight="bold" className="text-foreground">Recent Referrals</Text>
                        <Text size="sm" color="muted">Latest people who joined via your link</Text>
                    </div>
                </div>
                <Button variant="ghost" size="sm" className="group">
                    View All
                    <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Button>
            </div>

            <div className="">
                {referrals.map((item) => {
                    const cfg = statusConfig[item.status];
                    const StatusIcon = cfg.icon;

                    return (
                        <div
                            key={item.id}
                            className="flex items-center gap-4 py-4 first:pt-0 last:pb-0 border-b border-gray-200/10 last:border-b-0"
                        >
                            <div className="flex-shrink-0">
                                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary border border-primary/20 flex items-center justify-center">
                                    <Text weight="bold" className="text-primary">
                                        {getInitials(item.name)}
                                    </Text>
                                </div>
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-3">
                                    <div className="min-w-0">
                                        <div className="flex items-center gap-2">
                                            <Text weight="semibold" className="text-foreground truncate">{item.name}</Text>
                                            <span className="text-muted-foreground">•</span>
                                            <Text size="xs" color="muted">{item.id}</Text>
                                        </div>
                                        <div className="flex items-center gap-2 mt-1 text-muted-foreground">
                                            <Mail className="h-3.5 w-3.5" />
                                            <Text size="sm" color="muted" className="truncate">{item.email}</Text>
                                        </div>
                                    </div>

                                    {/* Status + Earning */}
                                    <div className="flex items-center gap-3 flex-shrink-0">

                                        <div className={`flex items-center gap-1 ${cfg.bg} px-2 py-1 rounded-full`}>
                                            <StatusIcon className={`h-3.5 w-3.5 ${cfg.color}`} />
                                            <Text size="xs" className={cfg.color} weight="medium">
                                                {cfg.badgeText}
                                            </Text>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default RecentReferral;