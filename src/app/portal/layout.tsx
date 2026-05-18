import React from 'react';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { User, BookOpen, BarChart2, Briefcase, Bell, LogOut, Settings } from 'lucide-react';
import Link from 'next/link';
import { logout } from '@/lib/actions/auth';

export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session || session.role !== 'STUDENT') {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <header className="fixed top-0 left-0 w-full bg-slate-900/80 backdrop-blur-lg z-50 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg">
               <User size={20} />
             </div>
             <div className="flex-1 min-w-0">
               <p className="text-sm font-black truncate">{session.name}</p>
               <p className="text-[9px] font-black text-blue-400 uppercase tracking-widest">Portal Siswa</p>
             </div>
          </div>
          <nav className="flex items-center gap-4">
             <Link href="/portal" className="p-3 bg-slate-800/50 rounded-xl hover:bg-slate-700 transition-colors"><BarChart2 size={18} /></Link>
             <Link href="#" className="p-3 bg-slate-800/50 rounded-xl hover:bg-slate-700 transition-colors"><Briefcase size={18} /></Link>
             <Link href="#" className="p-3 bg-slate-800/50 rounded-xl hover:bg-slate-700 transition-colors"><Bell size={18} /></Link>
             <form action={logout}>
                <button type="submit" className="p-3 bg-red-600/50 text-red-300 rounded-xl hover:bg-red-500 hover:text-white transition-colors"><LogOut size={18} /></button>
             </form>
          </nav>
        </div>
      </header>
      <main className="pt-28">
        <div className="p-6 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
