import React from 'react';
import { prisma } from '@/lib/prisma';
import { Bell, Calendar, ArrowRight } from 'lucide-react';
import Image from 'next/image'; // Assuming Image component will be used here
import Link from 'next/link';

export default async function PublicPengumumanPage() {
  const news = await prisma.news.findMany({
    orderBy: { createdAt: 'desc' },
    where: { isDraft: false }
  });

  return (
    <div className="min-h-screen bg-slate-50 py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-16">
           <Link href="/info" className="text-blue-600 font-black text-xs uppercase tracking-widest mb-4 inline-block hover:underline">← Kembali ke Menu Info</Link>
           <h1 className="text-5xl font-black text-slate-900 mb-4 tracking-tighter">Pengumuman Resmi</h1>
           <p className="text-slate-500 font-bold text-lg">Informasi terbaru dan berita resmi dari manajemen SMK Bhairava.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {news.length > 0 ? news.map((item, i) => (
            <div key={i} className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col">
               {item.image ? (
                 <div className="relative h-48 bg-slate-200">
                    <Image src={item.image} alt={item.title} fill className="object-cover" />
                    <div className="absolute top-6 left-6">
                       <span className="px-4 py-1.5 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">
                          {item.category}
                       </span>
                    </div>
                 </div>
               ) : (
                 <div className="h-48 bg-slate-200 flex items-center justify-center">
                    <Bell size={48} className="text-slate-400" />
                 </div>
               )}
               <div className="p-10 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 text-slate-400 text-xs font-black uppercase tracking-widest mb-4">
                     <Calendar size={14} className="text-blue-500" />
                     {new Date(item.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-4 leading-tight">{item.title}</h3>
                  <p className="text-slate-500 font-medium text-sm leading-relaxed mb-8 line-clamp-3">
                     {item.content}
                  </p>
                  <div className="mt-auto">
                     <Link href={`/news/${item.id}`} className="inline-flex items-center gap-2 text-sm font-black text-blue-600 group">
                        Baca Selengkapnya 
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                     </Link>
                  </div>
               </div>
            </div>
          )) : (
            <div className="col-span-2 bg-white p-20 rounded-[3rem] text-center border border-slate-100">
               <Bell className="mx-auto text-slate-200 mb-6" size={64} />
               <h3 className="text-xl font-black text-slate-400">Belum ada pengumuman saat ini.</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
