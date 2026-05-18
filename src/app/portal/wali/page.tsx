import React from 'react';
import { 
  BookOpen, 
  Clock, 
  Calendar,
  CreditCard,
  UserCheck,
  MessageSquare,
  Bell,
  Heart
} from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { notFound, redirect } from 'next/navigation';
import CounselingBookingClient from '../siswa/CounselingBookingClient'; // Re-use client component from siswa portal

async function getWaliData() {
  const session = await getSession();
  if (!session?.userId) redirect('/login');

  // For this demo, we'll find a student linked to this user, 
  // or just the first student if it's a generic PARENT role for now.
  // In a real app, you'd have a parent-student relation.
  let student = await prisma.student.findFirst({
    where: { userId: session.userId },
    include: {
      major: true,
      grades: {
        orderBy: [{ academicYear: 'desc' }, { semester: 'desc' }]
      },
      attendance: {
        orderBy: { date: 'desc' } // Fetch all to calculate percentage
      },
      feePayments: {
        orderBy: { dueDate: 'asc' }
      },
      counselingSessions: {
        include: { teacher: true },
        orderBy: { date: 'desc' }
      }
    },
  });

  // Fallback: If no student linked via userId (e.g. parent has separate account), 
  // we fetch the first one for demonstration if user role is PARENT.
  // NOTE: This fallback needs to be replaced with actual parent-student linking logic in a real app.
  if (!student && session.role === 'PARENT') {
     student = await prisma.student.findFirst({
        include: {
          major: true,
          grades: { orderBy: [{ academicYear: 'desc' }, { semester: 'desc' }] },
          attendance: { orderBy: { date: 'desc' } },
          feePayments: { orderBy: { dueDate: 'asc' } },
          counselingSessions: { include: { teacher: true }, orderBy: { date: 'desc' } }
        }
     });
  }

  if (!student) {
    notFound();
  }

  const news = await prisma.news.findMany({
    where: { isDraft: false },
    take: 3,
    orderBy: { createdAt: 'desc' }
  });

  const events = await prisma.event.findMany({
    take: 5,
    orderBy: { startDate: 'asc' },
    where: { startDate: { gte: new Date() } }
  });

  const teachers = await prisma.teacher.findMany({
    select: { id: true, name: true }
  });

  // Calculate Attendance Percentage
  let attendancePercentage = 'N/A';
  if (student.attendance.length > 0) {
    const presentCount = student.attendance.filter(att => att.status === 'HADIR').length;
    attendancePercentage = ((presentCount / student.attendance.length) * 100).toFixed(0) + '%';
  }

  // Determine Fee Status
  let feeStatus = 'Lancar';
  const now = new Date();
  const pendingOverdueFees = student.feePayments.filter(
    fee => fee.status === 'PENDING' && fee.dueDate < now
  );
  if (pendingOverdueFees.length > 0) {
    feeStatus = 'Tunggakan';
  } else {
    const pendingFutureFees = student.feePayments.filter(fee => fee.status === 'PENDING');
    if (pendingFutureFees.length > 0) {
      feeStatus = 'Akan Datang';
    }
  }

  return { student, news, events, teachers, attendancePercentage, feeStatus };
}

