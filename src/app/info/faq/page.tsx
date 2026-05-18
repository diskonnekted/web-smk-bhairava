import React from 'react';
import { 
  Info, 
  HelpCircle, 
  ArrowRight, 
  BookOpen, 
  UserCheck, 
  CreditCard, 
  MessageSquare,
  Lock
} from 'lucide-react';
import Link from 'next/link';

export default function PublicFAQPage() {
  const faqs = [
    {
      category: 'Akun & Login',
      icon: <Lock className="text-blue-500" />,
      questions: [
        {
          q: 'Bagaimana cara mendapatkan akun Portal Siswa?',
          a: 'Akun Siswa dibuatkan otomatis oleh sistem saat pendaftaran ulang. Username menggunakan NIS (Nomor Induk Siswa) dan password default adalah NIS tersebut.'
        },
        {
          q: 'Bagaimana jika saya lupa password?',
          a: 'Silakan hubungi bagian IT/Admin Sekolah atau wali kelas Anda untuk melakukan reset password.'
        }
      ]
    },
    {
      category: 'Akademik & Nilai',
      icon: <BookOpen className="text-indigo-500" />,
      questions: [
        {
          q: 'Kapan nilai ujian dapat dilihat di portal?',
          a: 'Nilai akan muncul setelah guru mata pelajaran selesai melakukan input dan validasi nilai, biasanya 1 minggu setelah periode ujian berakhir.'
        },
        {
          q: 'Apakah saya bisa mencetak KHS sendiri?',
          a: 'Ya, Anda dapat mengunduh dan mencetak KHS digital melalui menu "Akademik" di dalam portal.'
        }
      ]
    },
    {
      category: 'Monitoring & SPP',
      icon: <CreditCard className="text-emerald-500" />,
      questions: [
        {
          q: 'Bagaimana cara orang tua memantau kehadiran?',
          a: 'Orang tua dapat login ke Portal Wali menggunakan akun yang diberikan. Data kehadiran diperbarui secara real-time setiap harinya.'
        },
        {
          q: 'Apakah pembayaran SPP bisa dilakukan lewat portal?',
          a: 'Saat ini portal hanya menyediakan informasi tagihan. Pembayaran tetap dilakukan melalui kanal bank yang bekerja sama atau kasir sekolah.'
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-16 text-center">
           <Link href="/info" className="text-blue-600 font-black text-xs uppercase tracking-widest mb-4 inline-block hover:underline">← Kembali ke Menu Info</Link>
           <h1 className="text-5xl font-black text-slate-900 mb-4 tracking-tighter">Panduan & FAQ Portal</h1>
           <p className="text-slate-500 font-bold">Segala hal yang perlu Anda ketahui tentang ekosistem digital SMK Bhairava.</p>
        </div>

        <div className="space-y-12">
          {faqs.map((group, i) => (
            <div key={i} className="space-y-6">
               <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                  <div className="p-2 bg-slate-50 rounded-xl">{group.icon}</div>
                  <h2 className="text-2xl font-black text-slate-900">{group.category}</h2>
               </div>
               <div className="grid gap-4">
                  {group.questions.map((faq, j) => (
                    <div key={j} className="bg-slate-50 p-8 rounded-[2rem] border border-transparent hover:border-blue-200 hover:bg-white transition-all group">
                       <h4 className="text-lg font-black text-slate-900 mb-3 flex items-start gap-3">
                          <HelpCircle className="text-blue-500 shrink-0 mt-1" size={20} />
                          {faq.q}
                       </h4>
                       <p className="text-slate-500 font-medium leading-relaxed pl-8">
                          {faq.a}
                       </p>
                    </div>
                  ))}
               </div>
            </div>
          ))}
        </div>

        {/* Support CTA */}
        <div className="mt-20 bg-slate-900 rounded-[3rem] p-10 md:p-16 text-center text-white relative overflow-hidden">
           <div className="absolute top-0 left-0 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl -ml-32 -mt-32"></div>
           <HelpCircle className="mx-auto text-blue-500 mb-6" size={48} />
           <h3 className="text-3xl font-black mb-4 relative z-10">Masih Butuh Bantuan?</h3>
           <p className="text-slate-400 font-medium mb-10 max-w-lg mx-auto relative z-10">Tim IT Support kami siap membantu kendala teknis Anda setiap hari kerja pukul 08.00 - 15.00 WIB.</p>
           <Link href="/contact" className="px-10 py-5 bg-blue-600 text-white rounded-2xl font-black text-lg hover:bg-blue-700 transition-all inline-flex items-center gap-2 relative z-10">
              Hubungi Support <ArrowRight size={20} />
           </Link>
        </div>
      </div>
    </div>
  );
}
