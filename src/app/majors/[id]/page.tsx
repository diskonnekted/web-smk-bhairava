import React from 'react';
import Navbar from '@/components/Navbar';
import PageHero from '@/components/PageHero';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ArrowRight, 
  Code, 
  Cpu, 
  Database, 
  Layout, 
  ShieldCheck, 
  Briefcase, 
  Network,
  Zap,
  Star,
  Monitor,
  Settings,
  Power,
  Terminal,
  Award
} from 'lucide-react';

export default async function MajorDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  // Mapping hash ID ke slug nama agar URL tetap bisa diakses meskipun via ID
  const hashToSlug: Record<string, string> = {
    'cmpako90d000av6p84stmo94g': 'teknik-jaringan-komputer-dan-telekomunikasi',
    'cmpako90d000bv6p8nzy0lxqe': 'akuntansi-dan-keuangan-lembaga',
    'cmpako90d000cv6p8vnb4x8x7': 'pengembangan-perangkat-lunak-dan-gim',
    'cmpako90d000dv6p8so4l2akg': 'teknik-mekatronika-dan-robotika',
    'cmpako90d000ev6p8g8rfnb68': 'ai-dan-machine-learning',
    'cmpako90d000fv6p8shs0ef3n': 'big-data-analytics'
  };

  const lookupId = hashToSlug[id] || id;

  const major = await prisma.major.findFirst({
    where: {
      OR: [
        { id: id },
        { name: lookupId.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') }
      ]
    }
  });

  const majorName = major ? major.name : lookupId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  const portfolioData: Record<string, typeof portfolioItems> = {
    'Teknik Jaringan Komputer dan Telekomunikasi': [
      { title: 'Infrastruktur Fiber Optic', img: '/programming 2.jpeg', author: 'Team TJKT' },
      { title: 'Server Security Audit', img: '/robot.jpeg', author: 'Siswa TJKT' },
      { title: 'Smart Gateway Node', img: '/ujian kompetensi.jpeg', author: 'Team TJKT' }
    ],
    'Akuntansi dan Keuangan Lembaga': [
      { title: 'Simulasi Audit Pajak', img: '/akunting.jpeg', author: 'Team Akuntansi' },
      { title: 'Laporan Keuangan Tahunan', img: '/profil siswa.jpeg', author: 'Siswa Akuntansi' },
      { title: 'Dashboard Keuangan Digital', img: '/programming.jpeg', author: 'Team Akuntansi' }
    ],
    'Pengembangan Perangkat Lunak dan Gim': [
       { title: 'Web Marketplace App', img: '/programming.jpeg', author: 'Dev Team' },
       { title: 'Game Development 2D', img: '/robot.jpeg', author: 'Gim Dev' },
       { title: 'Sistem Ujian Cloud', img: '/ujian kompetensi.jpeg', author: 'Team PPLG' }
    ],
    'AI dan Machine Learning': [
        { title: 'Predictive Analysis Model', img: '/programming 2.jpeg', author: 'AI Research' },
        { title: 'Computer Vision System', img: '/robot.jpeg', author: 'AI Lab' },
        { title: 'Neural Network Optimizer', img: '/ujian kompetensi.jpeg', author: 'AI Research' }
    ]
  };
  
  const portfolioItems = portfolioData[majorName] || [
      { title: 'Project Karya Umum', img: '/programming 2.jpeg', author: 'Siswa SMK' },
      { title: 'Project Karya Umum', img: '/robot.jpeg', author: 'Siswa SMK' },
      { title: 'Project Karya Umum', img: '/ujian kompetensi.jpeg', author: 'Siswa SMK' }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <PageHero 
        title={`${majorName} <br />(Pro Version)`}
        subtitle={`Pelajari keunggulan kurikulum ${majorName} yang dirancang khusus untuk industri teknologi terkini.`}
        bgImage="/programming.jpeg"
        badge="Pro Version - Advanced Lab"
        priority
      />

      {/* Detail Content */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-12">
            <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100">
              <h2 className="text-3xl font-black text-slate-900 mb-6">Tentang Program</h2>
              <p className="text-slate-600 leading-relaxed text-lg mb-8">
                Jurusan {majorName} di SMK Bhairava menyediakan akses ke lab virtual, simulasi industri, dan proyek kolaborasi langsung dengan mitra teknologi. Kurikulum Pro Version mencakup materi tingkat lanjut yang biasanya hanya tersedia di tingkat universitas atau training industri bersertifikat.
              </p>
              <div className="flex gap-4">
                 <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100">
                    <Star className="text-amber-500 mb-2" size={24} />
                    <p className="font-black text-slate-900">Sertifikasi Industri</p>
                 </div>
                 <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                    <Zap className="text-blue-500 mb-2" size={24} />
                    <p className="font-black text-slate-900">Kurikulum 4.0</p>
                 </div>
              </div>
            </div>

            <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100">
               <h2 className="text-3xl font-black text-slate-900 mb-8">Proyek Unggulan (Pro Version)</h2>
               <div className="grid md:grid-cols-2 gap-6">
                  {[1, 2].map((i) => (
                    <div key={i} className="rounded-3xl overflow-hidden border border-slate-200 group">
                      <div className="aspect-video bg-slate-200 relative">
                        <Image src={i === 1 ? "/making robot.jpeg" : "/merakit pc.jpeg"} alt="Proyek" fill sizes="40vw" className="object-cover" />
                      </div>
                      <div className="p-6">
                         <h4 className="font-bold text-lg mb-2">Sistem Integrasi IoT {i}</h4>
                         <p className="text-slate-500 text-sm">Implementasi perangkat lunak pada perangkat keras industri.</p>
                      </div>
                    </div>
                  ))}
               </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="bg-slate-900 text-white p-10 rounded-[3rem] shadow-xl">
               <h3 className="text-xl font-black mb-6">Pro Version Perks</h3>
               <ul className="space-y-4">
                  <li className="flex items-center gap-3 text-slate-300 font-bold"><ShieldCheck size={20} className="text-blue-400" /> Akses Lab 24/7</li>
                  <li className="flex items-center gap-3 text-slate-300 font-bold"><Briefcase size={20} className="text-blue-400" /> Magang Prioritas</li>
                  <li className="flex items-center gap-3 text-slate-300 font-bold"><Network size={20} className="text-blue-400" /> Jaringan Mentoring</li>
               </ul>
               <button className="w-full mt-8 bg-blue-600 text-white py-4 rounded-2xl font-black hover:bg-blue-700">Daftar Pro Version</button>
            </div>
            
            <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 text-center">
               <h3 className="text-xl font-black text-slate-900 mb-4">Virtual Lab</h3>
               <p className="text-slate-500 text-sm mb-6">Masuk ke ruang praktikum simulasi digital jurusan ini.</p>
               <Link href={`/majors/${id}/lab`} className="block w-full bg-slate-900 text-white py-4 rounded-2xl font-black hover:bg-slate-800 transition-all text-center">
                 Masuk Virtual Lab
               </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="pb-24 px-6 max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-12">
           <div>
              <h2 className="text-4xl font-black text-slate-900 mb-4">Portofolio Siswa</h2>
              <p className="text-slate-500 font-bold">Kumpulan karya terbaik dan inovasi dari siswa jurusan {majorName}.</p>
           </div>
           <Link href="#" className="text-blue-600 font-black text-sm uppercase tracking-widest hover:text-blue-800 transition-colors">Lihat Semua Karya</Link>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
           {portfolioItems.map((item, i) => (
              <div key={i} className="group cursor-pointer">
                 <div className="relative aspect-[4/3] rounded-3xl overflow-hidden mb-6 shadow-xl">
                    <Image src={item.img} alt={item.title} fill sizes="(max-width: 768px) 100vw, 30vw" className="object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                 </div>
                 <h4 className="font-black text-slate-900 text-lg mb-1">{item.title}</h4>
                 <p className="text-slate-500 font-bold text-sm">Oleh {item.author}</p>
              </div>
           ))}
        </div>
      </section>

      {/* Detailed Info Section */}
      <section className="pb-24 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-8">
           {/* Kurikulum */}
           <div className="bg-slate-900 p-8 rounded-[3rem] border border-white/10 shadow-2xl relative overflow-hidden group hover:border-blue-500/50 transition-colors">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <h3 className="text-xl font-black mb-6 flex items-center gap-3 text-white relative z-10"><Layout size={20} className="text-blue-400"/> Kurikulum</h3>
              <ul className="space-y-4 text-sm font-bold text-slate-300 relative z-10">
                 <li className="flex gap-2"><span>•</span> Dasar-dasar Teknik Modern</li>
                 <li className="flex gap-2"><span>•</span> Sertifikasi Industri Internasional</li>
                 <li className="flex gap-2"><span>•</span> Proyek Berbasis Industri (PBL)</li>
                 <li className="flex gap-2"><span>•</span> Magang Prakerin 6 Bulan</li>
              </ul>
           </div>
           {/* Kerjasama */}
           <div className="bg-slate-900 p-8 rounded-[3rem] border border-white/10 shadow-2xl relative overflow-hidden group hover:border-emerald-500/50 transition-colors">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <h3 className="text-xl font-black mb-6 flex items-center gap-3 text-white relative z-10"><Briefcase size={20} className="text-emerald-400"/> Kerjasama</h3>
              <div className="flex flex-wrap gap-2 relative z-10">
                 <span className="bg-white/5 px-3 py-1 rounded-lg text-xs font-black text-white hover:bg-white/10 transition-colors">AWS Academy</span>
                 <span className="bg-white/5 px-3 py-1 rounded-lg text-xs font-black text-white hover:bg-white/10 transition-colors">Cisco</span>
                 <span className="bg-white/5 px-3 py-1 rounded-lg text-xs font-black text-white hover:bg-white/10 transition-colors">Google Cloud</span>
                 <span className="bg-white/5 px-3 py-1 rounded-lg text-xs font-black text-white hover:bg-white/10 transition-colors">Microsoft</span>
              </div>
           </div>
           {/* Prestasi */}
           <div className="bg-slate-900 p-8 rounded-[3rem] border border-white/10 shadow-2xl relative overflow-hidden group hover:border-amber-500/50 transition-colors">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <h3 className="text-xl font-black mb-6 flex items-center gap-3 text-white relative z-10"><Award size={20} className="text-amber-400"/> Prestasi</h3>
              <p className="text-sm font-bold text-slate-300 mb-2 relative z-10">Juara 1 Lomba Inovasi Nasional 2025</p>
              <p className="text-sm font-bold text-slate-300 relative z-10">Finalis WorldSkills Junior 2024</p>
           </div>
        </div>
      </section>

      {/* Footer */}
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
