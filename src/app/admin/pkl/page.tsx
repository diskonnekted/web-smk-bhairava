import React from 'react';
import { prisma } from '@/lib/prisma';
import { Briefcase, Users, Building2, MapPin, CheckCircle2, Clock, Plus } from 'lucide-react';

async function getPKLData() {
  const internships = await prisma.internship.findMany({
    include: {
      student: {
        include: {
          major: true
        }
      }
    },
    orderBy: { startDate: 'desc' }
  });
  return internships;
}

export default async function PKLPage() {
  const internships = await getPKLData();

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black text-slate-900 mb-2">PKL & Industri</h1>
          <p className="text-slate-500">Monitoring Praktik Kerja Lapangan dan Kerjasama DUDIKA</p>
        </div>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-blue-700 transition-all shadow-xl shadow-blue-200">
          <Plus size={20} />
          Matching Siswa & Industri
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Total Siswa PKL</p>
          <p className="text-3xl font-black text-slate-900">{internships.length}</p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Industri Aktif</p>
          <p className="text-3xl font-black text-emerald-600">
            {new Set(internships.map(i => i.companyName)).size}
          </p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Selesai PKL</p>
          <p className="text-3xl font-black text-blue-600">
            {internships.filter(i => i.status === 'COMPLETED').length}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50/50 border-b border-slate-100">
            <tr>
              <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Siswa</th>
              <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Perusahaan</th>
              <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Periode</th>
              <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Status</th>
              <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Tindakan</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {internships.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-8 py-20 text-center text-slate-400 font-bold italic">
                  Belum ada data penempatan PKL.
                </td>
              </tr>
            ) : (
              internships.map((intern) => (
                <tr key={intern.id} className="hover:bg-slate-50/30 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 font-black text-sm">
                        {intern.student.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-black text-slate-900">{intern.student.name}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{intern.student.major.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2">
                      <Building2 size={16} className="text-slate-400" />
                      <span className="font-bold text-slate-700">{intern.companyName}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                      <Clock size={14} className="text-blue-500" />
                      {new Date(intern.startDate).toLocaleDateString('id-ID', { month: 'short', year: 'numeric' })} - 
                      {new Date(intern.endDate).toLocaleDateString('id-ID', { month: 'short', year: 'numeric' })}
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black tracking-widest border
                      ${intern.status === 'COMPLETED' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                        intern.status === 'ONGOING' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                        'bg-amber-50 text-amber-600 border-amber-100'}`}>
                      {intern.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button className="text-[10px] font-black text-blue-600 hover:bg-blue-50 px-3 py-1 rounded-lg transition-all uppercase tracking-widest">
                      Detail
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
