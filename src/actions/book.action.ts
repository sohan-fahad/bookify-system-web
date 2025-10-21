'use server';

import { BookEntity } from "@src/models/entities";

export async function getBooks(query: { page?: number; limit?: number }) {
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    try {
        const response = await fetch(
            `${apiUrl}/books?page=${query.page || 1}&limit=${query.limit || 10}`,
            {
                next: { revalidate: 60 },
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );

        if (!response.ok) {
            throw new Error('Failed to fetch books');
        }

        const data = await response.json();
        return data.data as BookEntity[];
    } catch (error) {
        console.error('Error fetching books:', error);
        return [];
    }
}