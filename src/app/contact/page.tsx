import React from 'react';
import Navbar from '@/components/Navbar';
import { Mail, Phone, MapPin, Send, MessageCircle, Share2, Globe } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <section className="pt-40 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-start">
            <div>
              <h1 className="text-6xl font-black text-slate-900 mb-8 leading-tight">Mari Bicara <br />Masa <span className="text-blue-600">Depan.</span></h1>
              <p className="text-xl text-slate-500 mb-12 max-w-md">
                Punya pertanyaan tentang pendaftaran atau ingin bekerjasama dengan kami? Jangan ragu untuk menghubungi tim kami.
              </p>

              <div className="space-y-8">
                <div className="flex gap-6 items-center">
                  <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 flex-shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Email Kami</h4>
                    <p className="text-xl font-bold text-slate-800">info@bhairava.sch.id</p>
                  </div>
                </div>
                <div className="flex gap-6 items-center">
                  <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 flex-shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Telepon</h4>
                    <p className="text-xl font-bold text-slate-800">(021) 1234-5678</p>
                  </div>
                </div>
                <div className="flex gap-6 items-center">
                  <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 flex-shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Lokasi</h4>
                    <p className="text-xl font-bold text-slate-800">Jakarta Selatan, Indonesia</p>
                  </div>
                </div>
              </div>

              <div className="mt-16 pt-12 border-t border-slate-100">
                <h4 className="font-bold text-slate-900 mb-6">Media Sosial</h4>
                <div className="flex gap-4">
                  <button className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600 hover:bg-blue-600 hover:text-white transition-all">
                    <MessageCircle size={20} />
                  </button>
                  <button className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600 hover:bg-blue-400 hover:text-white transition-all">
                    <Share2 size={20} />
                  </button>
                  <button className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600 hover:bg-blue-800 hover:text-white transition-all">
                    <Globe size={20} />
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-8 md:p-12 rounded-[3rem] border border-slate-100">
              <h3 className="text-3xl font-bold text-slate-900 mb-8">Kirim Pesan</h3>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Nama Lengkap</label>
                    <input type="text" className="w-full px-6 py-4 rounded-2xl bg-white border-transparent focus:ring-4 focus:ring-blue-100 outline-none transition-all shadow-sm" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Email</label>
                    <input type="email" className="w-full px-6 py-4 rounded-2xl bg-white border-transparent focus:ring-4 focus:ring-blue-100 outline-none transition-all shadow-sm" placeholder="john@example.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Subjek</label>
                  <input type="text" className="w-full px-6 py-4 rounded-2xl bg-white border-transparent focus:ring-4 focus:ring-blue-100 outline-none transition-all shadow-sm" placeholder="Informasi Pendaftaran" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Pesan</label>
                  <textarea rows={5} className="w-full px-6 py-4 rounded-2xl bg-white border-transparent focus:ring-4 focus:ring-blue-100 outline-none transition-all shadow-sm" placeholder="Tuliskan pesan Anda di sini..."></textarea>
                </div>
                <button className="w-full bg-slate-900 text-white py-5 rounded-2xl font-bold text-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-2 group">
                  Kirim Pesan Sekarang
                  <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map placeholder */}
      <section className="h-[400px] bg-slate-200 grayscale opacity-60">
        <div className="w-full h-full flex items-center justify-center text-slate-400 font-bold">
          [ Interactive Map Placeholder ]
        </div>
      </section>

      <footer className="bg-slate-900 text-white py-12 px-6 text-center">
        <p className="text-slate-500 text-sm">© 2026 SMK BHAIRAVA. All rights reserved.</p>
      </footer>
    </div>
  );
}
