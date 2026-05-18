Berikut adalah **4 Template Excel Standar Dapodik** yang sudah disesuaikan dengan struktur resmi Kemendikbud, siap Anda copy-paste ke Excel/Google Sheets, dan langsung bisa dijadikan modul import untuk dashboard admin web SMK Bhairava.

---
### 📘 1. DATA SATUAN PENDIDIKAN (F-SP)
| Kolom Wajib Dapodik | Contoh Data 1 | Contoh Data 2 | Validasi/Format |
|---------------------|---------------|---------------|-----------------|
| NPSN | `20123456` | `20123457` | 8 digit angka, unik |
| Nama Sekolah | `SMK Bhairava` | `SMK Bhairava 2` | Teks |
| Status Sekolah | `Swasta` | `Negeri` | Dropdown: Negeri/Swasta |
| Alamat Jalan | `Jl. Teknologi Digital No. 10` | `Jl. Industri Kreatif No. 5` | Teks |
| RT / RW | `003 / 005` | `001 / 002` | Format: XX / XX |
| Kelurahan / Kecamatan | `Cilandak / Cilandak` | `Pancoran / Pancoran` | Teks |
| Kota / Kabupaten | `Jakarta Selatan` | `Depok` | Teks |
| Provinsi | `DKI Jakarta` | `Jawa Barat` | Dropdown provinsi |
| Kode Pos | `12430` | `16431` | 5 digit |
| Lintang / Bujur | `-6.261492 / 106.810600` | `-6.382910 / 106.845670` | Decimal (±) |
| Telepon | `021-7654321` | `021-9876543` | Format: kode-area-nomor |
| Email | `info@smkbhairava.sch.id` | `admin@smkbhairava2.sch.id` | Validasi email |
| Website | `https://smkbhairava.sch.id` | `-` | URL atau `-` |
| SK Pendirian | `SK-001/Yayasan/2020` | `SK-002/Disdik/2019` | Teks |
| Tgl SK Pendirian | `2020-07-15` | `2019-08-20` | YYYY-MM-DD |
| Status Kepemilikan | `Yayasan` | `Pemerintah Daerah` | Dropdown |
| Luas Tanah (m²) | `5200` | `4800` | Angka bulat |
| Status Tanah | `Milik Sendiri` | `Sewa` | Dropdown |
| Luas Bangunan (m²) | `3100` | `2900` | Angka bulat |
| Akreditasi | `B` | `A` | A/B/C/Belum/Tidak |
| Kurikulum | `Kurikulum Merdeka` | `K13` | Dropdown |

---
### 📗 2. DATA PESERTA DIDIK (F-PD)
*(Disederhanakan ke kolom wajib + kritis untuk import web)*
| Kolom Wajib | Contoh Data 1 | Contoh Data 2 | Validasi |
|-------------|---------------|---------------|----------|
| NISN | `0012345678` | `0012345679` | 10 digit, unik |
| NIK | `3201234567890001` | `3201234567890002` | 16 digit, wajib valid Dukcapil |
| Nama Lengkap | `Ahmad Rizky Pratama` | `Siti Nurhaliza` | Huruf kapital awal |
| Jenis Kelamin | `L` | `P` | L / P |
| Tempat Lahir | `Jakarta` | `Bandung` | Teks |
| Tanggal Lahir | `2010-05-15` | `2010-08-20` | YYYY-MM-DD |
| Agama | `Islam` | `Kristen` | Dropdown standar |
| Alamat | `Jl. Merdeka No. 12` | `Jl. Sudirman No. 5` | Teks |
| RT / RW | `004 / 006` | `002 / 003` | Format XX/XX |
| Kelurahan / Kecamatan | `Kebayoran / Kebayoran Baru` | `Coblong / Coblong` | Teks |
| Kota / Provinsi | `Jakarta Selatan / DKI Jakarta` | `Bandung / Jawa Barat` | Teks |
| No. HP Siswa | `081234567890` | `085678901234` | Format Indonesia |
| Email Siswa | `ahmad.rizky@student.smk.id` | `siti.n@student.smk.id` | Opsional, validasi email |
| NIK Ayah | `3201234567890010` | `3201234567890020` | 16 digit |
| Nama Ayah | `Budi Pratama` | `Hendra Gunawan` | Teks |
| Pekerjaan Ayah | `Wiraswasta` | `PNS` | Dropdown standar |
| Penghasilan Ayah | `Rp 5.000.000 - Rp 10.000.000` | `> Rp 10.000.000` | Dropdown range |
| NIK Ibu | `3201234567890011` | `3201234567890021` | 16 digit |
| Nama Ibu | `Dewi Lestari` | `Rina Kartika` | Teks |
| Pekerjaan Ibu | `Ibu Rumah Tangga` | `Guru` | Dropdown standar |
| Kelas Akhir | `X` | `X` | X/XI/XII |
| Jurusan | `TJKT` | `Akuntansi` | Sesuai jurusan sekolah |
| Status Peserta Didik | `Aktif` | `Aktif` | Aktif/Pindah/Keluar/Lulus |