export default async function WaliPortalPage() {
  const { student, news, events, teachers, attendancePercentage, feeStatus } = await getWaliData();

  return (
    <div className="space-y-8 pb-12">
      {/* Welcome Header */}
      <div className="bg-white p-8 md:p-12 rounded-[3rem] border border-slate-100 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
           <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-[2rem] flex items-center justify-center text-3xl font-black shadow-inner">
                {student.name.charAt(0)}
              </div>
              <div>
                <h1 className="text-3xl font-black text-slate-900">Monitoring Siswa</h1>
                <p className="text-slate-500 font-bold">Ananda: <span className="text-emerald-600">{student.name}</span></p>
                <p className="text-slate-400 text-sm font-black uppercase tracking-widest">{student.major.name}</p>
              </div>
           </div>
           <div className="flex gap-4">
              <div className="bg-slate-50 p-4 rounded-2xl text-center min-w-[120px]">
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Kehadiran</p>
                 <p className="text-2xl font-black text-slate-800">{attendancePercentage}</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl text-center min-w-[120px]">
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Status SPP</p>
                 <p className={`text-2xl font-black ${feeStatus === 'Lancar' ? 'text-emerald-500' : 'text-red-500'}`}>{feeStatus}</p>
              </div>
           </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Recent Attendance */}
          <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm">
             <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                  <UserCheck className="text-emerald-500" />
                  Laporan Presensi Ananda
                </h2>
                <button className="text-xs font-black text-emerald-600 uppercase tracking-widest hover:bg-emerald-50 px-4 py-2 rounded-xl transition-all">Lihat Semua</button>
             </div>
             <div className="grid md:grid-cols-2 gap-4">
                {student.attendance.length > 0 ? student.attendance.map((att, i) => (
                  <div key={i} className="flex justify-between items-center p-5 bg-slate-50 rounded-2xl border border-transparent hover:border-emerald-100 transition-all">
                     <div>
                        <p className="font-bold text-slate-700">{new Date(att.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                        <p className="text-xs text-slate-400 font-medium">{att.note || 'Hadir Tepat Waktu'}</p>
                     </div>
                     <span className={`px-3 py-1 rounded-lg text-[10px] font-black border
                       ${att.status === 'HADIR' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'}`}>
                       {att.status}
                     </span>
                  </div>
                )) : (
                  <p className="col-span-2 text-center py-10 text-slate-400 font-bold">Belum ada data presensi bulan ini.</p>
                )}
             </div>
          </div>

          {/* Academic Progress */}
          <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm">
             <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
               <BookOpen className="text-blue-600" />
               Perkembangan Akademik
             </h2>
             <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-slate-100">
                      <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Mata Pelajaran</th>
                      <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Semester</th>
                      <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Nilai Akhir</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {student.grades.map((g, i) => (
                      <tr key={i} className="group hover:bg-slate-50/50 transition-colors">
                        <td className="py-4 font-bold text-slate-700">{g.subject}</td>
                        <td className="py-4 text-center font-bold text-slate-400">{g.semester}</td>
                        <td className="py-4 text-center">
                           <span className={`font-black text-lg ${g.score >= 75 ? 'text-slate-800' : 'text-amber-500'}`}>{g.score}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
             </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* Financial Status */}
          <div className="bg-slate-900 text-white p-8 rounded-[3rem] shadow-xl border border-slate-800">
             <h2 className="text-xl font-black mb-6 flex items-center gap-3">
               <CreditCard className="text-emerald-400" />
               Administrasi & SPP
             </h2>
             <div className="space-y-4">
                {student.feePayments.map((fee, i) => (
                  <div key={i} className="p-5 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-all">
                     <div className="flex justify-between items-start mb-2">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tagihan {new Date(fee.dueDate).toLocaleDateString('id-ID', { month: 'long' })}</span>
                        <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase
                          ${fee.status === 'PAID' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                          {fee.status === 'PAID' ? 'LUNAS' : 'TUNGGAKAN'}
                        </span>
                     </div>
                     <p className="text-xl font-black">Rp {fee.amount.toLocaleString('id-ID')}</p>
                     <p className="text-[10px] text-slate-500 font-bold mt-1">Jatuh Tempo: {new Date(fee.dueDate).toLocaleDateString('id-ID')}</p>
                  </div>
                ))}
                <button className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-900/20">
                  Bayar Sekarang
                </button>
             </div>
          </div>

          {/* School Announcements */}
          <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm">
             <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
               <Bell className="text-amber-500" />
               Informasi Sekolah
             </h2>
             <div className="space-y-4">
                {news.map((item, i) => (
                  <div key={i} className="group cursor-pointer">
                     <p className="text-[10px] font-black text-amber-500 uppercase tracking-widest mb-1">{item.category}</p>
                     <h4 className="font-bold text-slate-700 leading-tight group-hover:text-amber-600 transition-colors">{item.title}</h4>
                     <p className="text-[10px] text-slate-400 mt-1">{new Date(item.createdAt).toLocaleDateString('id-ID')}</p>
                  </div>
                ))}
             </div>
          </div>

          {/* BK Counseling */}
          <div className="bg-blue-600 text-white p-8 rounded-[3rem] shadow-xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
             <h2 className="text-xl font-black mb-6 flex items-center gap-3 relative z-10">
               <Heart className="text-red-300" />
               Layanan Konseling
             </h2>
             <p className="text-sm font-medium text-blue-100 mb-6 relative z-10">
                Kami peduli dengan kesejahteraan psikologis dan akademik putra/putri Bapak/Ibu.
             </p>
             <CounselingBookingClient studentId={student.id} teachers={teachers} />
          </div>
        </div>
      </div>
    </div>
  );
}
