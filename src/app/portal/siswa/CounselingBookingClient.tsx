'use client';

import React, { useState } from 'react';
import Modal from '@/components/admin/Modal';
import CounselingBookingForm from './CounselingBookingForm';

interface Teacher {
  id: string;
  name: string;
}

export default function CounselingBookingClient({ 
  studentId, 
  teachers 
}: { 
  studentId: string; 
  teachers: Teacher[];
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="w-full py-4 bg-amber-500 text-slate-900 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-amber-400 transition-colors mt-4"
      >
        Booking Sesi Baru
      </button>

      <Modal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
        title="Booking Konseling BK"
      >
        <CounselingBookingForm 
          studentId={studentId} 
          teachers={teachers} 
          onSuccess={() => setIsOpen(false)}
        />
      </Modal>
    </>
  );
}
