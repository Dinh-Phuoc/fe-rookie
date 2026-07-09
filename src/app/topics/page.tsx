import { TopicsGrid } from '@/components/topics-grid';
import { TopicsHeader } from '@/components/topics-header';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Chủ đề học tập',
  description: 'Danh sách chủ đề phỏng vấn Fullstack: JavaScript, TypeScript, NestJS, MongoDB, Next.js, DevOps, AI.',
};

export default function TopicsPage() {
  return (
    <main className='min-h-screen bg-slate-50'>
      {/* Header */}
      <div className='border-b bg-white'>
        <TopicsHeader />
      </div>

      {/* Content */}
      <div className='mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12'>
        <TopicsGrid />
      </div>
    </main>
  );
}
