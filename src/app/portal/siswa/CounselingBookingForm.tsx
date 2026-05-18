'use client';

import React, { useState } from 'react';
import { bookCounselingSession } from '@/lib/actions/counseling';
import { Send, Loader2, Calendar, User, MessageSquare } from 'lucide-react';

interface Teacher {
  id: string;
  name: string;
}

export default function CounselingBookingForm({ 
  studentId, 
  teachers,
  onSuccess 
}: { 
  studentId: string; 
  teachers: Teacher[];
  onSuccess?: () => void;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const teacherId = formData.get('teacherId') as string;
    const date = formData.get('date') as string;
    const topic = formData.get('topic') as string;

    try {
      await bookCounselingSession({
        studentId,
        teacherId,
        date,
        topic
      });
      if (onSuccess) onSuccess();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan saat memproses booking.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-bold">
          {error}
        </div>
      )}

      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Pilih Guru Pembimbing</label>
        <div className="relative">
          <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <select
            name="teacherId"
            required
            className="w-full pl-14 pr-6 py-4 bg-slate-50 border-2 border-transparent focus:bg-white focus:border-blue-500 rounded-2xl outline-none font-bold text-slate-700 transition-all appearance-none"
          >
            <option value="">Pilih Guru...</option>
            {teachers.map(teacher => (
              <option key={teacher.id} value={teacher.id}>{teacher.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Tanggal Sesi</label>
        <div className="relative">
          <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input
            name="date"
            type="datetime-local"
            required
            className="w-full pl-14 pr-6 py-4 bg-slate-50 border-2 border-transparent focus:bg-white focus:border-blue-500 rounded-2xl outline-none font-bold text-slate-700 transition-all"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Topik Konsultasi</label>
        <div className="relative">
          <MessageSquare className="absolute left-5 top-5 text-slate-400" size={20} />
          <textarea
            name="topic"
            required
            rows={3}
            placeholder="Jelaskan hal yang ingin dikonsultasikan..."
            className="w-full pl-14 pr-6 py-4 bg-slate-50 border-2 border-transparent focus:bg-white focus:border-blue-500 rounded-2xl outline-none font-bold text-slate-700 transition-all resize-none"
          />
        </div>
      </div>

      <button
        disabled={isSubmitting}
        type="submit"
        className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-lg hover:bg-blue-600 transition-all shadow-xl flex items-center justify-center gap-3 disabled:opacity-70 group"
      >
        {isSubmitting ? (
          <Loader2 className="animate-spin" />
        ) : (
          <>
            Konfirmasi Booking
            <Send size={20} className="group-hover:translate-x-1 transition-transform" />
          </>
        )}
      </button>
    </form>
  );
}
