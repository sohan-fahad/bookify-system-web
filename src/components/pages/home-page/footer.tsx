'use client';

import { Text } from '@src/components/ui';
import { BookOpen } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <div className="flex items-center space-x-2 mb-4">
                            <BookOpen className="h-6 w-6 text-blue-400" />
                            <Text size="lg" weight="bold">BookStore</Text>
                        </div>
                        <Text color="muted" className="mb-4">
                            Your one-stop destination for digital books. Discover, read, and enjoy thousands of titles.
                        </Text>
                    </div>

                    <div>
                        <Text size="lg" weight="semibold" className="mb-4">Quick Links</Text>
                        <div className="space-y-2">
                            <a href="#" className="block text-gray-400 hover:text-white transition-colors">About Us</a>
                            <a href="#" className="block text-gray-400 hover:text-white transition-colors">Contact</a>
                            <a href="#" className="block text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
                            <a href="#" className="block text-gray-400 hover:text-white transition-colors">Terms of Service</a>
                        </div>
                    </div>

                    <div>
                        <Text size="lg" weight="semibold" className="mb-4">Categories</Text>
                        <div className="space-y-2">
                            <a href="#" className="block text-gray-400 hover:text-white transition-colors">Fiction</a>
                            <a href="#" className="block text-gray-400 hover:text-white transition-colors">Non-Fiction</a>
                            <a href="#" className="block text-gray-400 hover:text-white transition-colors">Mystery</a>
                            <a href="#" className="block text-gray-400 hover:text-white transition-colors">Romance</a>
                        </div>
                    </div>

                    <div>
                        <Text size="lg" weight="semibold" className="mb-4">Connect</Text>
                        <div className="space-y-2">
                            <a href="#" className="block text-gray-400 hover:text-white transition-colors">Facebook</a>
                            <a href="#" className="block text-gray-400 hover:text-white transition-colors">Twitter</a>
                            <a href="#" className="block text-gray-400 hover:text-white transition-colors">Instagram</a>
                            <a href="#" className="block text-gray-400 hover:text-white transition-colors">LinkedIn</a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-8 pt-8 text-center">
                    <Text color="muted">
                        © 2024 BookStore. All rights reserved.
                    </Text>
                </div>
            </div>
        </footer>
    );
};

export default Footer;