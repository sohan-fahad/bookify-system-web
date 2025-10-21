
import type { Metadata } from "next";
import GuestCheck from "@src/components/layouts/guest-check";

export const metadata: Metadata = {
    title: "Auth - Bookify",
    description: "Sign in to your account and start buying and selling books",
};

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <GuestCheck>
            {children}
        </GuestCheck>
    );
}
