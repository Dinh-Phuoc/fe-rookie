import Link from 'next/link';
import { notFound } from 'next/navigation';
import { TopicDetailContent } from '@/components/topic-detail-content';
import { getTopics } from '@/lib/api';
import type { Metadata } from 'next';

type TopicDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: TopicDetailPageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const topics = await getTopics();
    const topic = topics.data.items.find((t) => t.slug === slug);
    if (topic) {
      return {
        title: topic.title,
        description: topic.description,
      };
    }
  } catch {
    // Continue to notFound
  }

  return {
    title: 'Không tìm thấy chủ đề',
  };
}

export default async function TopicDetailPage({ params }: TopicDetailPageProps) {
  const { slug } = await params;
  let topic = null;

  try {
    const topics = await getTopics();
    topic = topics.data.items.find((t) => t.slug === slug);
  } catch {
    // Continue to notFound
  }

  if (!topic) {
    notFound();
  }

  return (
    <main className='min-h-screen bg-slate-50'>
      {/* Header */}
      <div className='border-b bg-white'>
        <div className='mx-auto max-w-6xl px-4 py-6 sm:px-6'>
          <div className='mb-3 flex flex-wrap items-center gap-2 text-sm text-slate-500'>
            <Link href='/' className='hover:text-blue-600'>Trang chủ</Link>
            <span>/</span>
            <Link href='/topics' className='hover:text-blue-600'>Chủ đề</Link>
            <span>/</span>
            <span className='text-slate-900'>{topic.title}</span>
          </div>
          <h1 className='text-xl font-bold tracking-tight text-slate-900 sm:text-2xl'>
            {topic.title}
          </h1>
          <p className='mt-1 text-sm text-slate-600'>{topic.description}</p>
        </div>
      </div>

      {/* Content - Client component with TanStack Query */}
      <TopicDetailContent slug={slug} />
    </main>
  );
}
