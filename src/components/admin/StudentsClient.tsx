'use client';

import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  MoreHorizontal, 
  User as UserIcon, 
  GraduationCap, 
  Filter, 
  Download, 
  Upload,
  FileSpreadsheet,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function StudentsClient({ students }: { students: any[] }) {
  const [isExporting, setIsGenerating] = useState(false);
  const [showExportSuccess, setShowSuccess] = useState(false);
  const router = useRouter();

  const handleExport = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 2000);
  };

  const handleRowClick = (studentId: string) => {
    router.push(`/admin/students/${studentId}`);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black text-slate-900 mb-2">Manajemen Siswa</h1>
          <p className="text-slate-500">Kelola data induk siswa dan riwayat akademik</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={handleExport}
            disabled={isExporting}
            className="bg-white text-slate-900 border-2 border-slate-100 px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-slate-50 transition-all disabled:opacity-50"
          >
            {isExporting ? <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}><Download size={18} /></motion.div> : <FileSpreadsheet size={18} className="text-emerald-600" />}
            {isExporting ? 'Generating Report...' : 'Automated Reporting (Excel)'}
          </button>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-blue-700 transition-all shadow-xl shadow-blue-200">
            <Plus size={20} />
            Tambah Siswa
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showExportSuccess && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="p-4 bg-emerald-50 border border-emerald-100 text-emerald-600 font-bold rounded-2xl flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
               <CheckCircle2 size={20} />
               <span>Laporan berhasil digenerate! File akan otomatis terunduh.</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-wrap gap-4 items-center">
        <div className="flex-1 min-w-[300px] relative">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="Cari nama atau NIS..." 
            className="w-full pl-14 pr-6 py-4 bg-slate-50 border-transparent focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-2xl transition-all outline-none font-medium"
          />
        </div>
      </div>

      <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50/50 border-b border-slate-100">
            <tr>
              <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Nama Siswa</th>
              <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">NIS</th>
              <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Jurusan</th>
              <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Status PKL</th>
              <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Tindakan</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {students.map((student) => (
              <tr 
                key={student.id} 
                className="hover:bg-blue-50/50 transition-colors group cursor-pointer"
                onClick={() => handleRowClick(student.id)}
              >
                <td className="px-8 py-5">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-500 font-black group-hover:bg-blue-200 group-hover:text-blue-700 transition-all">
                      {student.name.charAt(0)}
                    </div>
                    <p className="font-black text-slate-900">{student.name}</p>
                  </div>
                </td>
                <td className="px-8 py-5 text-slate-600 font-bold font-mono text-sm">{student.nis}</td>
                <td className="px-8 py-5">
                  <span className="px-4 py-1.5 rounded-xl text-[10px] font-black tracking-widest bg-slate-100 text-slate-600 border border-slate-200 flex items-center gap-2 w-fit">
                    <GraduationCap size={12} />
                    {student.major.name}
                  </span>
                </td>
                <td className="px-8 py-5">
                  {student.internships.length > 0 ? (
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-100">
                      {student.internships[0].status}
                    </span>
                  ) : (
                    <span className="text-slate-300 text-[10px] font-black uppercase tracking-widest">Belum PKL</span>
                  )}
                </td>
                <td className="px-8 py-5 text-right">
                  <div className="p-2.5 rounded-xl text-slate-300 group-hover:text-slate-900 group-hover:bg-white group-hover:shadow-md border border-transparent transition-all">
                    <ChevronRight size={20} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
