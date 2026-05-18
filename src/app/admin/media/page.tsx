import React from 'react';
import { prisma } from '@/lib/prisma';
import { Image as ImageIcon, Upload, Search, Filter, MoreHorizontal, Trash2, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';

// Simulated media library data from public folder
const mediaItems = [
  { name: 'robot.jpeg', size: '145 KB', type: 'image/jpeg', path: '/robot.jpeg' },
  { name: 'akunting.jpeg', size: '92 KB', type: 'image/jpeg', path: '/akunting.jpeg' },
  { name: 'desainer.jpeg', size: '78 KB', type: 'image/jpeg', path: '/desainer.jpeg' },
  { name: 'excavator.jpeg', size: '94 KB', type: 'image/jpeg', path: '/excavator.jpeg' },
  { name: 'making robot.jpeg', size: '142 KB', type: 'image/jpeg', path: '/making robot.jpeg' },
  { name: 'merakit pc.jpeg', size: '139 KB', type: 'image/jpeg', path: '/merakit pc.jpeg' },
  { name: 'programming.jpeg', size: '89 KB', type: 'image/jpeg', path: '/programming.jpeg' },
  { name: 'prakrtik industri it.jpeg', size: '125 KB', type: 'image/jpeg', path: '/prakrtik industri it.jpeg' },
];

export default async function MediaPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black text-slate-900 mb-2">Media Library Cerdas</h1>
          <p className="text-slate-500">Pusat aset digital teroptimasi dengan AI auto-tagging</p>
        </div>
        <button className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black flex items-center gap-3 hover:bg-blue-700 transition-all shadow-xl shadow-blue-200">
          <Upload size={20} />
          Unggah Aset Baru
        </button>
      </div>

      <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-wrap gap-4 items-center">
        <div className="flex-1 min-w-[300px] relative">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="Cari aset media..." 
            className="w-full pl-14 pr-6 py-4 bg-slate-50 border-transparent focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-2xl transition-all outline-none font-medium"
          />
        </div>
        <div className="flex gap-3">
          <select className="px-6 py-4 bg-slate-50 border-transparent rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 transition-all font-bold text-slate-600">
            <option>Semua Tipe</option>
            <option>Gambar</option>
            <option>Video</option>
            <option>Dokumen</option>
          </select>
          <button className="p-4 bg-slate-50 text-slate-600 rounded-2xl hover:bg-slate-100 transition-all">
            <Filter size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {mediaItems.map((item, i) => (
          <div key={i} className="group bg-white rounded-3xl border border-slate-100 overflow-hidden hover:shadow-2xl transition-all">
            <div className="aspect-square relative overflow-hidden bg-slate-50">
               <Image src={item.path} alt={item.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
               <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-white/90 backdrop-blur-md p-2 rounded-xl text-red-600 shadow-sm cursor-pointer hover:bg-red-600 hover:text-white transition-colors">
                     <Trash2 size={16} />
                  </div>
               </div>
               <div className="absolute bottom-4 left-4">
                  <div className="bg-emerald-500 text-white p-1 rounded-full shadow-lg">
                     <CheckCircle2 size={12} />
                  </div>
               </div>
            </div>
            <div className="p-4">
               <p className="font-bold text-slate-800 text-sm truncate mb-1">{item.name}</p>
               <div className="flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  <span>{item.type.split('/')[1]}</span>
                  <span>{item.size}</span>
               </div>
               
               {/* AI Tags Simulation */}
               <div className="mt-3 flex flex-wrap gap-1">
                  <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded-md text-[8px] font-black uppercase">AI: Tech</span>
                  <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded-md text-[8px] font-black uppercase">AI: School</span>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
