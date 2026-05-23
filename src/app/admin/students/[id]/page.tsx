import React from 'react';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { User, Mail, Phone, MapPin, GraduationCap, Building, Calendar, CheckCircle, BarChart2 } from 'lucide-react';
import Image from 'next/image';
import GradeManager from '@/components/admin/GradeManager';
import { getSession } from '@/lib/auth';

async function getStudentData(id: string) {
  const student = await prisma.student.findUnique({
    where: { id },
    include: {
      major: true,
      internships: true,
      grades: true,
    }
  });
  return student;
}

// Find teacher record based on logged-in user's ID
async function getTeacherFromSession(userId: string | undefined) {
  if (!userId) return null;
  return await prisma.teacher.findUnique({ where: { userId }});
}

export default async function StudentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [student, session] = await Promise.all([
    getStudentData(id),
    getSession()
  ]);

  if (!student) {
    notFound();
  }

  const teacher = await getTeacherFromSession(session?.userId);
  const userRole = session?.role;

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="w-full md:w-1/3">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8">
            <div className="w-32 h-32 bg-slate-100 rounded-full mx-auto mb-6 flex items-center justify-center border-4 border-white shadow-md">
              <span className="text-5xl font-black text-slate-400">{getInitials(student.name)}</span>
            </div>
            <div className="text-center">
              <h1 className="text-2xl font-black text-slate-900">{student.name}</h1>
              <p className="text-slate-500 font-medium">NIS: {student.nis} / NISN: {student.nisn || '-'}</p>
              <div className="mt-4 inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-xs font-black">
                <GraduationCap size={14} />
                {student.major.name}
              </div>
            </div>
          </div>
        </div>
        
        <div className="w-full md:w-2/3">
           <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Data Pribadi</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3"><User size={16} className="text-slate-400 mt-1" /><span className="font-bold text-slate-700">{student.gender === 'L' ? 'Laki-laki' : 'Perempuan'}</span></div>
                  <div className="flex items-start gap-3"><CheckCircle size={16} className="text-slate-400 mt-1" /><span className="font-bold text-slate-700">{student.religion}</span></div>
                  <div className="flex items-start gap-3"><Calendar size={16} className="text-slate-400 mt-1" /><span className="font-bold text-slate-700">{student.placeOfBirth}, {student.dateOfBirth?.toLocaleDateString('id-ID')}</span></div>
                </div>
              </div>
               <div>
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Kontak & Alamat</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3"><Phone size={16} className="text-slate-400 mt-1" /><span className="font-bold text-slate-700">{student.phone || 'No. HP belum diisi'}</span></div>
                  <div className="flex items-start gap-3"><MapPin size={16} className="text-slate-400 mt-1" /><span className="font-bold text-slate-700">{student.address}</span></div>
                </div>
              </div>
           </div>
        </div>
      </div>

      {/* Academic & Internship History */}
      <div className="grid lg:grid-cols-2 gap-8">
        { (userRole === 'ADMIN' || userRole === 'TEACHER') && teacher ? (
          <GradeManager student={student} teacher={teacher} grades={student.grades} />
        ) : (
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8">
            <h3 className="text-lg font-black text-slate-800 mb-6">Riwayat Akademik</h3>
            <p className="text-sm text-slate-500">Hanya Admin atau Guru yang dapat mengelola nilai.</p>
          </div>
        )}
        
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8">
          <h3 className="text-lg font-black text-slate-800 mb-6 flex items-center gap-2"><Building size={18} className="text-emerald-600" /> Riwayat PKL / Industri</h3>
          <div className="space-y-4">
            {student.internships.length > 0 ? student.internships.map(intern => (
              <div key={intern.id} className="p-5 bg-emerald-50 rounded-2xl border border-emerald-100">
                <p className="font-black text-emerald-800">{intern.companyName}</p>
                <div className="flex justify-between items-center mt-2">
                   <span className="text-xs font-bold text-emerald-600">{intern.startDate.getFullYear()}</span>
                   <span className="px-3 py-1 bg-emerald-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest">{intern.status}</span>
                </div>
              </div>
            )) : (
              <div className="text-center py-10">
                 <p className="text-slate-400 font-bold">Belum ada riwayat PKL.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
