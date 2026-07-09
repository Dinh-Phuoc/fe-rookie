'use client';

import Link from 'next/link';
import { useTopics } from '@/lib/queries';
import { Skeleton } from '@/components/ui/skeleton';

export function TopicsHeader() {
  const { data: topics, isLoading } = useTopics();
  const topicCount = topics?.data.items.length ?? 0;

  return (
    <div className='mx-auto max-w-6xl px-4 py-8 sm:px-6'>
      <div className='mb-4 flex items-center gap-2 text-sm text-slate-500'>
        <Link href='/' className='hover:text-blue-600'>Trang chủ</Link>
        <span>/</span>
        <span className='text-slate-900'>Chủ đề</span>
      </div>
      <h1 className='text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl'>
        Tất cả chủ đề
      </h1>
      <p className='mt-2 text-sm text-slate-600'>
        {isLoading ? (
          <Skeleton className='h-5 w-48' />
        ) : (
          <>
            {topicCount} chủ đề phỏng vấn Fullstack – chọn một chủ đề để bắt đầu học.
          </>
        )}
      </p>
    </div>
  );
}
