'use client';

import { Text } from '@src/components/ui';
import { Button } from '@src/components/ui';
import { Copy, Share2, Link2, Users, Award, Sparkles, Check } from 'lucide-react';
import { useState } from 'react';

const ReferralSection = () => {
    const [copied, setCopied] = useState(false);
    const referralCode = 'LIMA36r34';
    const baseUrl = 'https://bookstore.com';
    const referralUrl = `${baseUrl}/register?r=${referralCode}`;

    const referralStats = {
        totalReferrals: 12,
        successfulReferrals: 8,
        totalEarnings: 45.00
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(referralUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Join me on BookStore',
                    text: 'Check out this amazing book store!',
                    url: referralUrl,
                });
            } catch (err) {
                console.error('Error sharing: ', err);
            }
        }
    };

    return (
        <div className="bg-secondary border border-border rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-primary/10 rounded-lg">
                    <Link2 className="h-6 w-6 text-primary" />
                </div>
                <div>
                    <Text as="h3" size="xl" weight="bold" className="text-foreground">
                        Referral
                    </Text>
                    <Text size="sm" color="muted">
                        Invite & earn rewards
                    </Text>
                </div>
            </div>

            {/* Referral Code */}
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 mb-4">
                <div className="flex items-center justify-between mb-3">
                    <Text size="sm" weight="medium" color="muted">
                        Your Referral Code
                    </Text>
                    <div className="flex items-center gap-1 px-2 py-1 bg-success/10 rounded-full">
                        <Sparkles className="h-3 w-3 text-success" />
                        <Text size="xs" className="text-success">Active</Text>
                    </div>
                </div>
                <Text size="2xl" weight="bold" className="text-primary mb-3 font-mono">
                    {referralCode}
                </Text>
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleCopy}
                        className={`flex-1 ${copied ? 'bg-success/10 border-success text-success' : ''}`}
                    >
                        {copied ? (
                            <>
                                <Check className="h-4 w-4 mr-2" />
                                Copied!
                            </>
                        ) : (
                            <>
                                <Copy className="h-4 w-4 mr-2" />
                                Copy Link
                            </>
                        )}
                    </Button>
                    <Button
                        size="sm"
                        onClick={handleShare}
                        className="md:hidden bg-primary text-background hover:bg-primary/90"
                    >
                        <Share2 className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* Referral Stats */}
            <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-background rounded-lg border border-border">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                            <Users className="h-4 w-4 text-primary" />
                        </div>
                        <Text weight="medium" className="text-foreground">
                            Total Invites
                        </Text>
                    </div>
                    <Text size="xl" weight="bold" className="text-primary">
                        {referralStats.totalReferrals}
                    </Text>
                </div>

                <div className="flex items-center justify-between p-3 bg-background rounded-lg border border-border">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-success/10 rounded-lg">
                            <Award className="h-4 w-4 text-success" />
                        </div>
                        <Text weight="medium" className="text-foreground">
                            Successful
                        </Text>
                    </div>
                    <Text size="xl" weight="bold" className="text-success">
                        {referralStats.successfulReferrals}
                    </Text>
                </div>

                <div className="bg-gradient-to-br from-warning/20 to-warning/5 border border-warning/20 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                        <Text weight="medium" color="muted" className="mb-1">
                            Total Earned
                        </Text>
                        <Text size="2xl" weight="bold" className="text-warning">
                            ${referralStats.totalEarnings.toFixed(2)}
                        </Text>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReferralSection;