'use client';

import React, { useState } from 'react';
import { createMajor, updateMajor } from '@/lib/actions/major';
import { Save, Plus } from 'lucide-react';

interface MajorFormProps {
  initialData?: any;
  onSuccess: () => void;
}

const icons = ['Network', 'Calculator', 'Megaphone', 'Brain', 'Database', 'GraduationCap'];

export default function MajorForm({ initialData, onSuccess }: MajorFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    description: initialData?.description || '',
    icon: initialData?.icon || 'GraduationCap',
    category: initialData?.category || 'TECH',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (initialData?.id) {
        await updateMajor(initialData.id, formData);
      } else {
        await createMajor(formData);
      }
      onSuccess();
    } catch (error) {
      console.error(error);
      alert('Terjadi kesalahan saat menyimpan data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label className="text-xs font-black uppercase tracking-widest text-slate-400">Nama Jurusan</label>
        <input
          required
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Contoh: Teknik Jaringan Komputer..."
          className="w-full px-6 py-4 bg-slate-50 border-transparent focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-2xl transition-all outline-none font-bold"
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-slate-400">Kategori</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full px-6 py-4 bg-slate-50 border-transparent focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-2xl transition-all outline-none font-bold text-slate-600"
          >
            <option value="TECH">Teknologi</option>
            <option value="BUSINESS">Bisnis & Manajemen</option>
            <option value="CORE">Umum / Inti</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-slate-400">Ikon</label>
          <select
            value={formData.icon}
            onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
            className="w-full px-6 py-4 bg-slate-50 border-transparent focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-2xl transition-all outline-none font-bold text-slate-600"
          >
            {icons.map(icon => (
              <option key={icon} value={icon}>{icon}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-black uppercase tracking-widest text-slate-400">Deskripsi Singkat</label>
        <textarea
          required
          rows={4}
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Jelaskan fokus dan keunggulan jurusan ini..."
          className="w-full px-6 py-4 bg-slate-50 border-transparent focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-2xl transition-all outline-none font-medium leading-relaxed"
        />
      </div>

      <div className="pt-4 flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-blue-600 text-white py-4 rounded-2xl font-black text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 flex items-center justify-center gap-3 disabled:opacity-50"
        >
          {loading ? (
            'Menyimpan...'
          ) : (
            <>
              {initialData?.id ? <Save size={20} /> : <Plus size={20} />}
              {initialData?.id ? 'Simpan Perubahan' : 'Tambah Jurusan'}
            </>
          )}
        </button>
      </div>
    </form>
  );
}
