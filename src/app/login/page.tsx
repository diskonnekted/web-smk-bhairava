'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ShieldCheck, User, Lock, ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        {/* Logo Section */}
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center gap-3 mb-6 group no-underline">
            <div className="p-3 bg-white rounded-2xl shadow-xl group-hover:scale-110 transition-transform">
              <Image src="/logo-smk-bhairava.png" alt="Logo" width={40} height={40} />
            </div>
            <span className="text-3xl font-black text-slate-900 tracking-tighter">
              SMK<span className="text-blue-600">BHAIRAVA</span>
            </span>
          </Link>
          <h1 className="text-2xl font-black text-slate-800">Control Center Login</h1>
          <p className="text-slate-500 font-medium">Masuk untuk mengelola sistem sekolah</p>
        </div>

        {/* Login Card */}
        <div className="bg-white p-10 rounded-[3rem] shadow-2xl shadow-slate-200 border border-slate-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -mr-16 -mt-16 blur-3xl opacity-50" />
          
          {/* NATIVE FORM POST: Works even if JS fails or WebSocket fails */}
          <form action="/api/auth/login" method="POST" className="space-y-6 relative z-10" onSubmit={() => setLoading(true)}>
            
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Username Pengguna</label>
              <div className="relative">
                <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                  required
                  name="username"
                  type="text"
                  autoComplete="username"
                  placeholder="admin"
                  className="w-full pl-14 pr-6 py-5 bg-slate-50 border-2 border-transparent focus:bg-white focus:border-blue-500 rounded-[1.5rem] outline-none font-bold text-slate-700 transition-all shadow-inner"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Kata Sandi</label>
              <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                  required
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="w-full pl-14 pr-6 py-5 bg-slate-50 border-2 border-transparent focus:bg-white focus:border-blue-500 rounded-[1.5rem] outline-none font-bold text-slate-700 transition-all shadow-inner"
                />
              </div>
            </div>

            <button
              disabled={loading}
              type="submit"
              className="w-full bg-slate-900 text-white py-5 rounded-[1.5rem] font-black text-lg hover:bg-blue-600 transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-3 group disabled:opacity-70"
            >
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <>
                  Masuk Sekarang
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>
        
        <div className="text-center mt-8">
           <p className="text-slate-400 text-xs font-bold italic">
             Jika tombol tidak bereaksi, silakan tekan Ctrl+F5 untuk membersihkan cache browser Anda.
           </p>
        </div>
      </div>
    </div>
  );
}
