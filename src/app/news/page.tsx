import React from 'react';
import Navbar from '@/components/Navbar';
import PageHero from '@/components/PageHero';
import { prisma } from '@/lib/prisma';
import { Calendar, User, ArrowRight, Newspaper, ShieldCheck, Briefcase, Network } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

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
      
      <PageHero 
        title="Berita & <br />Kegiatan" 
        subtitle="Ikuti perkembangan terbaru, prestasi siswa, dan berbagai kegiatan seru di SMK BHAIRAVA." 
        bgImage="/ujian kompetensi.jpeg" 
        badge="Berita Sekolah" 
      />

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

      {/* Footer - Consistent Brand */}
      <footer className="bg-slate-900 text-white pt-32 pb-12 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-16 mb-24">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-4 mb-8">
              <Image src="/logo-smk-bhairava.png" alt="Logo" width={60} height={60} className="rounded-2xl brightness-110 shadow-2xl" />
              <h2 className="text-4xl font-black tracking-tighter">SMK<span className="text-blue-400 italic">BHAIRAVA</span></h2>
            </div>
            <p className="text-slate-400 text-lg leading-relaxed max-w-md mb-10">
              Transformasi pendidikan vokasi melalui teknologi cerdas dan kolaborasi industri global.
            </p>
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-blue-600 transition-all cursor-pointer"><ShieldCheck size={20} /></div>
              <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-blue-600 transition-all cursor-pointer"><Briefcase size={20} /></div>
              <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-blue-600 transition-all cursor-pointer"><Network size={20} /></div>
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <h4 className="font-black text-sm uppercase tracking-[0.2em] text-slate-500 mb-8">Portal</h4>
            <ul className="space-y-4 font-bold text-slate-400">
              <li><Link href="/admin" className="hover:text-white transition-colors">Portal Admin</Link></li>
              <li><Link href="/portal/guru" className="hover:text-white transition-colors">Portal Guru</Link></li>
              <li><Link href="/portal/wali" className="hover:text-white transition-colors">Portal Wali Siswa</Link></li>
              <li><Link href="/portal/siswa" className="hover:text-white transition-colors">Portal Siswa</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-black text-sm uppercase tracking-[0.2em] text-slate-500 mb-8">Resources</h4>
            <ul className="space-y-4 font-bold text-slate-400">
              <li className="hover:text-white cursor-pointer transition-colors">Digital Library</li>
              <li className="hover:text-white cursor-pointer transition-colors">LMS Login</li>
              <li className="hover:text-white cursor-pointer transition-colors">PKL Portal</li>
              <li className="hover:text-white cursor-pointer transition-colors">Career Hub</li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="font-black text-sm uppercase tracking-[0.2em] text-slate-500 mb-8">Visit Us</h4>
            <p className="text-slate-400 font-bold leading-relaxed mb-6">
              Jl. Teknologi Masa Depan No. 404<br />
              Jakarta Selatan, Indonesia
            </p>
            <p className="text-blue-400 font-black">info@bhairava.sch.id</p>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto border-t border-white/5 pt-12 flex flex-col md:row justify-between items-center gap-6">
          <p className="text-slate-600 text-xs font-black uppercase tracking-widest">© 2026 SMK BHAIRAVA. All rights reserved.</p>
          <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-slate-600">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
