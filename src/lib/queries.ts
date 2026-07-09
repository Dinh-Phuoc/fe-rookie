import { useQuery } from '@tanstack/react-query';
import { ApiDetailResponse, ApiListResponse, Flashcard, Topic } from '@/types/flashcard';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000';

async function fetchApi<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`);
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }
  return response.json() as Promise<T>;
}

// Topic queries
export function useTopics() {
  return useQuery({
    queryKey: ['topics'],
    queryFn: () => fetchApi<ApiListResponse<Topic>>('/topics'),
  });
}

export function useTopic(slug: string) {
  return useQuery({
    queryKey: ['topics', slug],
    queryFn: () => fetchApi<ApiDetailResponse<Topic>>(`/topics/${slug}`),
    enabled: !!slug,
  });
}

// Flashcard queries
export function useFlashcards(topicSlug?: string) {
  return useQuery({
    queryKey: ['flashcards', { topicSlug }],
    queryFn: () => {
      const query = topicSlug ? `?topicSlug=${topicSlug}` : '';
      return fetchApi<ApiListResponse<Flashcard>>(`/flashcards${query}`);
    },
  });
}

export function useFlashcard(topicSlug: string, cardSlug: string) {
  return useQuery({
    queryKey: ['flashcards', topicSlug, cardSlug],
    queryFn: () =>
      fetchApi<ApiDetailResponse<Flashcard>>(`/flashcards/${topicSlug}/${cardSlug}`),
    enabled: !!topicSlug && !!cardSlug,
  });
}
