'use client';

import React, { useState } from 'react';
import { createNews, updateNews, generateNewsDraft } from '@/lib/actions/news';
import { Sparkles, Send, Save, Loader2 } from 'lucide-react';

interface NewsFormProps {
  initialData?: any;
  onSuccess: () => void;
}

export default function NewsForm({ initialData, onSuccess }: NewsFormProps) {
  const [loading, setLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    content: initialData?.content || '',
    category: initialData?.category || 'GENERAL',
    image: initialData?.image || '',
    isDraft: initialData?.isDraft || false,
  });

  const handleAIDraft = async () => {
    if (!formData.title) {
      alert('Silakan isi judul terlebih dahulu agar AI bisa memberikan rekomendasi konten.');
      return;
    }

    setIsGenerating(true);
    try {
      const draft = await generateNewsDraft(formData.title);
      setFormData(prev => ({
        ...prev,
        content: draft.content,
        category: draft.category,
        image: draft.image
      }));
    } catch (error) {
      console.error(error);
      alert('Gagal generate draft AI');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (initialData?.id) {
        await updateNews(initialData.id, formData);
      } else {
        await createNews(formData);
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
        <label className="text-xs font-black uppercase tracking-widest text-slate-400">Judul Konten</label>
        <input
          required
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Contoh: Kerjasama Industri Baru..."
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
            <option value="GENERAL">Umum</option>
            <option value="ANNOUNCEMENT">Pengumuman</option>
            <option value="EVENT">Event Sekolah</option>
            <option value="ACHIEVEMENT">Prestasi</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-slate-400">Status</label>
          <div className="flex bg-slate-50 p-1 rounded-2xl">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, isDraft: false })}
              className={`flex-1 py-3 rounded-xl text-xs font-black transition-all ${!formData.isDraft ? 'bg-white shadow-sm text-blue-600' : 'text-slate-400'}`}
            >
              PUBLISHED
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, isDraft: true })}
              className={`flex-1 py-3 rounded-xl text-xs font-black transition-all ${formData.isDraft ? 'bg-white shadow-sm text-amber-600' : 'text-slate-400'}`}
            >
              DRAFT
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-black uppercase tracking-widest text-slate-400">URL Gambar (Opsional)</label>
        <input
          type="text"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          placeholder="https://..."
          className="w-full px-6 py-4 bg-slate-50 border-transparent focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-2xl transition-all outline-none font-medium"
        />
      </div>

      <div className="space-y-2 relative">
        <div className="flex justify-between items-center mb-2">
          <label className="text-xs font-black uppercase tracking-widest text-slate-400">Isi Konten</label>
          <button
            type="button"
            onClick={handleAIDraft}
            disabled={isGenerating}
            className="text-[10px] font-black text-blue-600 flex items-center gap-1 hover:gap-2 transition-all bg-blue-50 px-3 py-1 rounded-full uppercase tracking-widest disabled:opacity-50"
          >
            {isGenerating ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />}
            {isGenerating ? 'Generating...' : 'AI Draft Generator'}
          </button>
        </div>
        <textarea
          required
          rows={6}
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          placeholder="Tulis isi berita atau pengumuman di sini..."
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
              {initialData?.id ? <Save size={20} /> : <Send size={20} />}
              {initialData?.id ? 'Simpan Perubahan' : 'Publish Konten'}
            </>
          )}
        </button>
      </div>
    </form>
  );
}
