import React from 'react';
import Navbar from '@/components/Navbar';
import PageHero from '@/components/PageHero';
import CartoMap from '@/components/client/CartoMap';
import { Mail, Phone, MapPin, Send, MessageCircle, Share2, Globe, ShieldCheck, Briefcase, Network } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <PageHero 
        title="Mari Bicara <br />Masa Depan" 
        subtitle="Punya pertanyaan tentang pendaftaran atau ingin bekerjasama dengan kami? Jangan ragu untuk menghubungi tim kami." 
        bgImage="/desainer.jpeg" 
        badge="Hubungi Kami"
        priority 
      />

      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-start">
            <div>
              <h1 className="text-6xl font-black text-slate-900 mb-8 leading-tight">Mari Bicara <br />Masa <span className="text-blue-600">Depan.</span></h1>
              <p className="text-xl text-slate-500 mb-12 max-w-md">
                Punya pertanyaan tentang pendaftaran atau ingin bekerjasama dengan kami? Jangan ragu untuk menghubungi tim kami.
              </p>

              <div className="space-y-8">
                <div className="flex gap-6 items-center">
                  <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 flex-shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Email Kami</h4>
                    <p className="text-xl font-bold text-slate-800">info@bhairava.sch.id</p>
                  </div>
                </div>
                <div className="flex gap-6 items-center">
                  <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 flex-shrink-0">      
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Telepon</h4>
                    <p className="text-xl font-bold text-slate-800">(021) 1234-5678</p>
                  </div>
                </div>
                <div className="flex gap-6 items-center">
                  <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 flex-shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Lokasi</h4>
                    <p className="text-xl font-bold text-slate-800">Jakarta Selatan, Indonesia</p>
                  </div>
                </div>
              </div>

              <div className="mt-16 pt-12 border-t border-slate-100">
                <h4 className="font-bold text-slate-900 mb-6">Media Sosial</h4>
                <div className="flex gap-4">
                  <button className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600 hover:bg-blue-600 hover:text-white transition-all">
                    <MessageCircle size={20} />
                  </button>
                  <button className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600 hover:bg-blue-400 hover:text-white transition-all">
                    <Share2 size={20} />
                  </button>
                  <button className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600 hover:bg-blue-800 hover:text-white transition-all">
                    <Globe size={20} />
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-8 md:p-12 rounded-[3rem] border border-slate-100">
              <h3 className="text-3xl font-bold text-slate-900 mb-8">Kirim Pesan</h3>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Nama Lengkap</label>
                    <input type="text" className="w-full px-6 py-4 rounded-2xl bg-white border-transparent focus:ring-4 focus:ring-blue-100 outline-none transition-all shadow-sm" placeholder="John Doe" />
                 </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Email</label>
                    <input type="email" className="w-full px-6 py-4 rounded-2xl bg-white border-transparent focus:ring-4 focus:ring-blue-100 outline-none transition-all shadow-sm" placeholder="john@example.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Subjek</label>
                  <input type="text" className="w-full px-6 py-4 rounded-2xl bg-white border-transparent focus:ring-4 focus:ring-blue-100 outline-none transition-all shadow-sm" placeholder="Informasi Pendaftaran" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Pesan</label>
                  <textarea rows={5} className="w-full px-6 py-4 rounded-2xl bg-white border-transparent focus:ring-4 focus:ring-blue-100 outline-none transition-all shadow-sm" placeholder="Tuliskan pesan Anda di sini..."></textarea>
                </div>
                <button className="w-full bg-slate-900 text-white py-5 rounded-2xl font-bold text-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-2 group">
                  Kirim Pesan Sekarang
                  <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="h-[400px] w-full overflow-hidden">
        <CartoMap />
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