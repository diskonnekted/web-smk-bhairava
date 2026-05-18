'use client';

import React, { useState } from 'react';
import { Book, Save, Plus, Loader2 } from 'lucide-react';
import { upsertGrade } from '@/lib/actions/grades';

const subjects = [
  'Matematika', 'Bahasa Indonesia', 'Bahasa Inggris', 
  'Dasar-dasar Kejuruan', 'Jaringan Komputer', 'Administrasi Server',
  'Akuntansi Dasar', 'Ekonomi Bisnis', 'Perpajakan'
];

export default function GradeManager({ student, teacher, grades }: { student: any; teacher: any; grades: any[] }) {
  const [semester, setSemester] = useState(1);
  const [loading, setLoading] = useState<string | null>(null);

  const getGrade = (subject: string) => {
    return grades.find(g => g.semester === semester && g.subject === subject)?.score || '';
  };
  
  const handleSave = async (subject: string, score: string) => {
    const scoreValue = parseInt(score);
    if (!score || isNaN(scoreValue) || scoreValue < 0 || scoreValue > 100) {
      alert('Nilai harus antara 0 dan 100');
      return;
    }

    setLoading(subject);
    await upsertGrade({
      studentId: student.id,
      teacherId: teacher.id, // Assuming the logged-in user is the teacher
      subject,
      score: scoreValue,
      semester,
      academicYear: '2025/2026',
    });
    setLoading(null);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
          <Book size={18} className="text-blue-600" /> Manajemen Rapor Akademik
        </h3>
        <div className="flex items-center gap-2 p-1 bg-slate-50 rounded-xl">
          {[1,2,3,4,5,6].map(s => (
            <button 
              key={s}
              onClick={() => setSemester(s)}
              className={`px-4 py-1.5 text-xs font-black rounded-lg transition-all ${semester === s ? 'bg-blue-600 text-white shadow' : 'text-slate-500 hover:bg-slate-200'}`}
            >
              Sem {s}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {subjects.map(subject => (
          <div key={subject} className="p-3 bg-slate-50 rounded-2xl flex justify-between items-center group">
            <span className="font-bold text-slate-700 text-sm">{subject}</span>
            <div className="flex items-center gap-3">
              <input
                type="number"
                min="0"
                max="100"
                defaultValue={getGrade(subject)}
                onBlur={(e) => handleSave(subject, e.target.value)}
                className="w-20 text-center bg-white border-2 border-slate-200 rounded-lg px-2 py-1 font-bold text-lg focus:outline-none focus:border-blue-500 transition-all"
                disabled={loading === subject}
              />
              <button
                className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all opacity-0 group-hover:opacity-100 disabled:opacity-50"
                onClick={(e) => {
                  const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                  handleSave(subject, input.value);
                }}
                disabled={loading === subject}
              >
                {loading === subject ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
