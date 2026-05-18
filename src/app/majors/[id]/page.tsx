import React from 'react';
import { prisma } from '@/lib/prisma';
import Navbar from '@/components/Navbar';
import { 
  Network, 
  Calculator, 
  Megaphone, 
  Brain, 
  Database,
  GraduationCap,
  ArrowRight,
  CheckCircle2,
  Cpu,
  Code,
  Globe,
  Award,
  BookOpen
} from 'lucide-react';
import Image from 'next/image';
import { notFound } from 'next/navigation';

const iconMap: Record<string, any> = {
  Network,
  Calculator,
  Megaphone,
  Brain,
  Database,
  Code,
  Cpu,
};

// Map major names to specific logos
const majorLogoMap: Record<string, string> = {
  'Teknik Jaringan Komputer dan Telekomunikasi': '/jurusan tjkt.JPG',
  'Pengembangan Perangkat Lunak dan GIM': '/jurusan pplg.JPG',
  'Teknik Mekatronika & Robotika': '/jurusan mekatronika.JPG',
  // Fallbacks for majors without a specific logo
  'Akuntansi & Keuangan Lembaga': '/akunting.jpeg',
  'AI & Machine Learning': '/robotic3.jpeg',
  'Big Data Analytics': '/programming 2.jpeg',
};

// Map major names to a gallery of relevant images
const majorGalleryMap: Record<string, string[]> = {
  'Teknik Jaringan Komputer dan Telekomunikasi': ['/merakit pc.jpeg', '/merakiot pc.jpeg'],
  'Pengembangan Perangkat Lunak dan GIM': ['/programming.jpeg', '/programming 2.jpeg'],
  'Teknik Mekatronika & Robotika': ['/robotic.jpeg', '/making robot.jpeg'],
  'AI & Machine Learning': ['/robotic3.jpeg', '/prakrtik industri it.jpeg'],
  'Big Data Analytics': ['/programming 2.jpeg', '/merakiot pc.jpeg'],
  'Akuntansi & Keuangan Lembaga': ['/akunting.jpeg', '/praktik kerja.jpeg'],
};

async function getMajorData(id: string) {
  const major = await prisma.major.findUnique({
    where: { id },
    include: {
      projects: true,
      curriculums: {
        orderBy: { version: 'desc' },
        take: 1
      }
    }
  });
  return major;
}

