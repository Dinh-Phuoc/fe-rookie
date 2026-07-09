'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Flashcard } from '@/types/flashcard';

type FlashcardCardProps = {
  card: Flashcard;
};

const DIFFICULTY_CONFIG = {
  basic: { label: 'Cơ bản', color: 'bg-green-100 text-green-700 border-green-200' },
  intermediate: { label: 'Trung bình', color: 'bg-amber-100 text-amber-700 border-amber-200' },
  advanced: { label: 'Nâng cao', color: 'bg-red-100 text-red-700 border-red-200' },
};

export function FlashcardCard({ card }: FlashcardCardProps) {
  const [showAnswer, setShowAnswer] = useState(false);
  const difficulty = DIFFICULTY_CONFIG[card.difficulty as keyof typeof DIFFICULTY_CONFIG];

  return (
    <Card className='min-h-[360px] sm:min-h-[320px]'>
      <CardHeader className='flex flex-row items-start justify-between gap-4 p-3 sm:p-4'>
        <div className='flex flex-wrap items-center gap-1.5 sm:gap-2'>
          <Badge variant='outline' className={cn('text-xs', difficulty?.color)}>
            <span
              className={cn(
                'mr-1 inline-block h-1.5 w-1.5 rounded-full',
                card.difficulty === 'basic'
                  ? 'bg-green-500'
                  : card.difficulty === 'intermediate'
                    ? 'bg-amber-500'
                    : 'bg-red-500'
              )}
            />
            {difficulty?.label ?? card.difficulty}
          </Badge>
          <Badge variant='outline' className='text-xs'>
            {card.topicSlug}
          </Badge>
        </div>
        <div className='flex flex-wrap gap-1'>
          {card.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant='secondary' className='text-[10px]'>
              {tag}
            </Badge>
          ))}
        </div>
      </CardHeader>

      <CardContent className='space-y-4 p-3 sm:p-4'>
        <h2 className='text-base font-bold leading-relaxed text-slate-900 sm:text-lg'>
          {card.question}
        </h2>

        {showAnswer && (
          <>
            <div className='h-1 w-10 rounded-full bg-gradient-to-r from-blue-500 to-violet-500' />

            <p className='text-sm leading-relaxed text-slate-700'>{card.answer}</p>

            {card.codeExamples.length > 0 && (
              <div className='space-y-3'>
                <h3 className='text-xs font-bold uppercase tracking-wider text-slate-400'>
                  Ví dụ code
                </h3>
                {card.codeExamples.map((ex, i) => (
                  <div key={i}>
                    {ex.title && (
                      <p className='mb-1 text-xs font-medium text-slate-500'>{ex.title}</p>
                    )}
                    <pre className='overflow-x-auto overflow-wrap-break-word rounded-lg bg-slate-900 p-3 text-xs leading-relaxed text-slate-200 break-words'>
                      <code className='whitespace-pre-wrap'>{ex.code}</code>
                    </pre>
                  </div>
                ))}
              </div>
            )}

            {card.painPoints.length > 0 && (
              <div className='space-y-2'>
                <h3 className='text-xs font-bold uppercase tracking-wider text-amber-600'>
                  ⚡ Nổi đau thường gặp
                </h3>
                {card.painPoints.map((pp, i) => (
                  <div
                    key={i}
                    className='rounded-lg border border-amber-200 bg-gradient-to-br from-amber-50 to-yellow-50 p-3'
                  >
                    <p className='mb-1 text-sm font-semibold text-amber-800'>{pp.title}</p>
                    <p className='text-xs leading-relaxed text-amber-700'>{pp.description}</p>
                    {pp.consequence && (
                      <p className='mt-2 border-l-2 border-amber-400 bg-amber-100/50 px-2 py-1 text-xs italic text-amber-700'>
                        Hậu quả: {pp.consequence}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </CardContent>

      <div className='border-t'>
        <button
          onClick={() => setShowAnswer((v) => !v)}
          className='flex w-full items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-blue-600 transition-colors hover:bg-slate-50'
        >
          {showAnswer ? (
            <>
              <span>▲</span> Ẩn đáp án
            </>
          ) : (
            <>
              <span>▼</span> Xem đáp án
            </>
          )}
        </button>
      </div>
    </Card>
  );
}
