'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useTopics } from '@/lib/queries';
import Link from 'next/link';

const TOPIC_ICONS: Record<string, string> = {
  'javascript-typescript': '🔧',
  'nestjs': '🏗️',
  'mongodb': '🍃',
  'nextjs-react': '⚛️',
  'devops': '🚀',
  'ai-llm': '🤖',
};

function TopicsSkeleton() {
  return (
    <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i} className='h-full'>
          <CardContent className='p-5'>
            <Skeleton className='mb-3 h-8 w-8 rounded' />
            <Skeleton className='mb-2 h-5 w-3/4' />
            <Skeleton className='h-4 w-full' />
            <Skeleton className='mt-3 h-4 w-1/2' />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function TopicsGrid() {
  const { data, isLoading, error } = useTopics();

  if (isLoading) {
    return <TopicsSkeleton />;
  }

  if (error || !data?.data.items.length) {
    return (
      <div className='py-12 text-center text-slate-500'>
        Không có chủ đề nào được tìm thấy.
      </div>
    );
  }

  return (
    <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
      {data.data.items.map((topic) => (
        <Link key={topic._id} href={`/topics/${topic.slug}`} className='group'>
          <Card className='h-full transition-all hover:border-blue-500 hover:shadow-md'>
            <CardContent className='p-5'>
              <div className='mb-3 text-2xl'>{TOPIC_ICONS[topic.slug] ?? '📚'}</div>
              <h3 className='mb-2 font-semibold text-slate-900'>{topic.title}</h3>
              <p className='mb-3 text-sm text-slate-600 line-clamp-2'>{topic.description}</p>
              <span className='text-xs font-semibold text-blue-600'>Học ngay →</span>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
