import React from 'react';
import { 
  BookOpen, 
  Clock, 
  UploadCloud,
  Calendar,
  CreditCard,
  UserCheck,
  MessageSquare,
  Bell
} from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { notFound, redirect } from 'next/navigation';
import ProjectForm from './ProjectForm'; // Assuming ProjectForm will be created/exists
import CounselingBookingClient from './CounselingBookingClient';
import DownloadKHS from './DownloadKHS';

async function getStudentData() {
  const session = await getSession();
  if (!session?.userId) redirect('/login');

  const student = await prisma.student.findFirst({
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

  // Calculate GPA (average of all grades for simplicity)
  const gpa = student.grades.length > 0
    ? (student.grades.reduce((acc, g) => acc + g.score, 0) / student.grades.length / 25).toFixed(2)
    : '0.00';

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


  return { student, news, events, gpa, teachers, attendancePercentage, feeStatus };
}

export default async function SiswaPortalPage() {
  const { student, news, events, gpa, teachers, attendancePercentage, feeStatus } = await getStudentData();

  return (
    <div className="space-y-8 pb-12">
      {/* Header Profile */}
      <div className="bg-slate-900 rounded-[3rem] p-8 md:p-12 text-white relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-8 shadow-2xl border border-slate-800">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
        <div className="relative z-10 flex items-center gap-6 w-full">
          <div className="w-24 h-24 bg-blue-600 rounded-[2rem] flex items-center justify-center text-4xl font-black shadow-lg border-4 border-slate-800">
            {student.name.charAt(0)}
          </div>
          <div>
            <h1 className="text-3xl font-black mb-2">{student.name}</h1>
            <p className="text-slate-400 font-bold mb-1">NIS: {student.nis}</p>
            <p className="text-blue-400 font-black text-sm uppercase tracking-widest">{student.major.name}</p>
          </div>
        </div>
        <div className="bg-white/5 backdrop-blur-md p-6 rounded-3xl w-full md:w-auto min-w-[200px] border border-white/10 text-center relative z-10">
           <p className="text-slate-400 font-black uppercase tracking-widest text-xs mb-2">Indeks Prestasi</p>
           <p className="text-5xl font-black text-white">{gpa}</p>
           <p className="text-emerald-400 text-sm font-bold mt-2">↑ Top 5% Cohort</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column: Academic & Status */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-3">
                   <UserCheck size={20} />
                </div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Kehadiran</p>
                <p className="text-xl font-black text-slate-800">{attendancePercentage}</p>
             </div>
             <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-3">
                   <CreditCard size={20} />
                </div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Status SPP</p>
                <p className={`text-xl font-black ${feeStatus === 'Lancar' ? 'text-emerald-500' : 'text-red-500'}`}>{feeStatus}</p>
             </div>
             <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center mb-3">
                   <Calendar size={20} />
                </div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sertifikat</p>
                <p className="text-xl font-black text-slate-800">12</p>
             </div>
             <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-3">
                   <Clock size={20} />
                </div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Point</p>
                <p className="text-xl font-black text-slate-800">0</p>
             </div>
          </div>

          {/* Academic Records */}
          <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                <BookOpen className="text-indigo-600" />
                Nilai Akademik
              </h2>
              <DownloadKHS studentName={student.name} semester={student.grades[0]?.semester || 1} />
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50 border-b border-slate-100 rounded-t-xl">
                  <tr>
                    <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Mata Pelajaran</th>
                    <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest text-center">Semester</th>
                    <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest text-center">Nilai</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {student.grades.length > 0 ? student.grades.map((g, i) => (
                    <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-5 font-bold text-slate-700">{g.subject}</td>
                      <td className="px-6 py-5 text-center font-bold text-slate-500">{g.semester}</td>
                      <td className="px-6 py-5 text-center">
                        <span className={`inline-block px-4 py-1 rounded-lg text-sm font-black border
                          ${g.score >= 80 ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-blue-50 text-blue-600 border-blue-100'}`}>
                          {g.score}
                        </span>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={3} className="px-6 py-10 text-center text-slate-400 font-bold">Belum ada data nilai tersedia.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Attendance & Fees Grid */}
          <div className="grid md:grid-cols-2 gap-8">
             {/* Attendance Section */}
             <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm">
                <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
                  <UserCheck className="text-emerald-500" />
                  Presensi Terakhir
                </h2>
                <div className="space-y-4">
                  {student.attendance.length > 0 ? student.attendance.map((att, i) => (
                    <div key={i} className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl">
                       <div>
                          <p className="font-bold text-slate-700">{new Date(att.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long' })}</p>
                          <p className="text-xs text-slate-400 font-medium">{att.note || 'Hadir Tepat Waktu'}</p>
                       </div>
                       <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border
                         ${att.status === 'HADIR' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'}`}>
                         {att.status}
                       </span>
                    </div>
                  )) : (
                    <p className="text-slate-400 font-bold text-center py-4">Tidak ada data presensi.</p>
                  )}
                </div>
             </div>

             {/* Fees Section */}
             <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm">
                <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
                  <CreditCard className="text-blue-500" />
                  Tagihan SPP
                </h2>
                <div className="space-y-4">
                  {student.feePayments.length > 0 ? student.feePayments.map((fee, i) => (
                    <div key={i} className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl">
                       <div>
                          <p className="font-bold text-slate-700">Rp {fee.amount.toLocaleString('id-ID')}</p>
                          <p className="text-xs text-slate-400 font-medium">Jatuh Tempo: {new Date(fee.dueDate).toLocaleDateString('id-ID')}</p>
                       </div>
                       <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border
                         ${fee.status === 'PAID' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-red-50 text-red-600 border-red-100'}`}>
                         {fee.status === 'PAID' ? 'LUNAS' : 'BELUM'}
                       </span>
                    </div>
                  )) : (
                    <p className="text-slate-400 font-bold text-center py-4">Semua tagihan lunas.</p>
                  )}
                </div>
             </div>
          </div>
        </div>

        {/* Right Column: Schedule & News */}
        <div className="space-y-8">
          {/* Announcements / News */}
          <div className="bg-indigo-600 text-white p-8 rounded-[3rem] shadow-xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-2xl"></div>
            <h2 className="text-xl font-black mb-6 flex items-center gap-3 relative z-10">
              <Bell className="text-white" />
              Pengumuman Terbaru
            </h2>
            <div className="space-y-4 relative z-10">
              {news.map((item, i) => (
                <div key={i} className="bg-white/10 backdrop-blur-sm border border-white/10 p-5 rounded-2xl hover:bg-white/20 transition-all cursor-pointer">
                  <p className="text-[10px] font-black text-indigo-200 uppercase tracking-widest mb-2">{item.category}</p>
                  <h3 className="font-bold leading-tight mb-2">{item.title}</h3>
                  <p className="text-[10px] text-white/60 font-medium">{new Date(item.createdAt).toLocaleDateString('id-ID')}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Schedule / Events */}
          <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm">
            <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
              <Calendar className="text-blue-600" />
              Agenda Mendatang
            </h2>
            <div className="space-y-4">
              {events.length > 0 ? events.map((event, i) => (
                <div key={i} className="flex gap-4 items-start p-4 hover:bg-slate-50 rounded-2xl transition-colors">
                   <div className="bg-blue-50 text-blue-600 p-3 rounded-xl flex flex-col items-center min-w-[50px]">
                      <span className="text-[10px] font-black uppercase">{new Date(event.startDate).toLocaleDateString('id-ID', { month: 'short' })}</span>
                      <span className="text-xl font-black">{new Date(event.startDate).getDate()}</span>
                   </div>
                   <div>
                      <h4 className="font-bold text-slate-700 leading-tight">{event.title}</h4>
                      <p className="text-xs text-slate-400 font-medium mt-1">{event.location || 'Sekolah'}</p>
                   </div>
                </div>
              )) : (
                <p className="text-slate-400 font-bold text-center py-4">Tidak ada agenda dekat.</p>
              )}
            </div>
          </div>

          {/* Counseling Booking */}
          <div className="bg-slate-900 text-white p-8 rounded-[3rem] border border-slate-800 shadow-xl">
            <h2 className="text-xl font-black mb-6 flex items-center gap-3">
              <MessageSquare className="text-amber-400" />
              Bimbingan Konseling
            </h2>
            <p className="text-sm text-slate-400 font-medium mb-6">Butuh konsultasi akademik atau pengembangan diri? Hubungi Guru BK Anda.</p>
            <div className="space-y-3">
              {student.counselingSessions.slice(0, 2).map((session, i) => (
                <div key={i} className="p-4 bg-white/5 border border-white/5 rounded-2xl">
                   <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest">{session.status}</span>
                      <span className="text-[10px] text-slate-500">{new Date(session.date).toLocaleDateString()}</span>
                   </div>
                   <p className="font-bold text-sm">{session.topic}</p>
                   <p className="text-xs text-slate-400 mt-1">Guru: {session.teacher.name}</p>
                </div>
              ))}
              <CounselingBookingClient studentId={student.id} teachers={teachers} />
            </div>
          </div>
          
          {/* Submit Project Form */}
          <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm">
            <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
              <UploadCloud className="text-blue-600" />
              Kirim Karya
            </h2>
            <ProjectForm />
          </div>
        </div>
      </div>
    </div>
  );
}