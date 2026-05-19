// src/app/portal/siswa/ProjectForm.tsx
import React from 'react';

export default function ProjectForm() {
  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
      <h2 className="text-2xl font-black text-slate-900 mb-6">Formulir Pengajuan Proyek</h2>
      <p className="text-slate-500 mb-4">Fitur ini akan segera tersedia. Siswa dapat mengajukan proposal proyek di sini.</p>
      {/* Placeholder for form elements */}
      <div className="space-y-4">
        <div>
          <label htmlFor="projectTitle" className="block text-sm font-bold text-slate-700">Judul Proyek</label>
          <input type="text" id="projectTitle" className="w-full mt-1 p-3 border border-slate-300 rounded-xl" placeholder="Mis: Sistem Otomatisasi Absensi" disabled />
        </div>
        <div>
          <label htmlFor="projectDesc" className="block text-sm font-bold text-slate-700">Deskripsi Proyek</label>
          <textarea id="projectDesc" rows={4} className="w-full mt-1 p-3 border border-slate-300 rounded-xl" placeholder="Jelaskan tujuan dan ruang lingkup proyek Anda" disabled></textarea>
        </div>
        <button className="w-full bg-blue-500 text-white p-3 rounded-xl opacity-50 cursor-not-allowed">Kirim Proposal</button>
      </div>
    </div>
  );
}
