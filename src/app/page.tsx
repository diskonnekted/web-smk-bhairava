import React from 'react';
import Navbar from '@/components/Navbar';
import Image from 'next/image';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { 
  Network, 
  Calculator, 
  Megaphone, 
  ArrowRight, 
  CheckCircle2, 
  GraduationCap, 
  Brain, 
  Database,
  Code,
  Cpu,
  Calendar,
  Briefcase,
  ShieldCheck,
  Zap,
  TrendingUp,
  Star
} from 'lucide-react';
import AIChatbot from '@/components/client/AIChatbot';

const iconMap: Record<string, any> = {
  Network,
  Calculator,
  Megaphone,
  Brain,
  Database,
  Code,
  Cpu,
};

// Map event titles to relevant images
const eventImageMap: Record<string, string> = {
  'Ujian Kompetensi Keahlian (UKK)': '/ujian kompetensi.jpeg',
  'Pembekalan PKL Industri': '/praktik industri.jpeg',
};

async function getMajors() {
  return await prisma.major.findMany();
}

async function getEvents() {
  return await prisma.event.findMany({
    take: 3,
    orderBy: { startDate: 'asc' }
  });
}

export default async function LandingPage() {
  const [majors, events] = await Promise.all([getMajors(), getEvents()]);

  return (
    <div className="min-h-screen bg-white selection:bg-blue-100 selection:text-blue-600">
      <Navbar />
      <AIChatbot />
      
      {/* Hero Section - AI & Industry Ready Focus */}
      <section className="pt-40 pb-24 px-6 overflow-hidden relative">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-8 animate-bounce">
              <Zap size={14} />
              <span>Industry 4.0 & AI Ready</span>
            </div>
            <h1 className="text-7xl md:text-8xl font-black text-slate-900 leading-[0.9] mb-10">
              Future <br /><span className="text-blue-600 italic">Excellence.</span>
            </h1>
            <p className="text-xl text-slate-500 mb-12 leading-relaxed max-w-lg">
              SMK BHAIRAVA menghadirkan kurikulum berbasis proyek nyata, lab virtual AI, dan jaringan industri global untuk mencetak pemimpin masa depan.
            </p>
            <div className="flex flex-col sm:flex-row gap-5">
              <button className="bg-slate-900 text-white px-10 py-5 rounded-[2rem] font-black text-lg hover:bg-blue-600 transition-all flex items-center justify-center gap-3 group shadow-2xl shadow-slate-200">
                Mulai Karir Anda
                <ArrowRight className="group-hover:translate-x-2 transition-transform" />
              </button>
              <button className="bg-white text-slate-900 border-2 border-slate-100 px-10 py-5 rounded-[2rem] font-black text-lg hover:border-blue-600 transition-all">
                Virtual Tour
              </button>
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-[4/5] bg-slate-900 rounded-[4rem] relative overflow-hidden shadow-2xl group">
              <Image 
                src="/robot.jpeg" 
                alt="Modern Education"
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover opacity-70 group-hover:scale-105 transition-transform duration-1000" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
              <div className="absolute bottom-12 left-12 right-12">
                <div className="flex gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-bold">AI</div>
                  <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-white font-bold">IoT</div>
                  <div className="w-12 h-12 bg-amber-500 rounded-2xl flex items-center justify-center text-white font-bold">DEV</div>
                </div>
                <h3 className="text-3xl font-bold text-white leading-tight">Kurikulum Terintegrasi Standar Internasional</h3>
              </div>
            </div>
            {/* Animated Glows */}
            <div className="absolute -z-10 -top-20 -right-20 w-96 h-96 bg-blue-400 rounded-full blur-[120px] opacity-20 animate-pulse"></div>
            <div className="absolute -z-10 -bottom-20 -left-20 w-96 h-96 bg-emerald-400 rounded-full blur-[120px] opacity-20 animate-pulse delay-700"></div>
          </div>
        </div>
      </section>

      {/* Heavy Machinery & Agriculture Section - NEW (Feature excavator images) */}
      <section className="py-24 px-6 bg-slate-900 text-white overflow-hidden relative">
         <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative order-2 lg:order-1">
               <div className="grid grid-cols-2 gap-4">
                  <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border-2 border-slate-800">
                     <Image src="/excavator.jpeg" alt="Heavy Machinery" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
                  </div>
                  <div className="relative aspect-[4/5] rounded-3xl overflow-hidden mt-12 border-2 border-slate-800">
                     <Image src="/excavator2.jpeg" alt="Modern Agriculture" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
                  </div>
               </div>
               {/* Floating badge */}
               <div className="absolute -right-8 top-1/2 -translate-y-1/2 bg-blue-600 p-8 rounded-[2.5rem] shadow-2xl z-20 hidden md:block border-4 border-slate-900">
                  <p className="text-4xl font-black mb-1">2026</p>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80">Tech Integration</p>
               </div>
            </div>
            <div className="order-1 lg:order-2">
               <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-8">
                  <Briefcase size={32} />
               </div>
               <h2 className="text-5xl font-black mb-8 leading-tight">Automasi & <br />Alat Berat Modern</h2>
               <p className="text-slate-400 text-lg leading-relaxed mb-10 max-w-md">
                  Integrasi teknologi IoT dan Remote Sensing pada sektor industri berat dan pertanian modern untuk efisiensi maksimal.
               </p>
               <div className="grid gap-6">
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center text-blue-400">
                        <CheckCircle2 size={20} />
                     </div>
                     <span className="font-bold text-slate-200">Simulasi Kontrol Presisi</span>
                  </div>
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center text-blue-400">
                        <CheckCircle2 size={20} />
                     </div>
                     <span className="font-bold text-slate-200">Maintenance Berbasis Data</span>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Featured Gallery Section */}
      <section className="py-24 px-6 border-t border-slate-100 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-slate-900 mb-4">Aktivitas & Fasilitas</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">Melihat lebih dekat kegiatan praktik dan fasilitas modern yang menunjang pembelajaran siswa.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
            <div className="relative rounded-3xl overflow-hidden group col-span-2 row-span-2 shadow-xl">
              <Image 
                src="/making robot.jpeg" 
                alt="Making Robot"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover group-hover:scale-110 transition-all duration-700" 
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all flex items-end p-8">
                <p className="text-white font-bold text-lg opacity-0 group-hover:opacity-100 transition-opacity">Robot Development Lab</p>
              </div>
            </div>
            <div className="relative rounded-3xl overflow-hidden group col-span-2 shadow-lg">
              <Image src="/merakit pc.jpeg" alt="Merakit PC" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover group-hover:scale-110 transition-all duration-700" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all flex items-end p-6">
                <p className="text-white font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity">Hardware Engineering</p>
              </div>
            </div>
            <div className="relative rounded-3xl overflow-hidden group shadow-md">
              <Image src="/programming.jpeg" alt="Programming" fill sizes="(max-width: 768px) 100vw, 25vw" className="object-cover group-hover:scale-110 transition-all duration-700" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all"></div>
            </div>
            <div className="relative rounded-3xl overflow-hidden group shadow-md">
              <Image src="/profil siswa.jpeg" alt="Profil Siswa" fill sizes="(max-width: 768px) 100vw, 25vw" className="object-cover group-hover:scale-110 transition-all duration-700" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Alumni & Success Stories - NEW (Feature the rest of images) */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
           <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
              <div className="max-w-xl text-center md:text-left">
                <h2 className="text-5xl font-black text-slate-900 mb-6">Link & Match <br /><span className="text-blue-600">Alumni Berdaya.</span></h2>
                <p className="text-slate-500 text-lg font-medium">98% Lulusan kami langsung terserap di industri mitra melalui program akselerasi karir.</p>
              </div>
              <div className="flex gap-4">
                 <div className="bg-slate-100 p-6 rounded-[2.5rem] text-center border border-slate-200">
                    <p className="text-4xl font-black text-slate-900">50+</p>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Mitra Industri</p>
                 </div>
                 <div className="bg-blue-600 p-6 rounded-[2.5rem] text-center text-white shadow-xl shadow-blue-200">
                    <p className="text-4xl font-black">98%</p>
                    <p className="text-[10px] font-black text-blue-100 uppercase tracking-widest">Employment Rate</p>
                 </div>
              </div>
           </div>

           <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-slate-50 rounded-[3rem] p-10 flex flex-col md:flex-row gap-10 items-center border border-slate-100 group hover:shadow-2xl transition-all duration-500">
                 <div className="w-full md:w-1/2 aspect-square relative rounded-[2rem] overflow-hidden shadow-lg">
                    <Image src="/prakrtik industri it.jpeg" alt="Success Story 1" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover group-hover:scale-110 transition-transform duration-700" />
                 </div>
                 <div className="flex-1">
                    <div className="flex gap-1 text-amber-400 mb-4">
                       <Star size={16} fill="currentColor" />
                       <Star size={16} fill="currentColor" />
                       <Star size={16} fill="currentColor" />
                       <Star size={16} fill="currentColor" />
                       <Star size={16} fill="currentColor" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-800 mb-4">"Kurikulum yang sangat relevan dengan industri IT saat ini."</h3>
                    <p className="text-slate-500 font-bold mb-6">Ahmad Fauzi, Network Engineer at AWS Indonesia</p>
                    <div className="flex items-center gap-2 text-blue-600 font-black text-xs uppercase tracking-widest">
                       Success Story
                       <ArrowRight size={14} />
                    </div>
                 </div>
              </div>
              <div className="bg-slate-50 rounded-[3rem] p-10 flex flex-col md:flex-row gap-10 items-center border border-slate-100 group hover:shadow-2xl transition-all duration-500">
                 <div className="w-full md:w-1/2 aspect-square relative rounded-[2rem] overflow-hidden shadow-lg">
                    <Image src="/praktik kerja.jpeg" alt="Success Story 2" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover group-hover:scale-110 transition-transform duration-700" />
                 </div>
                 <div className="flex-1">
                    <div className="flex gap-1 text-amber-400 mb-4">
                       <Star size={16} fill="currentColor" />
                       <Star size={16} fill="currentColor" />
                       <Star size={16} fill="currentColor" />
                       <Star size={16} fill="currentColor" />
                       <Star size={16} fill="currentColor" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-800 mb-4">"Pengalaman praktik industri yang nyata dan profesional."</h3>
                    <p className="text-slate-500 font-bold mb-6">Siti Aminah, Senior Accountant at Big 4</p>
                    <div className="flex items-center gap-2 text-blue-600 font-black text-xs uppercase tracking-widest">
                       Success Story
                       <ArrowRight size={14} />
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Industry Blueprint Section */}
      <section className="py-32 bg-white px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-12">
            <div className="lg:col-span-1">
              <h2 className="text-4xl font-black text-slate-900 mb-6 leading-tight">Industry <br />Link & Match</h2>
              <p className="text-slate-500 mb-8 leading-relaxed">
                Kami memastikan setiap lulusan memiliki kompetensi yang dibutuhkan oleh pasar kerja global melalui integrasi DUDIKA Portal.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-slate-700 font-bold">
                  <CheckCircle2 className="text-blue-600" size={20} />
                  <span>BNSP Certification</span>
                </div>
                <div className="flex items-center gap-3 text-slate-700 font-bold">
                  <CheckCircle2 className="text-blue-600" size={20} />
                  <span>Cisco Academy Partnership</span>
                </div>
                <div className="flex items-center gap-3 text-slate-700 font-bold">
                  <CheckCircle2 className="text-blue-600" size={20} />
                  <span>Google Cloud Education</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3 grid md:grid-cols-3 gap-6">
              {majors.map((major) => {
                const Icon = iconMap[major.icon] || GraduationCap;
                const slug = major.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                return (
                  <Link 
                    href={`/majors/${slug}`}
                    key={major.id} 
                    className="bg-slate-50 p-8 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 group text-left"
                  >
                    <div className="w-16 h-16 bg-white rounded-[1.5rem] flex items-center justify-center text-blue-600 mb-8 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 group-hover:rotate-12">
                      <Icon size={32} />
                    </div>
                    <h3 className="text-xl font-black text-slate-900 mb-4">{major.name}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-8 line-clamp-3">
                      {major.description}
                    </p>
                    <div className="flex items-center gap-2 text-blue-600 font-black text-xs uppercase tracking-widest group-hover:gap-4 transition-all">
                      Explore Lab
                      <ArrowRight size={16} />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Academic Calendar & Events */}
      <section className="py-32 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-4xl font-black text-slate-900 mb-4">Agenda Mendatang</h2>
              <p className="text-slate-500 max-w-md">Pantau kegiatan akademik dan event industri sekolah melalui kalender terpusat.</p>
            </div>
            <button className="hidden md:flex items-center gap-2 font-black text-blue-600 border-b-2 border-blue-600 pb-1 hover:gap-4 transition-all">
              Lihat Kalender Lengkap
              <ArrowRight size={20} />
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {events.map((event) => {
              const eventImage = eventImageMap[event.title] || '/robot.jpeg'; // Fallback image
              return (
                <div key={event.id} className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden group transition-all hover:shadow-xl hover:-translate-y-2">
                  <div className="relative aspect-video">
                    <Image 
                      src={eventImage} 
                      alt={event.title} 
                      fill 
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="inline-block bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-100 mb-4">
                        {event.type}
                      </div>
                      <div className="flex items-center gap-2 text-slate-400 text-xs font-bold">
                        <Calendar size={14} className="text-slate-400" />
                        {event.startDate.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                      </div>
                    </div>
                    <h3 className="text-lg font-black text-slate-800 mb-3 leading-snug">{event.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-2">
                      {event.description}
                    </p>
                    <button className="w-full text-center bg-slate-100 text-slate-700 px-5 py-3 rounded-2xl font-bold text-sm hover:bg-blue-600 hover:text-white transition-colors">
                      Lihat Detail
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-6 border-y border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
          <div>
            <p className="text-6xl font-black text-slate-900 mb-3 tracking-tighter">15+</p>
            <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Global Partners</p>
          </div>
          <div>
            <p className="text-6xl font-black text-blue-600 mb-3 tracking-tighter">98%</p>
            <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Industry Placement</p>
          </div>
          <div>
            <p className="text-6xl font-black text-slate-900 mb-3 tracking-tighter">24/7</p>
            <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">AI Support</p>
          </div>
          <div>
            <p className="text-6xl font-black text-emerald-500 mb-3 tracking-tighter">100%</p>
            <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Digital Curriculum</p>
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
      <AIChatbot />
    </div>
  );
}
