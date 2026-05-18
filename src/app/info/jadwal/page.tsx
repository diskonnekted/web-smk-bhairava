import React from 'react';
import { prisma } from '@/lib/prisma';
import { Calendar, MapPin, Clock, Tag } from 'lucide-react';
import Link from 'next/link';

export default async function PublicJadwalPage() {
  const events = await prisma.event.findMany({
    orderBy: { startDate: 'asc' },
    where: { startDate: { gte: new Date() } }
  });

  return (
    <div className="min-h-screen bg-slate-50 py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-16 text-center">
           <Link href="/info" className="text-blue-600 font-black text-xs uppercase tracking-widest mb-4 inline-block hover:underline">← Kembali ke Menu Info</Link>
           <h1 className="text-5xl font-black text-slate-900 mb-4 tracking-tighter">Agenda & Jadwal Sekolah</h1>
           <p className="text-slate-500 font-bold">Kalender kegiatan akademik dan event non-akademik SMK Bhairava.</p>
        </div>

        <div className="space-y-6">
          {events.length > 0 ? events.map((event, i) => (
            <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row gap-8 items-start">
               <div className="bg-blue-600 text-white p-6 rounded-3xl flex flex-col items-center justify-center min-w-[100px]">
                  <span className="text-sm font-black uppercase">{event.startDate.toLocaleDateString('id-ID', { month: 'short' })}</span>
                  <span className="text-4xl font-black">{event.startDate.getDate()}</span>
               </div>
               <div className="flex-1 space-y-4">
                  <div className="flex flex-wrap gap-2">
                     <span className="px-3 py-1 bg-slate-100 text-slate-600 text-[10px] font-black uppercase tracking-widest rounded-full flex items-center gap-1">
                        <Tag size={12}/> {event.type}
                     </span>
                  </div>
                  <h3 className="text-2xl font-black text-slate-900">{event.title}</h3>
                  <p className="text-slate-500 font-medium leading-relaxed">{event.description}</p>
                  <div className="flex flex-wrap gap-6 text-sm font-bold text-slate-400">
                     <div className="flex items-center gap-2">
                        <Clock size={16} className="text-blue-500" />
                        {event.startDate.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} - Selesai
                     </div>
                     <div className="flex items-center gap-2">
                        <MapPin size={16} className="text-emerald-500" />
                        {event.location || 'Lingkungan Sekolah'}
                     </div>
                  </div>
               </div>
            </div>
          )) : (
            <div className="bg-white p-20 rounded-[3rem] text-center border border-slate-100">
               <Calendar className="mx-auto text-slate-200 mb-6" size={64} />
               <h3 className="text-xl font-black text-slate-400">Belum ada agenda mendatang.</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
