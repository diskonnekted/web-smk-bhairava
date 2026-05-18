'use client';

import React, { useState } from 'react';
import { 
  Plus, 
  Newspaper, 
  MoreHorizontal, 
  Calendar, 
  Image as ImageIcon, 
  Sparkles, 
  Globe, 
  MessageSquare, 
  Send,
  Trash2,
  Edit3
} from 'lucide-react';
import Modal from './Modal';
import NewsForm from './NewsForm';
import { deleteNews } from '@/lib/actions/news';

interface NewsClientProps {
  newsItems: any[];
}

export default function NewsClient({ newsItems }: NewsClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState<any>(null);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const handleEdit = (news: any) => {
    setSelectedNews(news);
    setIsModalOpen(true);
    setActiveMenu(null);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus konten ini?')) {
      await deleteNews(id);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedNews(null);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black text-slate-900 mb-2">Content Studio</h1>
          <p className="text-slate-500">AI-Assisted CMS & Multi-Channel Distribution</p>
        </div>
        <div className="flex gap-4">
          <button className="bg-white text-slate-900 border-2 border-slate-100 px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-slate-50 transition-all">
            <Sparkles size={18} className="text-blue-600" />
            AI Draft Generator
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-blue-700 transition-all shadow-xl shadow-blue-200"
          >
            <Plus size={20} />
            Buat Konten Baru
          </button>
        </div>
      </div>

      {/* Tabs / Filters */}
      <div className="flex gap-4 border-b border-slate-100 pb-1">
        {['Semua', 'Pengumuman', 'Prestasi', 'Event', 'Draft'].map((tab, i) => (
          <button key={tab} className={`px-6 py-3 font-bold text-sm transition-all relative ${i === 0 ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}>
            {tab}
            {i === 0 && <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-600 rounded-full" />}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {newsItems.length === 0 ? (
          <div className="col-span-full bg-white p-20 rounded-[3rem] border border-dashed border-slate-200 text-center">
            <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-6 text-slate-200">
              <Newspaper size={40} />
            </div>
            <h3 className="text-2xl font-bold text-slate-400 mb-2">Studio Konten Kosong</h3>
            <p className="text-slate-400 max-w-xs mx-auto">Mulai buat pengumuman atau berita sekolah pertama Anda menggunakan AI Studio.</p>
          </div>
        ) : (
          newsItems.map((news) => (
            <div key={news.id} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group relative">
              <div className="flex gap-8">
                <div className="w-32 h-32 bg-slate-100 rounded-3xl flex-shrink-0 flex items-center justify-center text-slate-300 overflow-hidden relative group-hover:shadow-lg transition-all">
                  {news.image ? (
                    <img src={news.image} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <ImageIcon size={40} />
                  )}
                  <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/10 transition-colors"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex gap-2">
                      <span className="px-3 py-1 bg-slate-100 text-slate-500 rounded-full text-[10px] font-black uppercase tracking-widest">
                        {news.category}
                      </span>
                      {news.isDraft && (
                        <span className="px-3 py-1 bg-amber-50 text-amber-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-amber-100">
                          Draft
                        </span>
                      )}
                    </div>
                    <div className="relative">
                      <button 
                        onClick={() => setActiveMenu(activeMenu === news.id ? null : news.id)}
                        className="text-slate-300 hover:text-slate-600 p-2"
                      >
                        <MoreHorizontal size={24} />
                      </button>
                      
                      {activeMenu === news.id && (
                        <div className="absolute right-0 top-12 w-48 bg-white rounded-2xl shadow-2xl border border-slate-100 z-20 overflow-hidden">
                          <button 
                            onClick={() => handleEdit(news)}
                            className="w-full flex items-center gap-3 px-6 py-4 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors"
                          >
                            <Edit3 size={18} className="text-blue-600" />
                            Edit Konten
                          </button>
                          <button 
                            onClick={() => handleDelete(news.id)}
                            className="w-full flex items-center gap-3 px-6 py-4 text-sm font-bold text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <Trash2 size={18} />
                            Hapus Konten
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-4 line-clamp-1">{news.title}</h3>
                  <p className="text-slate-500 text-sm line-clamp-2 mb-6 leading-relaxed">
                    {news.content}
                  </p>
                  
                  <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                    <div className="flex items-center gap-4 text-xs font-bold text-slate-400">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} className="text-blue-500" />
                        {new Date(news.createdAt).toLocaleDateString('id-ID')}
                      </div>
                      <div className="flex items-center gap-2">
                        <Globe size={14} className="text-emerald-500" />
                        Web Live
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <button className="p-2.5 bg-slate-50 text-slate-400 hover:bg-emerald-50 hover:text-emerald-600 rounded-xl transition-all" title="Push to WhatsApp">
                        <MessageSquare size={18} />
                      </button>
                      <button className="p-2.5 bg-slate-50 text-slate-400 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all" title="Push to Email">
                        <Send size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={selectedNews ? 'Edit Konten Studio' : 'Buat Konten Baru'}
      >
        <NewsForm initialData={selectedNews} onSuccess={closeModal} />
      </Modal>
    </div>
  );
}
