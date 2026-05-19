'use client';

import React from 'react';
import PageHero from '@/components/PageHero';
import { prisma } from '@/lib/prisma';
import { Users, GraduationCap, Newspaper, TrendingUp, Clock, ArrowRight, Brain, AlertTriangle, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

async function getStats() {
  const [studentsCount, majorsCount, newsCount] = await Promise.all([
    prisma.student.count(),
    prisma.major.count(),
    prisma.news.count(),
  ]);

  return [
    { label: 'Total Siswa', value: studentsCount, icon: Users, color: 'bg-blue-500' },
    { label: 'Total Jurusan', value: majorsCount, icon: GraduationCap, color: 'bg-emerald-500' },
    { label: 'Berita Aktif', value: newsCount, icon: Newspaper, color: 'bg-amber-500' },
    { label: 'Pertumbuhan', value: '+12%', icon: TrendingUp, color: 'bg-purple-500' },
  ];
}

async function getRecentNews() {
  return await prisma.news.findMany({
    take: 3,
    orderBy: { createdAt: 'desc' }
  });
}

export default async function AdminDashboard() {
  const [stats, recentNews] = await Promise.all([getStats(), getRecentNews()]);

  return (
    <div className="space-y-8">
      <PageHero 
        title="Admin <br />Dashboard" 
        subtitle="Kelola seluruh operasional sekolah, data akademik, dan administrasi dari satu pintu." 
        bgImage="/robot.jpeg" 
        badge="System Administration" 
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.color} p-3 rounded-xl text-white`}>
                <stat.icon size={24} />
              </div>
              <span className="text-xs font-medium text-slate-400">Pembaruan Hari Ini</span>
            </div>
            <h3 className="text-3xl font-bold text-slate-800">{stat.value}</h3>
            <p className="text-slate-500 text-sm">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8 px-6">
        {/* Predictive AI Analytics Placeholder */}
        <div className="bg-blue-600 rounded-[3rem] p-8 text-white relative overflow-hidden flex flex-col shadow-xl shadow-blue-200 lg:col-span-3">
           <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                 <div className="p-2 bg-white/20 rounded-xl backdrop-blur-md">
                    <Brain size={24} />
                 </div>
                 <h3 className="text-xl font-black uppercase tracking-wider">AI Predictive</h3>
              </div>
              <p className="text-blue-100 text-sm mb-8 leading-relaxed">Analisis risiko akademik & keberhasilan penempatan industri siswa secara real-time.</p>
              
              <div className="space-y-4">
                 <div className="bg-white/10 p-4 rounded-2xl border border-white/10 flex items-center justify-between">
                    <span className="text-xs font-bold">Placement Rate Target</span>
                    <span className="font-black text-lg">98%</span>
                 </div>
                 <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
                    <div className="flex justify-between items-center mb-2">
                       <span className="text-xs font-bold">Student Success Score</span>
                       <span className="text-xs font-black">8.4/10</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
                       <div className="w-[84%] h-full bg-emerald-400" />
                    </div>
                 </div>
              </div>

              <button className="mt-8 w-full bg-white text-blue-600 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-blue-50 transition-colors">
                 Full Analysis <ArrowRight size={14} className="inline ml-2" />
              </button>
           </div>
           
           <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 px-6 pb-20">
        {/* Recent Media Quick View */}
        <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-8">
             <h3 className="text-xl font-black text-slate-900">Media Library Cerdas</h3>
             <Link href="/admin/media" className="text-blue-600 font-black text-xs uppercase tracking-widest">Akses Library</Link>
          </div>
          <div className="grid grid-cols-4 gap-4">
             {['/making robot.jpeg', '/merakit pc.jpeg', '/programming.jpeg', '/profil siswa.jpeg'].map((src, i) => (
               <div key={i} className="relative aspect-square rounded-2xl overflow-hidden bg-slate-50 border border-slate-100">
                  <Image src={src} alt="Activity" fill sizes="25vw" className="object-cover" />
               </div>
             ))}
          </div>
        </div>

        {/* Audit Log / Recent Activity Simulation */}
        <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm">
           <div className="flex justify-between items-center mb-8">
             <h3 className="text-xl font-black text-slate-900">Audit Log & Tracker</h3>
             <button className="text-slate-400 font-bold text-xs uppercase tracking-widest">Filter Log</button>
          </div>
          <div className="space-y-6">
             <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                   <CheckCircle2 size={18} />
                </div>
                <div className="flex-1">
                   <p className="text-sm font-bold text-slate-700">Admin mempublikasikan Berita Baru</p>
                   <p className="text-[10px] text-slate-400 font-bold uppercase">2 menit yang lalu • Content Studio</p>
                </div>
             </div>
             <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                   <Users size={18} />
                </div>
                <div className="flex-1">
                   <p className="text-sm font-bold text-slate-700">Siswa Baru berhasil diimpor (CSV)</p>
                   <p className="text-[10px] text-slate-400 font-bold uppercase">15 menit yang lalu • Student Manager</p>
                </div>
             </div>
             <div className="flex items-center gap-4 opacity-50">
                <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600">
                   <AlertTriangle size={18} />
                </div>
                <div className="flex-1">
                   <p className="text-sm font-bold text-slate-700">Login terdeteksi dari IP baru</p>
                   <p className="text-[10px] text-slate-400 font-bold uppercase">1 jam yang lalu • Security System</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
