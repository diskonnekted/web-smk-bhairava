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
  console.log("Database cleared.");

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
  const createdMajors = await prisma.major.createManyAndReturn({ data: majorsData });
  console.log(`${createdMajors.length} majors created.`);

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

  // Seed 30 Students and create User accounts for them
  const studentNames = ['Adi', 'Agus', 'Ahmad', 'Aisha', 'Bagus', 'Bayu', 'Bintang', 'Cahya', 'Cinta', 'Dafa', 'Dian', 'Dimas', 'Eka', 'Fajar', 'Fitri', 'Galih', 'Hana', 'Indah', 'Joko', 'Kartika', 'Lia', 'Maya', 'Nanda', 'Putra', 'Putri', 'Rian', 'Rina', 'Sari', 'Tia', 'Yoga'];
  
  for (let i = 0; i < 30; i++) {
    const major = random(createdMajors);
    const nis = `S26-${1000 + i}`;
    const studentPassword = await bcrypt.hash(nis, 10); // Password is the student's NIS
    const user = await prisma.user.create({
      data: {
        username: nis,
        password: studentPassword,
        name: `${studentNames[i]}`,
        role: 'STUDENT',
      }
    });
    
    const student = await prisma.student.create({
      data: {
        name: `${studentNames[i]}`,
        nis: nis,
        nisn: `00${5000 + i}`,
        gender: i % 3 === 0 ? 'P' : 'L',
        majorId: major.id,
        userId: user.id,
      }
    });

    // Seed data for the first 5 students
    if (i < 5) {
      // Attendance
      for (let d = 0; d < 10; d++) {
        const date = new Date();
        date.setDate(date.getDate() - d);
        await prisma.attendance.create({
          data: {
            studentId: student.id,
            date: date,
            status: d % 7 === 0 ? 'SAKIT' : 'HADIR',
            note: d % 7 === 0 ? 'Izin sakit dengan surat' : 'Hadir tepat waktu'
          }
        });
      }

      // Fees
      for (let m = 0; m < 3; m++) {
        const dueDate = new Date();
        dueDate.setMonth(dueDate.getMonth() + m);
        await prisma.feePayment.create({
          data: {
            studentId: student.id,
            amount: 500000,
            dueDate: dueDate,
            status: m === 0 ? 'PAID' : 'PENDING',
            paidDate: m === 0 ? new Date() : null
          }
        });
      }

      // Grades
      const teachers = await prisma.teacher.findMany(); // Fetch all teachers
      const randomTeacher = teachers.length > 0 ? random(teachers) : null;

      const subjects = ['Matematika', 'Bahasa Indonesia', 'Bahasa Inggris', 'Informatika'];
      for (const subject of subjects) {
        if (randomTeacher) {
          await prisma.grade.create({
            data: {
              studentId: student.id,
              teacherId: randomTeacher.id,
              subject,
              score: 75 + Math.floor(Math.random() * 20),
              semester: 1,
              academicYear: '2025/2026'
            }
          });
        }
      }

      // Counseling
      if (randomTeacher) {
        await prisma.counselingSession.create({
          data: {
            studentId: student.id,
            teacherId: randomTeacher.id,
            date: new Date(),
            topic: 'Konsultasi Karir & Minat',
            status: 'BOOKED'
          }
        });
      }
    }
  }
  console.log("30 dummy students with user accounts created.");
  console.log("--- Seeding finished successfully ---");
}

main().catch(e => { console.error("Seeding failed:", e); process.exit(1); }).finally(async () => await prisma.$disconnect());
