'use client';

import React, { useState } from 'react';
import { 
  Plus, 
  GraduationCap, 
  Network, 
  Calculator, 
  Megaphone, 
  Brain, 
  Database,
  Edit3, 
  Trash2 
} from 'lucide-react';
import Modal from './Modal';
import MajorForm from './MajorForm';
import { deleteMajor } from '@/lib/actions/major';

const iconMap: Record<string, any> = {
  Network,
  Calculator,
  Megaphone,
  Brain,
  Database,
  GraduationCap
};

interface MajorClientProps {
  majors: any[];
}

export default function MajorClient({ majors }: MajorClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMajor, setSelectedMajor] = useState<any>(null);

  const handleEdit = (major: any) => {
    setSelectedMajor(major);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus jurusan ini?')) {
      try {
        await deleteMajor(id);
      } catch (error: any) {
        alert(error.message || 'Terjadi kesalahan saat menghapus data');
      }
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMajor(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Program Keahlian</h1>
          <p className="text-slate-500">Kelola kurikulum dan informasi jurusan</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
        >
          <Plus size={20} />
          Tambah Jurusan
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {majors.map((major) => {
          const Icon = iconMap[major.icon] || GraduationCap;
          return (
            <div key={major.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col h-full">
              <div className="flex justify-between items-start mb-6">
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                  <Icon size={28} />
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleEdit(major)}
                    className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                  >
                    <Edit3 size={18} />
                  </button>
                  <button 
                    onClick={() => handleDelete(major.id)}
                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{major.name}</h3>
              <p className="text-slate-500 text-sm mb-6 flex-1 line-clamp-3">
                {major.description}
              </p>
              <div className="pt-6 border-t border-slate-50 flex justify-between items-center">
                <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">Kapasitas</span>
                <span className="bg-slate-100 px-3 py-1 rounded-full text-xs font-black text-slate-600">
                  {major._count?.students || 0} Siswa
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={selectedMajor ? 'Edit Program Keahlian' : 'Tambah Jurusan Baru'}
      >
        <MajorForm initialData={selectedMajor} onSuccess={closeModal} />
      </Modal>
    </div>
  );
}
