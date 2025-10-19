'use client';

import { Text } from '@src/components/ui';
import { Button } from '@src/components/ui';
import { useAuthenticationStore } from '@src/hooks/stores';
import { User, Mail, Check, Copy, Share2, Link2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useMe } from '@src/hooks/queries';

const ProfileInfo = () => {
    const { data: user } = useMe();
    const [copied, setCopied] = useState(false);
    const [referralUrl, setReferralUrl] = useState('');


    useEffect(() => {
        setReferralUrl(`${window.location.origin}/auth/register?r=${user?.referralCode}`);
    }, [user]);



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
        <div className="bg-secondary rounded-lg p-4 shadow-sm">
            <div className="flex items-start justify-between mb-6 mt-6">
                <div className="flex items-center gap-2 flex-col w-full justify-center">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary/20">
                        <User className="size-12 text-primary" />
                    </div>
                    <Text as="h3" size="xl" weight="bold" className="text-foreground">
                        {user?.name}
                    </Text>
                    <div className="bg-gradient-to-br from-primary/20 to-primary/5 rounded-full px-4 py-1">
                        <Text size="xs" weight="bold" color="primary">
                            Credit Balance: {user?.credits}
                        </Text>
                    </div>

                </div>
                {/* <Button variant="outline" size="sm" className="group">
                    <Edit2 className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform" />
                    Edit
                </Button> */}
            </div>

            <div className="space-y-4 mb-6 bg-primary/5 border border-primary/20 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Mail className="size-6 text-primary" />
                        <Text size="sm" weight="medium" color="muted">
                            {user?.email}
                        </Text>
                    </div>
                </div>
            </div>



            <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                    <Text size="base" weight="semibold" color="muted" className="flex items-center" >
                        <Link2 className="h-4 w-4 mr-2" />
                        Invite & earn rewards
                    </Text>

                </div>
                <Text size="xs" weight="bold" color="primary" className="font-mono">
                    {referralUrl}
                </Text>
                <div className="flex gap-2 mt-4">
                    <Button
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


        </div>
    );
};

export default ProfileInfo;