Berdasarkan hasil pencarian, berikut adalah **contoh data standar DAPODIK (Data Pokok Pendidikan)** yang dikelola oleh Kemendikbud:

## 📊 **STRUKTUR DATA DAPODIK**

### **A. EMPAT ENTITAS UTAMA DAPODIK** [[1]]

Dapodik mengumpulkan data dari empat entitas pendidikan yang bersumber dari satuan pendidikan:

1. **Satuan Pendidikan** (Sekolah)
2. **Peserta Didik** (Siswa)
3. **Pendidik dan Tenaga Kependidikan** (Guru & Staff)
4. **Substansi Pendidikan** (Kurikulum, Pembelajaran)

---

### **B. CONTOH FORMAT DATA**

#### **1. DATA SATUAN PENDIDIKAN (SEKOLAH)**

**Identitas Sekolah:**
```
- NPSN (Nomor Pokok Sekolah Nasional): 8 digit angka [[61]]
- Nama Sekolah
- Status Sekolah (Negeri/Swasta)
- Alamat Lengkap
- Kode Pos
- Lintang/Bujur (GPS)
- Nomor Telepon/Email
- Website
- SK Pendirian Sekolah
- Tanggal SK Pendirian
- Status Kepemilikan (Pemerintah/Yayasan)
- SK Izin Operasional
```

**Data Tanah & Bangunan:** [[2]]
```
- Luas Tanah (m²)
- Status Tanah (Milik Sendiri/Sewa/dll)
- Jumlah Bangunan
- Luas Bangunan
- Kondisi Bangunan (Baik/Rusak Sedang/Rusak Berat)
```

**Sarana Prasarana:** [[3]]
```
- Jumlah Ruang Kelas
- Ruang Perpustakaan
- Ruang Laboratorium
- Ruang Praktik (untuk SMK)
- Ruang Pimpinan
- Ruang Guru
- Ruang Ibadah
- Ruang UKS
- Toilet Siswa/Guru
- Jumlah Buku
- Alat/Sarana Pembelajaran
```

---

#### **2. DATA PESERTA DIDIK (SISWA)**

**Data Pribadi:** [[16]]
```
- NISN (Nomor Induk Siswa Nasional) [[66]]
- NIK (Nomor Induk Kependudukan) - Integrasi Dukcapil [[2]]
- Nama Lengkap
- Tempat Lahir
- Tanggal Lahir
- Jenis Kelamin (L/P)
- Agama (Islam/Kristen/Katolik/Hindu/Buddha/Kong Hu Chu)
- Kewarganegaraan
- Alamat Lengkap
- RT/RW
- Desa/Kelurahan
- Kecamatan
- Kode Pos
```

**Data Keluarga:** [[16]]
```
- Nama Ayah Kandung
- Tahun Lahir Ayah
- Pendidikan Ayah
- Pekerjaan Ayah
- Penghasilan Ayah
- Nama Ibu Kandung
- Tahun Lahir Ibu
- Pendidikan Ibu
- Pekerjaan Ibu
- Penghasilan Ibu
- Nama Wali (jika ada)
```

**Data Akademik:**
```
- Tanggal Masuk Sekolah
- Kelas/Rombel
- Nomor Peserta Ujian
- Nomor Ijazah
- Nomor SKHUN
- Prestasi yang Pernah Diraih
- Beasiswa yang Diterima
- Status (Aktif/Pindah/Keluar/Lulus)
```

**Contoh Format Tabel Siswa:**

| NISN | NIK | Nama | L/P | Tgl Lahir | Agama | Alamat | Kelas |
|------|-----|------|-----|-----------|-------|--------|-------|
| 0012345678 | 3201234567890001 | Ahmad Rizki | L | 2010-05-15 | Islam | Jl. Merdeka No.10 | X TJKT 1 |
| 0012345679 | 3201234567890002 | Siti Aminah | P | 2010-08-20 | Islam | Jl. Sudirman No.25 | X AK 1 |

---

#### **3. DATA PENDIDIK & TENAGA KEPENDIDIKAN (PTK)**

**Data Pribadi:** [[4]]
```
- NUPTK (Nomor Unik Pendidik dan Tenaga Kependidikan)
- NIK (Nomor Induk Kependudukan)
- NIP (bagi PNS)
- Nama Lengkap
- Tempat Lahir
- Tanggal Lahir
- Jenis Kelamin
- Agama
- Alamat Lengkap
- Status Perkawinan
- Nama Istri/Suami
```

**Data Kepegawaian:** [[4]]
```
- Status Kepegawaian (PNS/CPNS/GTT/PTT/Honorer)
- SK Pengangkatan
- Tanggal SK Pengangkatan
- Lembaga Pengangkat
- TMT (Terhitung Mulai Tanggal)
- Status Tugas (Aktif/Cuti/Belajar/dll)
```

**Data Kualifikasi & Kompetensi:** [[4]]
```
- Pendidikan Terakhir (SD/SMP/SMA/D1/D2/D3/S1/S2/S3)
- Jurusan/Gelar Akademik
- Tahun Lulus
- Sertifikasi Pendidik (Ya/Tidak)
- Nomor Sertifikasi
- Tahun Sertifikasi
- Mata Pelajaran yang Diampu
- Jumlah Jam Mengajar per Minggu
```

**Contoh Format Tabel Guru:**

