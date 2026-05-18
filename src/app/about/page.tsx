import React from 'react';
import Navbar from '@/components/Navbar';
import { Target, Users2, Building2, Award } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero */}
      <section className="pt-32 pb-20 px-6 bg-slate-900 text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <h1 className="text-6xl font-black mb-6">Tentang <span className="text-blue-400">Kami</span></h1>
          <p className="text-xl text-slate-400 max-w-2xl leading-relaxed">
            SMK BHAIRAVA didirikan dengan visi untuk menjembatani kesenjangan antara pendidikan formal dan kebutuhan industri teknologi yang berkembang pesat.
          </p>
        </div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/10 skew-x-12"></div>
      </section>

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
            <div className="grid grid-cols-2 gap-6">
              <div className="aspect-[4/5] bg-blue-100 rounded-[2.5rem] overflow-hidden">
                <img src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover" alt="" />
              </div>
              <div className="aspect-[4/5] bg-emerald-100 rounded-[2.5rem] mt-12 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover" alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer (Simplified) */}
      <footer className="bg-slate-900 text-white py-12 px-6 text-center">
        <p className="text-slate-500 text-sm">© 2026 SMK BHAIRAVA. All rights reserved.</p>
      </footer>
    </div>
  );
}
