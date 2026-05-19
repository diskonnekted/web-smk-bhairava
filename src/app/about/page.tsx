import React from 'react';
import Navbar from '@/components/Navbar';
import PageHero from '@/components/PageHero';
import Image from 'next/image';
import Link from 'next/link';
import { Target, Users2, Building2, Award, ShieldCheck, Briefcase, Network } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <PageHero 
        title="Tentang <br />Kami" 
        subtitle="SMK BHAIRAVA didirikan dengan visi untuk menjembatani kesenjangan antara pendidikan formal dan kebutuhan industri teknologi yang berkembang pesat." 
        bgImage="/programming.jpeg" 
        badge="Tentang Sekolah" 
      />

      {/* Visi Misi */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16">
          <div className="bg-slate-50 p-12 rounded-[3rem]">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white mb-8">
              <Target size={32} />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Visi Kami</h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              Menjadi pusat unggulan pendidikan kejuruan yang menghasilkan lulusan berkarakter, kompeten secara teknis, dan adaptif terhadap inovasi digital global pada tahun 2030.
            </p>
          </div>
          <div className="bg-slate-50 p-12 rounded-[3rem]">
            <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center text-white mb-8">
              <Award size={32} />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Misi Kami</h2>
            <ul className="space-y-4 text-slate-600 text-lg">
              <li className="flex gap-3">
                <span className="text-emerald-500 font-bold">•</span>
                Menyelenggarakan pembelajaran berbasis industri dan proyek nyata.
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 font-bold">•</span>
                Mengintegrasikan teknologi terkini dalam setiap kurikulum jurusan.
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 font-bold">•</span>
                Menjalin kemitraan strategis dengan perusahaan teknologi nasional dan internasional.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Sejarah / Nilai */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl font-black text-slate-900 mb-8">Budaya & Nilai Sekolah</h2>
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-blue-600 flex-shrink-0">
                    <Users2 size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Kolaborasi</h4>
                    <p className="text-slate-500">Kami percaya bahwa inovasi lahir dari kerja tim yang solid antar siswa dan guru.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-blue-600 flex-shrink-0">
                    <Building2 size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Integritas</h4>
                    <p className="text-slate-500">Membangun karakter jujur dan profesional adalah fondasi utama bagi setiap lulusan.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="relative w-2/5 aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl z-20">
                <Image src="/logo smk bhairava.JPG" alt="Gedung SMK Bhairava" fill sizes="(max-width: 768px) 40vw, 20vw" className="object-cover" />
              </div>
              <div className="absolute top-20 right-0 w-3/5 aspect-square rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white z-10">
                <Image src="/robotic.jpeg" alt="IoT & Robotic" fill sizes="(max-width: 768px) 60vw, 30vw" className="object-cover" />
              </div>
            </div>
          </div>
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
