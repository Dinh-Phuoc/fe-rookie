import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FlashcardDetailContent } from '@/components/flashcard-detail-content';
import { getFlashcardDetail } from '@/lib/api';
import type { Metadata } from 'next';

type FlashcardDetailPageProps = {
  params: Promise<{ topicSlug: string; cardSlug: string }>;
};

export async function generateMetadata({ params }: FlashcardDetailPageProps): Promise<Metadata> {
  const { topicSlug, cardSlug } = await params;

  try {
    const card = await getFlashcardDetail(topicSlug, cardSlug);
    return {
      title: card.data.question,
      description: card.data.answer.slice(0, 160),
      openGraph: {
        title: card.data.question,
        description: card.data.answer.slice(0, 160),
        type: 'article',
      },
    };
  } catch {
    return {
      title: 'Không tìm thấy flashcard',
    };
  }
}

export default async function FlashcardDetailPage({ params }: FlashcardDetailPageProps) {
  const { topicSlug, cardSlug } = await params;

  // Validate card exists for 404
  let cardExists = false;
  try {
    await getFlashcardDetail(topicSlug, cardSlug);
    cardExists = true;
  } catch {
    cardExists = false;
  }

  if (!cardExists) {
    notFound();
  }

  return (
    <main className='min-h-screen bg-slate-50'>
      {/* Header */}
      <div className='border-b bg-white'>
        <div className='mx-auto max-w-4xl px-4 py-5 sm:px-6'>
          <div className='flex flex-wrap items-center gap-2 text-sm text-slate-500'>
            <Link href='/' className='hover:text-blue-600'>Trang chủ</Link>
            <span>/</span>
            <Link href={`/topics/${topicSlug}`} className='hover:text-blue-600'>
              {topicSlug}
            </Link>
            <span>/</span>
            <span className='text-slate-900'>{cardSlug}</span>
          </div>
        </div>
      </div>

      {/* Content - Client component with TanStack Query */}
      <FlashcardDetailContent topicSlug={topicSlug} cardSlug={cardSlug} />
    </main>
  );
}
