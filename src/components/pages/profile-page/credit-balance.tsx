'use client';

import { Text } from '@src/components/ui';
import { Button } from '@src/components/ui';
import { Wallet, Plus, ArrowUpRight, ArrowDownRight, TrendingUp } from 'lucide-react';

const CreditBalance = () => {
    const balance = 125.50;
    const transactions = [
        { type: 'Earned', amount: 25.00, description: 'Referral Bonus', date: 'Today' },
        { type: 'Spent', amount: -12.99, description: 'Book Purchase', date: 'Yesterday' },
        { type: 'Earned', amount: 15.00, description: 'Review Bonus', date: '2 days ago' }
    ];

    return (
        <div className="bg-secondary border border-border rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                        <Wallet className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <Text as="h3" size="xl" weight="bold" className="text-foreground">
                            Wallet
                        </Text>
                        <Text size="sm" color="muted">
                            Available balance
                        </Text>
                    </div>
                </div>
            </div>

            <div className="bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 rounded-xl p-5 mb-6">
                <div className="flex items-center justify-between">
                    <div>
                        <Text size="sm" color="muted" className="mb-1">
                            Total Credits
                        </Text>
                        <div className="flex items-baseline gap-2">
                            <Text size="3xl" weight="bold" className="text-primary">
                                ${balance.toFixed(2)}
                            </Text>
                            <div className="flex items-center gap-1 px-2 py-0.5 bg-success/10 rounded-full">
                                <TrendingUp className="h-3 w-3 text-success" />
                                <Text size="xs" className="text-success">+15%</Text>
                            </div>
                        </div>
                    </div>
                    <Button size="sm" className="bg-primary text-background hover:bg-primary/90 group">
                        <Plus className="h-4 w-4 mr-2 group-hover:rotate-90 transition-transform" />
                        Add
                    </Button>
                </div>
            </div>

            <div>
                <Text weight="semibold" className="text-foreground mb-3">
                    Recent Activity
                </Text>
                <div className="space-y-2">
                    {transactions.map((transaction, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between p-3 bg-background rounded-lg border border-border hover:border-primary/30 transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-lg ${transaction.type === 'Earned'
                                        ? 'bg-success/10'
                                        : 'bg-destructive/10'
                                    }`}>
                                    {transaction.type === 'Earned' ? (
                                        <ArrowDownRight className="h-4 w-4 text-success rotate-180" />
                                    ) : (
                                        <ArrowUpRight className="h-4 w-4 text-destructive" />
                                    )}
                                </div>
                                <div>
                                    <Text weight="medium" className="text-foreground">
                                        {transaction.description}
                                    </Text>
                                    <Text size="xs" color="muted">
                                        {transaction.date}
                                    </Text>
                                </div>
                            </div>
                            <Text
                                weight="bold"
                                className={transaction.type === 'Earned' ? 'text-success' : 'text-destructive'}
                            >
                                {transaction.type === 'Earned' ? '+' : ''}{Math.abs(transaction.amount)}
                            </Text>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CreditBalance;