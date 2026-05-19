import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();
const random = <T>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];

async function main() {
  console.log("--- Start seeding ---");
  await prisma.grade.deleteMany();
  await prisma.internship.deleteMany();
  await prisma.curriculum.deleteMany();
  await prisma.project.deleteMany();
  await prisma.student.deleteMany();
  await prisma.teacher.deleteMany();
  await prisma.major.deleteMany();
  await prisma.user.deleteMany();
  await prisma.news.deleteMany();
  await prisma.event.deleteMany(); // Added this line
  console.log("Database cleared.");

  // Seed Events
  const eventsData = [
    {
      title: "Seminar AI & Masa Depan Industri",
      description: "Bergabunglah dengan para ahli untuk menjelajahi potensi kecerdasan buatan dalam membentuk masa depan industri.",
      type: "SEMINAR",
      image: "/jurusan digital marketing.JPG",
      startDate: new Date('2026-06-15T09:00:00Z'),
      endDate: new Date('2026-06-15T12:00:00Z'),
      location: "Auditorium Utama"
    },
    {
      title: "Open House SMK Bhairava",
      description: "Temukan program-program unggulan kami, fasilitas modern, dan temui langsung para pengajar dan siswa berprestasi.",
      type: "OPEN_HOUSE",
      image: "/jurusan tjkt.JPG",
      startDate: new Date('2026-07-20T10:00:00Z'),
      endDate: new Date('2026-07-20T16:00:00Z'),
      location: "Kampus SMK Bhairava"
    },
    {
      title: "Lomba Coding Nasional 2026",
      description: "Ajang kompetisi coding tingkat nasional untuk menguji kemampuan logika dan pemrograman siswa-siswi terbaik Indonesia.",
      type: "COMPETITION",
      image: "/programming.jpeg",
      startDate: new Date('2026-08-10T08:00:00Z'),
      endDate: new Date('2026-08-12T17:00:00Z'),
      location: "Lab Komputer Terpadu"
    },
    {
      title: "Pameran Karya Siswa Inovatif",
      description: "Saksikan langsung inovasi dan kreativitas siswa SMK Bhairava dalam berbagai bidang teknologi dan rekayasa.",
      type: "EXHIBITION",
      image: "/robotic.jpeg",
      startDate: new Date('2026-09-01T13:00:00Z'),
      endDate: new Date('2026-09-03T18:00:00Z'),
      location: "Aula Serbaguna"
    }
  ];
  await prisma.event.createMany({ data: eventsData });
  console.log(`${eventsData.length} events created.`);

  // Seed Admin
  const adminPassword = await bcrypt.hash('admin123', 10);
  await prisma.user.create({ data: { username: 'admin', password: adminPassword, name: 'Super Admin', role: 'ADMIN' } });

  // Seed Teachers
  const teacherNames = ['Andi Setiawan', 'Budi Hartono', 'Citra Lestari'];
  for (let i = 0; i < teacherNames.length; i++) {
    const teacherPassword = await bcrypt.hash('teacher123', 10);
    const user = await prisma.user.create({ data: { username: `guru${i+1}`, password: teacherPassword, name: teacherNames[i], role: 'TEACHER' } });
    await prisma.teacher.create({ data: { name: teacherNames[i], nuptk: `NUPTK-${Date.now()}-${i}`, userId: user.id, gender: i % 2 === 0 ? 'L' : 'P' } });
  }
  console.log(`${teacherNames.length} teachers created.`);

  // Seed Majors
  const majorsData = [
    { 
      name: 'Teknik Jaringan Komputer dan Telekomunikasi', 
      icon: 'Network', 
      category: 'TECH',
      description: 'Spesialisasi dalam infrastruktur jaringan global, keamanan siber, dan administrasi server tingkat lanjut.'
    },
    { 
      name: 'Akuntansi & Keuangan Lembaga', 
      icon: 'Calculator', 
      category: 'BUSINESS',
      description: 'Analisis keuangan berbasis AI dan manajemen pajak modern untuk industri finansial masa depan.'
    },
    { 
      name: 'Pengembangan Perangkat Lunak dan GIM', 
      icon: 'Code', 
      category: 'TECH',
      description: 'Fokus pada arsitektur software, cloud-native development, dan ekosistem game development internasional.'
    },
    { 
      name: 'Teknik Mekatronika & Robotika', 
      icon: 'Cpu', 
      category: 'TECH',
      description: 'Integrasi sistem kontrol otomatis, robotika cerdas, dan IoT untuk revolusi industri 4.0.'
    },
    { 
      name: 'AI & Machine Learning', 
      icon: 'Brain', 
      category: 'TECH',
      description: 'Pengembangan model kecerdasan buatan, neural networks, dan deep learning untuk solusi masa depan.'
    },
    { 
      name: 'Big Data Analytics', 
      icon: 'Database', 
      category: 'TECH',
      description: 'Pengolahan data skala besar dan analisis prediktif untuk pengambilan keputusan strategis berbasis data.'
    },
  ];
  const createdMajors = await prisma.major.createManyAndReturn({ data: majorsData, select: { id: true, name: true } });
  console.log(`${createdMajors.length} majors created.`);

  // Seed Curriculums
  const curriculumsData = [
    {
      title: "Silabus TKJ Kelas X",
      majorId: createdMajors.find(m => m.name === 'Teknik Jaringan Komputer dan Telekomunikasi')?.id || '',
      fileUrl: "https://example.com/silabus-tkj-x.pdf",
      version: "1.0",
      description: "Silabus mata pelajaran Teknik Jaringan Komputer untuk kelas X.",
      category: "SILABUS",
      contentLink: "https://example.com/tkj-x-silabus",
      status: "APPROVED"
    },
    {
      title: "ATP RPL Kelas XI",
      majorId: createdMajors.find(m => m.name === 'Pengembangan Perangkat Lunak dan GIM')?.id || '',
      fileUrl: "https://example.com/atp-rpl-xi.pdf",
      version: "1.1",
      description: "Alur Tujuan Pembelajaran untuk kelas XI Pengembangan Perangkat Lunak dan GIM.",
      category: "ATP",
      contentLink: "https://example.com/rpl-xi-atp",
      status: "PENDING"
    },
    {
      title: "Peta Kompetensi AI",
      majorId: createdMajors.find(m => m.name === 'AI & Machine Learning')?.id || '',
      fileUrl: "https://example.com/kompetensi-ai.pdf",
      version: "1.0",
      description: "Peta kompetensi lengkap untuk jurusan AI & Machine Learning.",
      category: "PETA_KOMPETENSI",
      contentLink: "https://example.com/ai-competency-map",
      status: "APPROVED"
    }
  ];
  await prisma.curriculum.createMany({ data: curriculumsData });
  console.log(`${curriculumsData.length} curriculums created.`);

  // Seed 5 News Articles
  const newsData = [
    {
      title: "SMK Bhairava Sukses Gelar UKK Berbasis Proyek Industri",
      content: "Ujian Kompetensi Keahlian (UKK) tahun ini di SMK Bhairava berjalan dengan sukses, mengusung konsep proyek nyata yang diberikan langsung oleh mitra industri. Siswa ditantang untuk menyelesaikan masalah riil yang dihadapi perusahaan, memberikan pengalaman kerja profesional sebelum mereka lulus. Metode ini terbukti efektif meningkatkan kesiapan kerja lulusan.",
      category: "ACHIEVEMENT",
      image: "/ujian kompetensi.jpeg",
    },
    {
      title: "Kolaborasi Baru dengan AWS: Siswa SMK Bhairava Siap Jadi Ahli Cloud",
      content: "SMK Bhairava resmi menjalin kerja sama dengan Amazon Web Services (AWS) melalui program AWS Academy. Kolaborasi ini memberikan siswa akses ke kurikulum cloud computing standar global, platform sandbox, dan kesempatan untuk mendapatkan sertifikasi internasional. Ini adalah langkah strategis untuk mencetak talenta digital yang kompeten di bidang teknologi cloud.",
      category: "INDUSTRY",
      image: "/prakrtik industri it.jpeg",
    },
    {
      title: "Inovasi Robot Cerdas Karya Siswa Mekatronika Raih Juara Nasional",
      content: "Tim robotika SMK Bhairava berhasil meraih Juara 1 dalam Kompetisi Robotika Nasional 2026. Mereka menciptakan robot sortir cerdas yang mampu membedakan objek berdasarkan warna dan ukuran dengan akurasi 99% menggunakan teknologi machine learning. Inovasi ini menarik perhatian juri dan beberapa perusahaan logistik.",
      category: "INNOVATION",
      image: "/making robot.jpeg",
    },
    {
      title: "PENGUMUMAN: Jadwal Pembekalan Praktik Kerja Lapangan (PKL) Semester Genap",
      content: "Diberitahukan kepada seluruh siswa kelas XI bahwa kegiatan pembekalan PKL akan dilaksanakan pada tanggal 25-27 Agustus 2026. Kehadiran bersifat wajib. Siswa diharapkan membawa semua dokumen persyaratan yang telah diinformasikan sebelumnya. Detail jadwal dan daftar perusahaan akan diumumkan di mading sekolah dan portal siswa.",
      category: "ANNOUNCEMENT",
      image: "/praktik industri.jpeg",
    },
    {
      title: "Workshop Hardware & Jaringan: Siswa TJKT Rakit Puluhan Server untuk Lab Sekolah",
      content: "Dalam rangka meningkatkan fasilitas, jurusan TJKT mengadakan workshop perakitan server selama dua hari. Siswa secara langsung merakit, mengkonfigurasi, dan melakukan instalasi sistem operasi pada puluhan unit server baru untuk lab komputer. Kegiatan ini memberikan pengalaman praktis yang sangat berharga dalam manajemen infrastruktur IT.",
      category: "EVENT",
      image: "/merakit pc.jpeg",
    },
  ];
  await prisma.news.createMany({ data: newsData });
  console.log(`${newsData.length} news articles created.`);

  // Seed Students (Simplified)
  const student1User = await prisma.user.create({
    data: {
      username: 'siswa1',
      password: await bcrypt.hash('siswa123', 10),
      name: 'Budi Santoso',
      role: 'STUDENT',
    }
  });
  const majorTJKT = createdMajors.find(m => m.name === 'Teknik Jaringan Komputer dan Telekomunikasi');
  if (majorTJKT) {
    await prisma.student.create({
      data: {
        name: 'Budi Santoso',
        nis: 'S26-001',
        nisn: '0010000001',
        gender: 'L',
        majorId: majorTJKT.id,
        userId: student1User.id,
      }
    });
  }

  const student2User = await prisma.user.create({
    data: {
      username: 'siswa2',
      password: await bcrypt.hash('siswa123', 10),
      name: 'Ani Rahayu',
      role: 'STUDENT',
    }
  });
  const majorAkuntansi = createdMajors.find(m => m.name === 'Akuntansi & Keuangan Lembaga');
  if (majorAkuntansi) {
    await prisma.student.create({
      data: {
        name: 'Ani Rahayu',
        nis: 'S26-002',
        nisn: '0010000002',
        gender: 'P',
        majorId: majorAkuntansi.id,
        userId: student2User.id,
      }
    });
  }
  console.log("2 dummy students created with hardcoded majors.");
  // console.log("30 dummy students with user accounts created."); // Removed
  console.log("--- Seeding finished successfully ---");
}

main().catch(e => { console.error("Seeding failed:", e); process.exit(1); }).finally(async () => await prisma.$disconnect());
