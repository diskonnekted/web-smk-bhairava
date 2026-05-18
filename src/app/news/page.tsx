import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { prisma } from '@/lib/prisma';
import { Calendar, User, ArrowRight, Newspaper } from 'lucide-react';

async function getNews() {
  return await prisma.news.findMany({
    orderBy: { createdAt: 'desc' }
  });
}

export default async function NewsPage() {
  const newsItems = await getNews();

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-blue-100 selection:text-blue-600">
      <Navbar />
      
      {/* Header */}
      <section className="pt-32 pb-16 px-6 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-black text-slate-900 mb-4">Berita & Kegiatan</h1>
          <p className="text-xl text-slate-500 max-w-2xl">
            Ikuti perkembangan terbaru, prestasi siswa, dan berbagai kegiatan seru di SMK BHAIRAVA.
          </p>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {newsItems.length === 0 ? (
            <div className="text-center py-32 bg-white rounded-[3rem] border border-slate-100 shadow-sm">
              <Newspaper size={64} className="mx-auto text-slate-200 mb-6" />
              <h2 className="text-2xl font-bold text-slate-400">Belum ada berita untuk saat ini.</h2>
              <p className="text-slate-400 mt-2">Silakan kembali lagi nanti untuk informasi terbaru.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {newsItems.map((news) => (
                <Link href={`/news/${news.id}`} key={news.id} className="block bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
                  <div className="aspect-[16/10] bg-slate-200 relative overflow-hidden">
                    {news.image ? (
                      <img src={news.image} alt={news.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400">
                        <Newspaper size={48} />
                      </div>
                    )}
                    <div className="absolute top-6 left-6">
                      <span className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg">
                        {news.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="flex items-center gap-4 text-slate-400 text-sm mb-4 font-medium">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={16} />
                        {new Date(news.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <User size={16} />
                        Admin
                      </div>
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {news.title}
                    </h2>
                    <p className="text-slate-500 mb-8 line-clamp-3 leading-relaxed">
                      {news.content}
                    </p>
                    <div className="flex items-center gap-2 font-bold text-blue-600 group-hover:gap-3 transition-all">
                      Baca Selengkapnya
                      <ArrowRight size={18} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter / CTA */}
      <section className="pb-24 px-6">
        <div className="max-w-7xl mx-auto bg-slate-900 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Jangan Lewatkan Update Terbaru</h2>
            <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto">
              Daftarkan email Anda untuk menerima informasi pendaftaran dan kegiatan sekolah langsung di kotak masuk Anda.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Email Anda" 
                className="flex-1 bg-white/10 border-transparent focus:bg-white/20 focus:ring-4 focus:ring-blue-500/20 rounded-2xl px-6 py-4 text-white outline-none transition-all"
              />
              <button className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all">
                Langganan
              </button>
            </div>
          </div>
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* Reuse Footer - for real app, extract to component */}
      <footer className="bg-slate-900 text-white py-20 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
          <div className="col-span-2">
            <h2 className="text-3xl font-black">SMK<span className="text-blue-400">BHAIRAVA</span></h2>
            <p className="text-slate-400 max-w-sm mb-8">
              Mencetak generasi unggul yang siap menghadapi tantangan era industri 4.0 dan ekonomi digital global.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-lg">Navigasi</h4>
            <ul className="space-y-4 text-slate-400">
              <li><a href="/" className="hover:text-white">Beranda</a></li>
              <li><a href="#" className="hover:text-white">Program Keahlian</a></li>
              <li><a href="/news" className="hover:text-white">Berita</a></li>
              <li><a href="#" className="hover:text-white">Kontak</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-lg">Hubungi Kami</h4>
            <p className="text-slate-400 leading-relaxed">
              Jl. Teknologi Masa Depan No. 404<br />
              Jakarta Selatan, Indonesia<br /><br />
              info@bhairava.sch.id
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
