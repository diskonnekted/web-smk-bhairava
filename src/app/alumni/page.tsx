import React from 'react';
import Navbar from '@/components/Navbar';
import Image from 'next/image';
import { Search, Filter, Briefcase, GraduationCap, MapPin, Globe, ArrowRight, Star } from 'lucide-react';
import Link from 'next/link';

const alumniData = [
  { name: 'Ahmad Fauzi', year: '2023', major: 'TJKT', company: 'AWS Indonesia', role: 'Network Engineer', image: '/prakrtik industri it.jpeg' },
  { name: 'Siti Aminah', year: '2022', major: 'Akuntansi', company: 'PwC Indonesia', role: 'Junior Auditor', image: '/praktik kerja.jpeg' },
  { name: 'Budi Santoso', year: '2023', major: 'Digital Marketing', company: 'Gojek', role: 'SEO Specialist', image: '/profil siswa.jpeg' },
  { name: 'Rina Kartika', year: '2021', major: 'AI & ML', company: 'NVIDIA', role: 'Data Scientist', image: '/making robot.jpeg' },
];

export default function AlumniPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-20">
           <Image src="/robot.jpeg" alt="Alumni Hero" fill className="object-cover" />
           <div className="absolute inset-0 bg-gradient-to-l from-transparent to-slate-900" />
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 bg-blue-600 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest mb-8">
            <Globe size={14} />
            <span>Global Alumni Network</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-black mb-8 leading-tight">Jejaring Alumni <br /><span className="text-blue-400">Bhairava Global.</span></h1>
          <p className="text-xl text-slate-400 max-w-2xl leading-relaxed mb-12">
            Terhubung dengan ribuan lulusan SMK Bhairava yang telah berkarir di berbagai perusahaan teknologi ternama dan industri global di seluruh dunia.
          </p>
          <div className="flex gap-4">
             <button className="bg-white text-slate-900 px-10 py-5 rounded-[2rem] font-black text-lg hover:bg-blue-600 hover:text-white transition-all">
                Gabung Network
             </button>
             <button className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-10 py-5 rounded-[2rem] font-black text-lg hover:bg-white/20 transition-all">
                Cari Mentor
             </button>
          </div>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="py-12 px-6 border-b border-slate-100 bg-slate-50 sticky top-[72px] z-40">
         <div className="max-w-7xl mx-auto flex flex-wrap gap-4 items-center">
            <div className="flex-1 min-w-[300px] relative">
               <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
               <input 
                 type="text" 
                 placeholder="Cari nama alumni, perusahaan, atau tahun lulus..." 
                 className="w-full pl-14 pr-6 py-5 bg-white border-2 border-transparent focus:border-blue-500 rounded-[2rem] outline-none font-bold text-slate-700 shadow-sm transition-all"
               />
            </div>
            <div className="flex gap-3">
               <select className="px-8 py-5 bg-white border-2 border-transparent rounded-[2rem] outline-none font-bold text-slate-600 shadow-sm focus:border-blue-500 transition-all">
                  <option>Semua Jurusan</option>
                  <option>TJKT</option>
                  <option>Akuntansi</option>
                  <option>AI & ML</option>
               </select>
               <button className="p-5 bg-white text-slate-600 rounded-[2rem] border-2 border-transparent hover:border-blue-100 shadow-sm transition-all">
                  <Filter size={20} />
               </button>
            </div>
         </div>
      </section>

      {/* Directory Grid */}
      <section className="py-24 px-6">
         <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
               {alumniData.map((alumni, i) => (
                 <div key={i} className="group bg-white rounded-[3rem] border border-slate-100 overflow-hidden hover:shadow-2xl hover:-translate-y-3 transition-all duration-500">
                    <div className="aspect-[4/5] relative overflow-hidden">
                       <Image src={alumni.image} alt={alumni.name} fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
                       <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                       <div className="absolute bottom-6 left-6 right-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                          <button className="w-full bg-blue-600 text-white py-3 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2">
                             Lihat Profil <ArrowRight size={14} />
                          </button>
                       </div>
                    </div>
                    <div className="p-8">
                       <div className="flex justify-between items-start mb-4">
                          <div>
                             <h3 className="text-xl font-black text-slate-900">{alumni.name}</h3>
                             <p className="text-xs font-bold text-slate-400">Angkatan {alumni.year}</p>
                          </div>
                          <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                             {alumni.major}
                          </span>
                       </div>
                       <div className="space-y-3 pt-4 border-t border-slate-50">
                          <div className="flex items-center gap-3 text-slate-600">
                             <Briefcase size={16} className="text-blue-500" />
                             <span className="text-sm font-bold">{alumni.company}</span>
                          </div>
                          <div className="flex items-center gap-3 text-slate-500">
                             <MapPin size={16} className="text-slate-400" />
                             <span className="text-xs font-medium">{alumni.role}</span>
                          </div>
                       </div>
                    </div>
                 </div>
               ))}
            </div>

            {/* Pagination Placeholder */}
            <div className="mt-20 flex justify-center">
               <button className="bg-slate-100 text-slate-600 px-12 py-5 rounded-[2rem] font-black hover:bg-blue-600 hover:text-white transition-all">
                  Muat Lebih Banyak Alumni
               </button>
            </div>
         </div>
      </section>

      {/* Stats - Success Value */}
      <section className="py-24 px-6 bg-slate-900 text-white relative overflow-hidden">
         <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12 text-center relative z-10">
            <div>
               <p className="text-6xl font-black text-blue-400 mb-2">2.5k+</p>
               <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.2em]">Total Alumni</p>
            </div>
            <div>
               <p className="text-6xl font-black text-emerald-400 mb-2">150+</p>
               <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.2em]">Global Companies</p>
            </div>
            <div>
               <p className="text-6xl font-black text-amber-400 mb-2">15+</p>
               <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.2em]">Countries Reached</p>
            </div>
         </div>
         {/* Background decoration */}
         <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]" />
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-100 text-center">
        <p className="text-slate-400 text-xs font-black uppercase tracking-widest">© 2026 SMK BHAIRAVA. Global Alumni Network.</p>
      </footer>
    </div>
  );
}