export default async function MajorDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const major = await getMajorData(id);

  if (!major) {
    notFound();
  }

  const Icon = iconMap[major.icon] || GraduationCap;
  const majorImage = majorLogoMap[major.name] || '/robot.jpeg'; // Use the new logo map
  const isLogo = majorImage.endsWith('.JPG'); // Check if the image is a logo
  const galleryImages = majorGalleryMap[major.name] || ['/profil siswa.jpeg', '/praktik industri.jpeg'];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
                <Icon size={14} />
                <span>Program Keahlian {major.category}</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-black text-slate-900 leading-[1.1] mb-8">
                {major.name}
              </h1>
              <p className="text-xl text-slate-500 mb-10 leading-relaxed">
                {major.description}
              </p>
              <div className="flex gap-4">
                <button className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black hover:bg-blue-700 transition-all flex items-center gap-2">
                  Daftar Sekarang
                  <ArrowRight size={18} />
                </button>
                {major.curriculums[0] && (
                  <button className="bg-white text-slate-900 border-2 border-slate-200 px-8 py-4 rounded-2xl font-black hover:border-blue-600 transition-all">
                    Download Kurikulum
                  </button>
                )}
              </div>
            </div>
            <div className="w-full md:w-2/5 aspect-square relative flex items-center justify-center">
              <Image 
                src={majorImage} 
                alt={major.name} 
                fill 
                className={isLogo ? "object-contain p-8" : "object-cover rounded-[3rem] group-hover:scale-110 transition-transform duration-1000"}
              />
              {!isLogo && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent rounded-[3rem]" />
                  <div className="absolute bottom-8 left-8">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white">
                      <Icon size={32} />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Lab & Industry Focus */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-12">
          <div className="p-10 rounded-[3rem] bg-slate-900 text-white relative overflow-hidden group">
            <Cpu className="text-blue-400 mb-6 group-hover:scale-110 transition-transform" size={40} />
            <h3 className="text-2xl font-black mb-4">Virtual Lab & Simulation</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-8">
              Akses ke simulator industri standar internasional seperti Cisco Packet Tracer, Myob Digital, dan Cloud Sandbox.
            </p>
            <div className="flex items-center gap-2 text-blue-400 font-bold text-xs uppercase tracking-widest">
              Akses Siswa
              <ArrowRight size={14} />
            </div>
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-blue-600/10 rounded-full blur-3xl"></div>
          </div>

          <div className="p-10 rounded-[3rem] border border-slate-100 shadow-sm group">
            <Globe className="text-emerald-500 mb-6 group-hover:rotate-12 transition-transform" size={40} />
            <h3 className="text-2xl font-black text-slate-900 mb-4">Sertifikasi Global</h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-8">
              Kurikulum terintegrasi dengan vendor raksasa teknologi (Google, AWS, Microsoft, Cisco) untuk menjamin kualitas lulusan.
            </p>
            <div className="space-y-3">
              {['BNSP Certified', 'Vendor Recognized', 'Industry Aligned'].map(item => (
                <div key={item} className="flex items-center gap-2 text-slate-700 font-bold text-xs">
                  <CheckCircle2 size={16} className="text-emerald-500" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="p-10 rounded-[3rem] border border-slate-100 shadow-sm group">
            <Award className="text-amber-500 mb-6 group-hover:scale-110 transition-transform" size={40} />
            <h3 className="text-2xl font-black text-slate-900 mb-4">Proyek Unggulan</h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-8">
              Siswa mengerjakan proyek nyata dari mitra industri sebagai portofolio sebelum lulus.
            </p>
            <div className="space-y-4">
              {major.projects.map(project => (
                <div key={project.id} className="p-4 bg-slate-50 rounded-2xl flex items-center justify-between">
                  <span className="font-bold text-slate-700 text-xs">{project.title}</span>
                  <ArrowRight size={14} className="text-slate-300" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Showcase Section - NEW Images integration */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {galleryImages.map((src, index) => (
              <div key={index} className="relative aspect-video rounded-[3rem] overflow-hidden shadow-lg group">
                <Image 
                  src={src} 
                  alt={`${major.name} gallery image ${index + 1}`} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum Overview */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-black text-slate-900 mb-6">Peta Kompetensi</h2>
          <p className="text-slate-500 mb-12">
            Kami merancang kurikulum yang adaptif terhadap kebutuhan industri 4.0, fokus pada keterampilan teknis dan soft-skills.
          </p>
          <div className="grid md:grid-cols-2 gap-6 text-left">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6">
                <BookOpen size={24} />
              </div>
              <h4 className="text-lg font-black text-slate-800 mb-4">Materi Inti</h4>
              <ul className="space-y-3 text-sm text-slate-500 font-medium">
                <li>• Dasar-dasar Kejuruan</li>
                <li>• Praktik Kerja Lapangan</li>
                <li>• Proyek Penguatan Profil Pelajar Pancasila</li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm">
              <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mb-6">
                <Brain size={24} />
              </div>
              <h4 className="text-lg font-black text-slate-800 mb-4">Keahlian Khusus</h4>
              <ul className="space-y-3 text-sm text-slate-500 font-medium">
                <li>• Konsentrasi Keahlian {major.name}</li>
                <li>• Mata Pelajaran Pilihan Industri</li>
                <li>• Sertifikasi Kompetensi</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto bg-blue-600 rounded-[4rem] p-16 text-center text-white relative overflow-hidden">
          <h2 className="text-4xl md:text-5xl font-black mb-8 relative z-10">Siap Menjadi Tenaga <br />Profesional Masa Depan?</h2>
          <p className="text-blue-100 text-lg mb-12 max-w-2xl mx-auto relative z-10">
            Bergabunglah dengan ratusan alumni yang telah sukses berkarir di perusahaan teknologi ternama dan industri global.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
            <button className="bg-white text-blue-600 px-10 py-5 rounded-[2rem] font-black text-lg hover:shadow-2xl transition-all">
              Hubungi Konselor
            </button>
            <button className="bg-blue-700 text-white px-10 py-5 rounded-[2rem] font-black text-lg hover:bg-blue-800 transition-all">
              Unduh Brosur
            </button>
          </div>
          {/* Decorative pattern */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/20 rounded-full -ml-20 -mb-20 blur-3xl"></div>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="py-12 border-t border-slate-100 text-center">
        <p className="text-slate-400 text-xs font-black uppercase tracking-widest">© 2026 SMK BHAIRAVA. Industry Ready Education.</p>
      </footer>
    </div>
  );
}
