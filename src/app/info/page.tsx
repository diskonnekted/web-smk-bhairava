import React from 'react';
import Navbar from '@/components/Navbar';
import PageHero from '@/components/PageHero';
import Image from 'next/image';
import Link from 'next/link';
import { 
  BarChart2, 
  Calendar, 
  Bell, 
  MessageSquare, 
  ArrowRight,
  Info,
  CreditCard,
  UserCheck,
  ShieldCheck,
  Briefcase,
  Network
} from 'lucide-react';

export default function InfoPublicPage() {
  const features = [
    {
      title: 'Portal Nilai & KHS',
      description: 'Pantau kemajuan akademik siswa secara real-time. Unduh KHS digital kapan saja.',
      icon: <BarChart2 className="text-blue-500" />,
      link: '/portal',
      badge: 'Siswa & Wali'
    },
    {
      title: 'Presensi Kehadiran',
      description: 'Laporan kehadiran harian yang transparan dan otomatis terintegrasi ke orang tua.',
      icon: <UserCheck className="text-emerald-500" />,
      link: '/portal',
      badge: 'Monitoring'
    },
    {
      title: 'Administrasi & SPP',
      description: 'Informasi tagihan dan riwayat pembayaran sekolah yang praktis dan akurat.',
      icon: <CreditCard className="text-amber-500" />,
      link: '/portal',
      badge: 'Keuangan'
    },
    {
      title: 'Bimbingan Konseling',
      description: 'Layanan konsultasi psikologis dan akademik melalui sistem booking yang privat.',
      icon: <MessageSquare className="text-indigo-500" />,
      link: '/portal',
      badge: 'Layanan'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <PageHero
        title="Transparansi <br />& Engagement"
        subtitle="Membangun ekosistem pendidikan digital yang terbuka, akuntabel, dan memudahkan interaksi antara sekolah, siswa, serta orang tua."
        bgImage="/robotic.jpeg"
        badge="Informasi & Layanan"
      />

      {/* Info Sections */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <div key={i} className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/50 hover:border-blue-200 transition-all group">
              <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {f.icon}
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full mb-4 inline-block">
                {f.badge}
              </span>
              <h3 className="text-2xl font-black text-slate-900 mb-3">{f.title}</h3>
              <p className="text-slate-500 font-bold text-sm leading-relaxed mb-6">{f.description}</p>
              <Link href={f.link} className="text-sm font-black text-slate-900 flex items-center gap-2 hover:text-blue-600 transition-colors">
                Selengkapnya <ArrowRight size={16} />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Public Pages Links */}
      <section className="bg-slate-50 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:grid-cols-3 gap-8">
             <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
              <div className="max-w-2xl">
                <h2 className="text-4xl font-black text-slate-900 mb-4">Informasi Publik</h2>
                <p className="text-slate-500 font-bold">Akses cepat ke informasi umum sekolah yang dapat diakses tanpa login.</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Link href="/info/jadwal" className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all">
                <Calendar className="text-amber-500 mb-6" size={40} />
                <h3 className="text-2xl font-black text-slate-900 mb-4">Jadwal Sekolah</h3>
                <p className="text-slate-500 font-bold text-sm mb-6">Kalender akademik, jadwal ujian, dan agenda kegiatan sekolah setahun penuh.</p>
                <span className="text-blue-600 font-black text-xs uppercase tracking-widest flex items-center gap-2">Buka Halaman <ArrowRight size={14}/></span>
              </Link>

              <Link href="/info/pengumuman" className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all">
                <Bell className="text-red-500 mb-6" size={40} />
                <h3 className="text-2xl font-black text-slate-900 mb-4">Pengumuman Resmi</h3>
                <p className="text-slate-500 font-bold text-sm mb-6">Informasi terbaru, kebijakan sekolah, dan berita mendesak untuk publik.</p>
                <span className="text-blue-600 font-black text-xs uppercase tracking-widest flex items-center gap-2">Buka Halaman <ArrowRight size={14}/></span>
              </Link>

              <Link href="/info/faq" className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all">
                <Info className="text-blue-500 mb-6" size={40} />
                <h3 className="text-2xl font-black text-slate-900 mb-4">Panduan Portal</h3>
                <p className="text-slate-500 font-bold text-sm mb-6">Tanya jawab seputar penggunaan portal siswa dan wali untuk pengguna baru.</p>
                <span className="text-blue-600 font-black text-xs uppercase tracking-widest flex items-center gap-2">Buka Halaman <ArrowRight size={14}/></span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 text-center">
        <div className="max-w-4xl mx-auto bg-blue-600 rounded-[4rem] p-12 md:p-20 relative overflow-hidden shadow-2xl shadow-blue-200">
           <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
           <h2 className="text-4xl md:text-5xl font-black text-white mb-8 relative z-10">Siap untuk Memulai Masa Depan?</h2>
           <p className="text-blue-100 text-lg font-medium mb-12 relative z-10">Dapatkan akses penuh ke seluruh layanan pendidikan digital kami sekarang.</p>
           <div className="flex flex-wrap justify-center gap-4 relative z-10">
              <Link href="/login" className="px-10 py-5 bg-white text-blue-600 rounded-3xl font-black text-xl hover:scale-105 transition-all shadow-xl">
                Login ke Portal
              </Link>
              <Link href="/contact" className="px-10 py-5 bg-blue-700 text-white rounded-3xl font-black text-xl hover:bg-blue-800 transition-all">
                Hubungi Admin
              </Link>
           </div>
        </div>
      </section>

      {/* Footer - Consistent Brand */}
      <footer className="bg-slate-900 text-white pt-32 pb-12 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-16 mb-24">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-4 mb-8">
              <Image src="/logo-smk-bhairava.png" alt="Logo" width={60} height={60} className="rounded-2xl brightness-110 shadow-2xl" />
              <h2 className="text-4xl font-black tracking-tighter">SMK<span className="text-blue-400 italic">BHAIRAVA</span></h2>
            </div>
            <p className="text-slate-400 text-lg leading-relaxed max-w-md mb-10">
              Transformasi pendidikan vokasi melalui teknologi cerdas dan kolaborasi industri global.
            </p>
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-blue-600 transition-all cursor-pointer"><ShieldCheck size={20} /></div>
              <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-blue-600 transition-all cursor-pointer"><Briefcase size={20} /></div>
              <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-blue-600 transition-all cursor-pointer"><Network size={20} /></div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-black text-sm uppercase tracking-[0.2em] text-slate-500 mb-8">Portal</h4>
            <ul className="space-y-4 font-bold text-slate-400">
              <li><Link href="/admin" className="hover:text-white transition-colors">Portal Admin</Link></li>
              <li><Link href="/portal/guru" className="hover:text-white transition-colors">Portal Guru</Link></li>
              <li><Link href="/portal/wali" className="hover:text-white transition-colors">Portal Wali Siswa</Link></li>
              <li><Link href="/portal/siswa" className="hover:text-white transition-colors">Portal Siswa</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-black text-sm uppercase tracking-[0.2em] text-slate-500 mb-8">Resources</h4>
            <ul className="space-y-4 font-bold text-slate-400">
              <li className="hover:text-white cursor-pointer transition-colors">Digital Library</li>
              <li className="hover:text-white cursor-pointer transition-colors">LMS Login</li>
              <li className="hover:text-white cursor-pointer transition-colors">PKL Portal</li>
              <li className="hover:text-white cursor-pointer transition-colors">Career Hub</li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="font-black text-sm uppercase tracking-[0.2em] text-slate-500 mb-8">Visit Us</h4>
            <p className="text-slate-400 font-bold leading-relaxed mb-6">
              Jl. Teknologi Masa Depan No. 404<br />
              Jakarta Selatan, Indonesia
            </p>
            <p className="text-blue-400 font-black">info@bhairava.sch.id</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto border-t border-white/5 pt-12 flex flex-col md:row justify-between items-center gap-6">
          <p className="text-slate-600 text-xs font-black uppercase tracking-widest">© 2026 SMK BHAIRAVA. All rights reserved.</p>
          <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-slate-600">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </footer>
    </div>

  );
}