---
### 📙 3. DATA PTK (Guru & Tenaga Kependidikan)
| Kolom Wajib | Contoh Data 1 | Contoh Data 2 | Validasi |
|-------------|---------------|---------------|----------|
| NUPTK | `1234567890123456` | `1234567890123457` | 16 digit, unik |
| NIK | `3171234567890001` | `3171234567890002` | 16 digit |
| NIP | `-` | `198501012010011001` | 18 digit (jika PNS/PPPK) |
| Nama Lengkap | `Drs. Andi Wijaya, M.Kom.` | `Ratna Sari, S.E., M.Ak.` | Teks + gelar |
| Jenis Kelamin | `L` | `P` | L / P |
| Tempat / Tgl Lahir | `Surabaya / 1985-03-10` | `Yogyakarta / 1990-07-22` | Format: Kota / YYYY-MM-DD |
| Agama | `Islam` | `Kristen` | Dropdown |
| No. HP | `08111222333` | `08566777888` | Format Indonesia |
| Email | `andi.w@smkbhairava.sch.id` | `ratna.s@smkbhairava.sch.id` | Validasi email |
| Status Kepegawaian | `GTY/PTY` | `PPPK` | Dropdown resmi Dapodik |
| SK Pengangkatan | `SK-005/2020` | `SK-012/2021` | Teks |
| TMT | `2020-08-15` | `2021-01-10` | YYYY-MM-DD |
| Pendidikan Terakhir | `S2` | `S1` | S1/S2/S3/D4/D3/D2/D1 |
| Jurusan | `Teknik Informatika` | `Akuntansi` | Teks |
| Mata Pelajaran Diampu | `Produktif TJKT, Pemrograman Web` | `Akuntansi Dasar, Perpajakan` | Bisa multi, dipisah koma |
| Jam Mengajar/Minggu | `24` | `24` | Angka (min 24 untuk sertifikasi) |
| Sertifikasi | `Ya` | `Tidak` | Ya/Tidak |
| No. Sertifikat | `123456789012` | `-` | 12 digit jika Ya |
| Tugas Pokok | `Guru` | `Guru` | Guru/Tendik/Kepsek/dll |

