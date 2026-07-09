'use client';

import { useFlashcard } from '@/lib/queries';
import { FlashcardCard } from '@/components/flashcard/flashcard-card';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';

type FlashcardDetailContentProps = {
  topicSlug: string;
  cardSlug: string;
};

export function FlashcardDetailContent({ topicSlug, cardSlug }: FlashcardDetailContentProps) {
  const { data: cardResponse, isLoading, error } = useFlashcard(topicSlug, cardSlug);

  if (isLoading) {
    return (
      <div className='mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12'>
        <Card className='min-h-[360px]'>
          <CardContent className='p-4'>
            <Skeleton className='mb-4 h-6 w-24' />
            <Skeleton className='mb-6 h-8 w-full' />
            <Skeleton className='h-32 w-full' />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error || !cardResponse?.data) {
    return (
      <div className='mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12'>
        <div className='rounded-lg border bg-white p-12 text-center'>
          <h3 className='mb-2 text-lg font-semibold text-slate-900'>Không tìm thấy flashcard</h3>
          <p className='text-sm text-slate-600'>Flashcard này có thể đã bị xóa hoặc không tồn tại.</p>
        </div>
      </div>
    );
  }

  return (
    <div className='mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12'>
      <FlashcardCard card={cardResponse.data} />
    </div>
  );
}
