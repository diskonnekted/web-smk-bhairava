import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { notFound, redirect } from 'next/navigation';
import { BarChart2, CheckCircle, BookCopy, Briefcase, GraduationCap } from 'lucide-react';

async function getStudentDashboardData() {
  const session = await getSession();
  if (!session?.userId) redirect('/login');

  const student = await prisma.student.findFirst({
    where: { userId: session.userId },
    include: {
      major: true,
      grades: {
        orderBy: {
          semester: 'desc'
        }
      },
    },
  });

  if (!student) {
    notFound();
  }

  // Calculate average score for the latest semester
  const latestSemester = student.grades[0]?.semester || 1;
  const latestGrades = student.grades.filter(g => g.semester === latestSemester);
  const avgScore = latestGrades.length > 0
    ? (latestGrades.reduce((acc, g) => acc + g.score, 0) / latestGrades.length).toFixed(1)
    : 'N/A';

  return { student, latestGrades, avgScore };
}

export default async function PortalDashboardPage() {
  const { student, latestGrades, avgScore } = await getStudentDashboardData();

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div>
        <h1 className="text-4xl font-black text-white">Selamat Datang, {student.name.split(' ')[0]}!</h1>
        <p className="text-slate-400 text-lg font-medium">Ini adalah ringkasan progres akademik dan karir Anda.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Stats */}
        <div className="lg:col-span-2 space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
             <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700">
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Jurusan</p>
                <div className="flex items-center gap-3">
                   <div className="p-2 bg-blue-600 rounded-lg text-white"><GraduationCap size={16}/></div>
                   <p className="font-bold text-lg text-white">{student.major.name}</p>
                </div>
             </div>
             <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700">
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">IPK Semester Terakhir</p>
                <p className="font-black text-4xl text-emerald-400">{avgScore}</p>
             </div>
          </div>
          
          <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700">
             <h3 className="text-lg font-black text-white mb-6 flex items-center gap-2"><BarChart2 size={18}/> Nilai Semester Terakhir</h3>
             <div className="space-y-3">
                {latestGrades.length > 0 ? latestGrades.map(grade => (
                  <div key={grade.id} className="p-4 bg-slate-700/50 rounded-2xl flex justify-between items-center">
                     <span className="font-bold text-slate-300">{grade.subject}</span>
                     <span className={`font-black text-xl ${grade.score >= 75 ? 'text-white' : 'text-amber-400'}`}>{grade.score}</span>
                  </div>
                )) : (
                  <p className="text-center text-slate-400 font-bold py-8">Belum ada nilai yang diinput.</p>
                )}
             </div>
          </div>
        </div>

        {/* Side Panel - Quick Actions */}
        <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700 space-y-6">
           <h3 className="text-lg font-black text-white">Akses Cepat</h3>
           <Link href="#" className="flex items-center gap-4 p-5 bg-slate-700/50 rounded-2xl hover:bg-slate-700 transition-colors">
              <BookCopy size={20} className="text-blue-400"/>
              <span className="font-bold text-slate-200">Lihat Semua Nilai</span>
           </Link>
           <Link href="#" className="flex items-center gap-4 p-5 bg-slate-700/50 rounded-2xl hover:bg-slate-700 transition-colors">
              <Briefcase size={20} className="text-emerald-400"/>
              <span className="font-bold text-slate-200">Status & Laporan PKL</span>
           </Link>
           <Link href="#" className="flex items-center gap-4 p-5 bg-slate-700/50 rounded-2xl hover:bg-slate-700 transition-colors">
              <CheckCircle size={20} className="text-amber-400"/>
              <span className="font-bold text-slate-200">Sertifikasi Saya</span>
           </Link>
        </div>
      </div>
    </div>
  );
}
