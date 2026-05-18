'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  Newspaper, 
  GraduationCap, 
  Calendar,
  BookOpen,
  Briefcase,
  ShieldCheck,
  Settings, 
  LogOut,
  User as UserIcon,
  Image as ImageIcon,
  BarChart3,
  Key
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { logout } from '@/lib/actions/auth';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const menuItems = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Siswa & User', href: '/admin/students', icon: Users, roles: ['ADMIN', 'TEACHER'] },
  { name: 'Berita & AI CMS', href: '/admin/news', icon: Newspaper, roles: ['ADMIN'] },
  { name: 'Media Library', href: '/admin/media', icon: ImageIcon, roles: ['ADMIN'] },
  { name: 'Jurusan & Lab', href: '/admin/majors', icon: GraduationCap, roles: ['ADMIN'] },
  { name: 'Kalender & Agenda', href: '/admin/calendar', icon: Calendar, roles: ['ADMIN', 'TEACHER'] },
  { name: 'Kurikulum & Proyek', href: '/admin/academic', icon: BookOpen, roles: ['ADMIN', 'TEACHER'] },
  { name: 'PKL & Industri', href: '/admin/pkl', icon: Briefcase, roles: ['ADMIN', 'TEACHER'] },
  { name: 'Keamanan (RBAC)', href: '/admin/rbac', icon: ShieldCheck, roles: ['ADMIN'] },
];

export default function Sidebar({ user }: { user?: any }) {
  const pathname = usePathname();
  const userRole = user?.role;

  return (
    <div className="flex flex-col h-screen w-72 bg-slate-900 text-white fixed left-0 top-0 border-r border-slate-800 z-50 overflow-y-auto">
      <div className="p-8">
        <h1 className="text-2xl font-black bg-gradient-to-r from-blue-400 via-emerald-400 to-blue-400 bg-clip-text text-transparent animate-gradient-x">
          SMK BHAIRAVA
        </h1>
        <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 mt-2 font-bold">Industry Ready Panel</p>
      </div>

      {/* User Info Section */}
      <div className="px-6 mb-6">
        <div className="p-4 bg-slate-800/50 rounded-3xl border border-slate-700/50 flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg">
            <UserIcon size={20} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-black truncate">{user?.name || 'User'}</p>
            <p className="text-[9px] font-black text-blue-400 uppercase tracking-widest">{userRole || 'GUEST'}</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 py-2 space-y-1">
        {menuItems.map((item) => {
          // Hide item if it's not for the current user's role
          if (item.roles && !item.roles.includes(userRole)) return null;

          const Icon = item.icon;
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-5 py-3.5 rounded-2xl transition-all duration-300 group relative overflow-hidden",
                isActive 
                  ? "bg-blue-600 text-white shadow-xl shadow-blue-900/40" 
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              )}
            >
              {isActive && (
                <div className="absolute left-0 top-0 w-1 h-full bg-white rounded-r-full" />
              )}
              <Icon size={20} className={cn(
                "transition-all duration-300",
                isActive ? "scale-110 text-white" : "group-hover:text-blue-400 group-hover:rotate-6"
              )} />
              <span className="font-semibold text-sm">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-6 mt-auto border-t border-slate-800 space-y-2">
        <button className="flex items-center gap-3 px-5 py-3 w-full text-slate-400 hover:text-white hover:bg-slate-800 rounded-2xl transition-all font-semibold text-sm">
          <Settings size={18} />
          <span>Pengaturan Sistem</span>
        </button>
        <form action={logout}>
          <button
            type="submit"
            className="flex items-center gap-3 px-5 py-3 w-full text-red-400 hover:text-white hover:bg-red-600 rounded-2xl transition-all font-semibold text-sm"
          >
            <LogOut size={18} />
            <span>Keluar Sesi</span>
          </button>
        </form>
      </div>
    </div>
  );
}