| NUPTK | NIK | Nama | Pendidikan | Mapel | Jam/Minggu | Status |
|-------|-----|------|------------|-------|------------|--------|
| 1234567890123456 | 3201234567890001 | Drs. Budi Santoso, M.Pd | S1 Teknik Informatika | Produktif TJKT | 24 | PNS |
| 1234567890123457 | 3201234567890002 | Siti Nurhaliza, S.E | S1 Akuntansi | Akuntansi | 24 | GTT |

---

#### **4. DATA SUBSTANSI PENDIDIKAN**

**Rombongan Belajar (Rombel):** [[1]]
```
- Nama Rombel (Contoh: X TJKT 1, XI AK 2)
- Tingkat Pendidikan (X/XI/XII)
- Jurusan/Kompetensi Keahlian
- Wali Kelas
- Jumlah Siswa
- Tahun Pelajaran
```

**Pembelajaran:** [[1]]
```
- Mata Pelajaran
- Kurikulum (KTSP/K13/Kurikulum Merdeka)
- Nama Guru Pengampu
- Kelas/Rombel
- Jumlah Jam Pelajaran
- Semester
```

**Jadwal Pelajaran:**
```
- Hari
- Jam Ke-
- Mata Pelajaran
- Kelas
- Ruang
- Guru
```

---

### **C. STANDAR KODE IDENTIFIKASI**

#### **1. NPSN (Nomor Pokok Sekolah Nasional)** [[61]][[64]]
- Format: 8 digit angka
- Contoh: 20345678
- Bersifat unik untuk setiap sekolah
- Berlaku nasional

#### **2. NISN (Nomor Induk Siswa Nasional)** [[66]][[68]]
- Format: 10 digit angka
- Contoh: 0012345678
- Unik untuk setiap siswa
- Berlaku seumur hidup

#### **3. NIK (Nomor Induk Kependudukan)** [[2]]
- Format: 16 digit angka
- Integrasi dengan Data Dukcapil Kemdagri
- Wajib untuk siswa dan PTK

#### **4. NUPTK (Nomor Unik Pendidik & Tenaga Kependidikan)**
- Format: 16 digit angka
- Unik untuk setiap guru/tenaga kependidikan

---

### **D. KODE REFERENSI STANDAR**

**Agama:** [[1]]
```
1. Islam
2. Kristen
3. Katolik
4. Hindu
5. Buddha
6. Kong Hu Chu
```

**Status Kepegawaian:** [[4]]
```
1. PNS
2. CPNS
3. GTT (Guru Tidak Tetap)
4. PTT (Pegawai Tidak Tetap)
5. Honorer
6. Guru Yayasan
```

**Kondisi Bangunan:** [[2]]
```
1. Baik
2. Rusak Sedang
3. Rusak Berat
```

---

### **E. SUMBER DATA & VERIFIKASI**

**Layanan Verval (Verifikasi & Validasi):** [[2]]
- Peserta Didik: http://nisn.data.kemdikbud.go.id
- Peserta Didik: http://vervalpd.data.kemdikbud.go.id
- PTK: http://vervalptk.data.kemdikbud.go.id
- Satuan Pendidikan: https://dapo.dikdasmen.go.id/

---

### **F. CONTOH DOKUMEN YANG DIPERLUKAN**

**Untuk Input Data Siswa Baru:** [[7]]
1. Akta Kelahiran
2. KK (Kartu Keluarga)
3. Ijazah SD/MI (untuk SMP) atau Ijazah SMP (untuk SMA/SMK)
4. Pas Foto
5. SKHUN

**Untuk Input Data Guru Baru:** [[4]]
1. Ijazah Terakhir
2. SK Pengangkatan
3. SK Pembagian Tugas
4. KTP & KK
5. Sertifikat Pendidik (jika ada)
6. NUPTK

---

### **G. MANFAAT DATA DAPODIK** [[5]]

Data Dapodik digunakan untuk:
1. **BOS** (Bantuan Operasional Sekolah)
2. **DAK Fisik** (Dana Alokasi Khusus)
3. **Tunjangan Guru** (Sertifikasi, Fungsional, Khusus)
4. **Program Indonesia Pintar (PIP)**
5. **Ujian Nasional/Asesmen Nasional**
6. **Perencanaan & Evaluasi Pendidikan**
7. **Akreditasi Sekolah**

---

## 📥 **CARA MENDAPATKAN TEMPLATE**

1. **Download dari Aplikasi Dapodik:**
   - Buka aplikasi Dapodik
   - Menu "Pusat Unduhan"
   - Pilih "Manajemen" → "Profil Sekolah" [[50]]

2. **Format Excel Formulir:**
   - Formulir F-PD (Peserta Didik)
   - Formulir F-PTK (Pendidik & Tenaga Kependidikan)
   - Formulir F-SP (Satuan Pendidikan) [[16]]

3. **Website Resmi:**
   - https://dapo.kemdikbud.go.id/
   - https://dapo.dikdasmen.go.id/

---

**Catatan Penting:**
- Data harus diisi sesuai kondisi **riil/nyata** di lapangan [[3]]
- Update data minimal **1x per semester** [[1]]
- Keakuratan data menjadi **tanggung jawab Kepala Sekolah** [[1]]
- Data yang tidak akurat dapat mengakibatkan **ketidaktepatan bantuan** yang diterima [[5]]

Apakah Anda membutuhkan contoh spesifik untuk entitas tertentu atau template Excel-nya?