'use client';

import { useState } from 'react';
import { FlashcardSwiper } from '@/components/flashcard/flashcard-swiper';
import { useFlashcards } from '@/lib/queries';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';
import type { Flashcard } from '@/types/flashcard';

const DIFFICULTY_CONFIG = [
  { key: 'basic', label: 'Cơ bản', icon: '🌱' },
  { key: 'intermediate', label: 'Trung bình', icon: '🌿' },
  { key: 'advanced', label: 'Nâng cao', icon: '🌳' },
];

type TopicDetailContentProps = {
  slug: string;
};

export function TopicDetailContent({ slug }: TopicDetailContentProps) {
  const { data: flashcards, isLoading, error } = useFlashcards(slug);
  const [showTip, setShowTip] = useState(false);

  const groupedByDifficulty = DIFFICULTY_CONFIG.map((d) => ({
    ...d,
    cards: flashcards?.data.items.filter((c: Flashcard) => c.difficulty === d.key) ?? [],
  }));

  if (isLoading) {
    return (
      <div className='mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12'>
        <div className='space-y-4'>
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i}>
              <CardContent className='p-6'>
                <Skeleton className='mb-4 h-6 w-32' />
                <Skeleton className='h-64 w-full' />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error || !flashcards?.data.items.length) {
    return (
      <div className='mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12'>
        <div className='rounded-lg border bg-white p-12 text-center'>
          <h3 className='mb-2 text-lg font-semibold text-slate-900'>Chưa có câu hỏi nào</h3>
          <p className='text-sm text-slate-600'>Chủ đề này hiện chưa có flashcard. Quay lại sau nhé!</p>
        </div>
      </div>
    );
  }

  return (
    <div className='mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12'>
      {groupedByDifficulty.map(
        (group) =>
          group.cards.length > 0 && (
            <section key={group.key} className='mb-10'>
              <div className='mb-4 flex items-center gap-2 px-4 sm:px-0'>
                <h2 className='text-base font-semibold text-slate-900'>
                  {group.icon} {group.label}
                </h2>
                <span className='text-xs text-slate-500'>({group.cards.length} câu)</span>
              </div>
              <FlashcardSwiper cards={group.cards} />
            </section>
          )
      )}

      {/* Tip */}
      {!showTip ? (
        <button
          onClick={() => setShowTip(true)}
          className='mt-8 w-full rounded-lg border border-blue-200 bg-blue-50 p-4 text-left text-sm text-blue-900 transition-colors hover:bg-blue-100'
        >
          <strong>💡 Mẹo học:</strong> Nhấn vào đây để xem hướng dẫn sử dụng →
        </button>
      ) : (
        <div className='mt-8 rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-900'>
          <strong>💡 Mẹo:</strong> Vuốt trái/phải để xem câu hỏi tiếp theo. Nhấn{' '}
          <strong>Xem đáp án</strong> để hiện câu trả lời, code ví dụ và nổi đau
          thường gặp. Dùng bàn phím mũi tên ← → để navigate.
        </div>
      )}
    </div>
  );
}
