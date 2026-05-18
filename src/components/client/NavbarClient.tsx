'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown, GraduationCap, Network, Calculator, Megaphone, Brain, Database, Code, Cpu, LucideIcon } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const iconMap: Record<string, LucideIcon> = {
  Network,
  Calculator,
  Megaphone,
  Brain,
  Database,
  Code,
  Cpu,
  GraduationCap // Add GraduationCap to iconMap
};

interface MajorItem {
  id: string;
  name: string;
  icon: string;
}

export default function Navbar({ majors }: { majors: MajorItem[] }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={cn(
        "fixed top-0 w-full z-[9999] transition-all duration-300 px-6 py-4",
        isScrolled ? "bg-white shadow-2xl" : "bg-white/95 backdrop-blur-md border-b-2 border-blue-100"
      )}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3 shrink-0 no-underline">
          <Image src="/logo-smk-bhairava.png" alt="Logo" width={40} height={40} className="rounded-lg shadow-sm" />
          <span className="text-2xl font-black text-slate-900 tracking-tighter">
            SMK<span className="text-blue-600">BHAIRAVA</span>
          </span>
        </Link>

        {/* NAV LINKS - DESKTOP */}
        <div className="hidden md:flex items-center gap-1">
          
          <details className="relative group">
            <summary className="list-none cursor-pointer flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-slate-600 hover:text-blue-600 hover:bg-slate-50 transition-all">
              Kompetensi
              <ChevronDown size={16} className="group-open:rotate-180 transition-transform text-slate-400 group-hover:text-blue-600" />
            </summary>
            
            <div className="absolute top-full left-0 w-80 bg-white rounded-[2rem] shadow-[0_25px_60px_rgba(0,0,0,0.15)] border border-slate-100 p-3 mt-4 animate-in fade-in slide-in-from-top-2 z-[10000]">
              <div className="grid gap-1">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-5 py-3 border-b border-slate-50 mb-2">Program Keahlian</p>
                {majors.map((major) => (
                  <Link 
                    key={major.id}
                    href={`/majors/${major.id}`}
                    className="flex items-center gap-4 p-4 rounded-2xl hover:bg-blue-50 transition-all group/item no-underline text-slate-700 hover:text-blue-600"
                    onClick={(e) => {
                       const details = e.currentTarget.closest('details');
                       if (details) details.removeAttribute('open');
                    }}
                  >
                    <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover/item:bg-white group-hover/item:text-blue-600 transition-colors shadow-sm">
                      {React.createElement(iconMap[major.icon] || GraduationCap, { size: 18 })}
                    </div>
                    <span className="font-bold text-sm leading-tight">{major.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </details>

          <Link href="/news" className="px-4 py-2 font-bold text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded-xl no-underline transition-all">Berita</Link>
          <Link href="/info" className="px-4 py-2 font-bold text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded-xl no-underline transition-all">Informasi</Link>
          <Link href="/alumni" className="px-4 py-2 font-bold text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded-xl no-underline transition-all">Alumni</Link>
          <Link href="/about" className="px-4 py-2 font-bold text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded-xl no-underline transition-all">Tentang</Link>
          <Link href="/contact" className="px-4 py-2 font-bold text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded-xl no-underline transition-all">Hubungi Kami</Link>
        </div>

        {/* MOBILE TRIGGER */}
        <button className="md:hidden p-3 text-slate-900 bg-slate-100 rounded-2xl">
           <span className="font-black text-xs">MENU</span>
        </button>
      </div>
    </nav>
  );
}
