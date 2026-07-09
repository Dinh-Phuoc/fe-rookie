import { ApiDetailResponse, ApiListResponse, Flashcard, Topic } from '@/types/flashcard';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000';

async function request<T>(path: string): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${path}`, {
        next: {
            revalidate: 3600,
        },
    });

    if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
    }

    return response.json() as Promise<T>;
}

export async function getTopics() {
    return request<ApiListResponse<Topic>>('/topics');
}

export async function getFlashcards(topicSlug?: string) {
    const query = topicSlug ? `?topicSlug=${topicSlug}` : '';
    return request<ApiListResponse<Flashcard>>(`/flashcards${query}`);
}

export async function getFlashcardDetail(topicSlug: string, cardSlug: string) {
    return request<ApiDetailResponse<Flashcard>>(`/flashcards/${topicSlug}/${cardSlug}`);
}
