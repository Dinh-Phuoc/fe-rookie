import type { MetadataRoute } from 'next';
import { getFlashcards, getTopics } from '@/lib/api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://flashdev.local';

    const staticUrls: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${baseUrl}/topics`,
            changeFrequency: 'daily',
            priority: 0.9,
        },
    ];

    // Fetch dynamic content with error handling
    try {
        const [topics, flashcards] = await Promise.all([getTopics(), getFlashcards()]);

        const topicUrls: MetadataRoute.Sitemap = topics.data.items.map((topic) => ({
            url: `${baseUrl}/topics/${topic.slug}`,
            changeFrequency: 'weekly',
            priority: 0.8,
        }));

        const flashcardUrls: MetadataRoute.Sitemap = flashcards.data.items.map((card) => ({
            url: `${baseUrl}/flashcards/${card.topicSlug}/${card.slug}`,
            changeFrequency: 'weekly',
            priority: 0.7,
        }));

        return [...staticUrls, ...topicUrls, ...flashcardUrls];
    } catch {
        // Return static URLs if API is unavailable
        return staticUrls;
    }
}