---
### 📕 4. DATA ROMBEL & PEMBELAJARAN
| Kolom | Contoh Data 1 | Contoh Data 2 | Validasi |
|-------|---------------|---------------|----------|
| Kode Rombel | `R001` | `R002` | Unik internal |
| Nama Rombel | `X TJKT 1` | `XI AK 2` | Format: Tingkat Jurusan No |
| Tingkat | `X` | `XI` | X/XI/XII |
| Jurusan | `TJKT` | `Akuntansi` | Sesuai data sekolah |
| Wali Kelas | `Drs. Andi Wijaya, M.Kom.` | `Ratna Sari, S.E., M.Ak.` | Nama PTK |
| Jumlah Siswa | `32` | `30` | Angka |
| Tahun Pelajaran | `2024/2025` | `2024/2025` | Format XXXX/YYYY |
| Semester | `1` | `2` | 1 / 2 |
| Mata Pelajaran | `Pemrograman Web` | `Akuntansi Keuangan` | Teks |
| Kurikulum | `Kurikulum Merdeka` | `Kurikulum Merdeka` | Dropdown |
| PTK Pengampu | `Drs. Andi Wijaya, M.Kom.` | `Ratna Sari, S.E., M.Ak.` | Nama PTK |
| JP/Minggu | `6` | `4` | Angka |
| Ruang | `Lab Komputer 1` | `Ruang Akuntansi` | Teks |
| Jadwal | `Senin: 07.30-09.00, Rabu: 09.30-11.00` | `Selasa: 07.30-09.00, Kamis: 10.00-11.30` | Format teks terstruktur |

---
### ✅ PANDUAN SETUP EXCEL & VALIDASI DATA
1. **Data Validation (Dropdown)**
   - Agama: `Islam,Kristen,Katolik,Hindu,Buddha,Konghucu`
   - Status Kepegawaian: `PNS,CPNS,PPPK,GTY/PTY,Honorer Yayasan,Tendik`
   - Jurusan: `TJKT,Akuntansi,Digital Marketing,AI & Machine Learning,Big Data`
   - Kurikulum: `Kurikulum Merdeka,K13`
2. **Format Cell**
   - Tanggal: `YYYY-MM-DD` (wajib agar kompatibel dengan API)
   - NIK/NISN/NPSN/NUPTK: Format `Number` tanpa desimal, atau `Text` dengan leading zero
   - Lintang/Bujur: `Custom` → `0.000000`
3. **Conditional Formatting**
   - Warnai baris jika `Status Peserta Didik = Lulus/Pindah`
   - Highlight jika `Jam Mengajar < 24` (guru belum sertifikasi)
   - Alert jika `NIK length ≠ 16`

---
### 🔗 INTEGRASI KE DASHBOARD WEB SMK BHAIRAVA
| Langkah | Teknis Implementasi |
|--------|---------------------|
| **1. Import Template** | Gunakan `CSV/Excel Parser` (SheetJS atau Laravel Excel / Python Pandas) di halaman admin `Data Master → Import Dapodik` |
| **2. Validasi Real-time** | Cek duplikasi NISN/NIK/NUPTK, validasi regex NIK 16 digit, cek format tanggal, mapping dropdown ke kode Dapodik |
| **3. Database Mapping** | Buat tabel: `schools`, `students`, `teachers`, `classes`, `subjects`, `class_subjects`. Gunakan foreign key & index pada NIK/NISN/NUPTK |
| **4. Sinkronisasi Dapodik Desktop** | Web hanya sebagai **sumber data terpusat**. Export final harus mengikuti format `.dapodik` atau CSV resmi agar bisa di-sync via aplikasi Dapodik resmi |
| **5. Audit Trail** | Catat `imported_by`, `imported_at`, `validation_status`, `error_rows` di tabel `import_logs` |

---
### ⚠️ CATATAN KRITIS
1. **Dapodik Resmi vs Web Internal**: Aplikasi Dapodik desktop adalah satu-satunya saluran valid ke Kemendikbud. Web Anda bisa menjadi **Single Source of Truth** internal, tapi export akhir harus kompatibel dengan template resmi.
2. **NIK & Dukcapil**: Integrasi NIK ke sistem Dukcapil memerlukan kerja sama Dinas Dukcapil setempat atau gunakan verifikasi mandiri via `API Cek NIK` berlisensi resmi.
3. **Kejujuran Data**: Data fiktif/duplikat dapat menyebabkan **penundaan BOS, PIP, atau tunjangan guru**. Tambahkan fitur `Flag Data Anomali` di dashboard.
4. **Backup & Versioning**: Simpan setiap versi import sebagai `snapshot_dapodik_YYYYMMDD.xlsx` agar bisa rollback jika ada kesalahan massal.

