'use client';

import React from 'react';
import { Download } from 'lucide-react';

export default function DownloadKHS({ studentName, semester }: { studentName: string, semester: number }) {
  const handleDownload = () => {
    alert(`Mempersiapkan unduhan KHS ${studentName} untuk Semester ${semester}...\n\n(Fitur ini akan menghasilkan PDF di versi produksi)`);
    // In a real app, this would trigger a server action that generates a PDF
  };

  return (
    <button 
      onClick={handleDownload}
      className="text-sm font-black text-blue-600 uppercase tracking-widest flex items-center gap-2 hover:bg-blue-50 px-4 py-2 rounded-xl transition-all"
    >
      <Download size={16} />
      Unduh KHS
    </button>
  );
}
