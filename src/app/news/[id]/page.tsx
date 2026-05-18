import React from 'react';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { Calendar, User, MessageSquare, ArrowRight } from 'lucide-react';

async function getNewsData(id: string) {
  const news = await prisma.news.findUnique({
    where: { id },
  });
  return news;
}

async function getRelatedNews(category: string, currentId: string) {
  const news = await prisma.news.findMany({
    where: {
      category: category,
      id: {
        not: currentId,
      },
    },
    take: 3,
  });
  return news;
}

export default async function NewsDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const news = await getNewsData(id);

  if (!news) {
    notFound();
  }

  const relatedNews = await getRelatedNews(news.category, news.id);

  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <div className="pt-32 pb-24 px-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Link href="/news" className="inline-block bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-4">
            {news.category}
          </Link>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight mb-6">
            {news.title}
          </h1>
          <div className="flex justify-center items-center gap-6 text-sm text-slate-500 font-medium">
            <div className="flex items-center gap-2">
              <User size={14} />
              <span>Admin Sekolah</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={14} />
              <span>{news.createdAt.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
          </div>
        </div>

        {/* Cover Image */}
        <div className="relative aspect-video rounded-3xl overflow-hidden mb-12 shadow-xl shadow-slate-200">
          <Image 
            src={news.image || '/default-news.jpeg'} 
            alt={news.title} 
            fill 
            className="object-cover"
          />
        </div>

        {/* Article Content */}
        <article className="prose prose-lg max-w-none text-slate-700 leading-relaxed space-y-6">
          <p className="text-xl leading-relaxed first-letter:text-4xl first-letter:font-bold first-letter:mr-3 first-letter:float-left">
            {news.content.substring(0, news.content.indexOf('.') + 1)}
          </p>
          <p>
            {news.content.substring(news.content.indexOf('.') + 1)}
          </p>
        </article>

        <div className="border-t border-slate-100 my-16"></div>

        {/* Comments Section (Visual Mockup) */}
        <section>
          <h2 className="text-2xl font-black text-slate-800 mb-8 flex items-center gap-3">
            <MessageSquare size={24} className="text-blue-500" />
            Diskusi & Komentar
          </h2>
          <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100">
            <textarea 
              className="w-full p-4 bg-white rounded-lg border-2 border-slate-200 focus:border-blue-500 outline-none transition-colors"
              rows={4}
              placeholder="Tulis komentar Anda di sini..."
            ></textarea>
            <button className="mt-4 bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-600 transition-colors">
              Kirim Komentar
            </button>
          </div>
          <div className="space-y-8 mt-8">
            {/* Dummy Comment 1 */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-slate-200 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-slate-500">
                AS
              </div>
              <div>
                <p className="font-bold text-slate-800">Andi Setiawan</p>
                <p className="text-xs text-slate-400 mb-2">1 hari yang lalu</p>
                <p className="text-slate-600">Informasi yang sangat bermanfaat! Terima kasih atas pengumumannya.</p>
              </div>
            </div>
             {/* Dummy Comment 2 */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-slate-200 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-slate-500">
                CL
              </div>
              <div>
                <p className="font-bold text-slate-800">Citra Lestari</p>
                <p className="text-xs text-slate-400 mb-2">2 hari yang lalu</p>
                <p className="text-slate-600">Luar biasa prestasi tim robotika! Semoga bisa menjadi inspirasi bagi siswa lain untuk terus berinovasi. Maju terus SMK Bhairava!</p>
              </div>
            </div>
          </div>
        </section>

        <div className="border-t border-slate-100 my-16"></div>

        {/* Related News */}
        <section>
          <h2 className="text-2xl font-black text-slate-800 mb-8">
            Berita Terkait
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {relatedNews.map(related => (
              <Link href={`/news/${related.id}`} key={related.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden group transition-all hover:shadow-lg hover:-translate-y-1">
                <div className="relative aspect-video">
                  <Image 
                    src={related.image || '/default-news.jpeg'} 
                    alt={related.title} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5">
                  <span className="inline-block bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-3">
                    {related.category}
                  </span>
                  <h3 className="font-bold text-slate-800 leading-snug line-clamp-2">{related.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
