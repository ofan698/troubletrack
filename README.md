# 🛠 Trouble Tracker UPPKB

**Trouble Tracker UPPKB** adalah aplikasi pencatatan dan pemantauan gangguan perangkat IT di lingkungan Unit Pelaksana Penimbangan Kendaraan Bermotor (UPPKB). Dibangun untuk mendukung efisiensi kerja teknisi IT dengan pencatatan yang terstruktur, pencarian cepat, dan backup data yang mudah.

Proyek ini dikembangkan sebagai bagian dari Capstone Project dalam program **Student Developer Initiative** hasil kolaborasi **IBM x Hacktiv8**. IBM Granite digunakan sebagai alat bantu AI dalam proses pengembangan kode.

---

## 🔗 Demo Live (deploy)
👉 [https://troubletrack.vercel.app/](https://troubletrack.vercel.app/)*

---

## 🚀 Fitur Utama

- Tambah/edit/hapus data gangguan perangkat IT
- Kategori masalah (PC, CCTV, Jaringan, Timbangan, dll)
- Catatan lengkap: waktu lapor, unit, pelapor, status, dan solusi
- Filter berdasarkan kategori & status
- Export data ke file `.json` (untuk backup manual)
- Data tersimpan di `localStorage` (bisa dipakai offline)
- Antarmuka ringan dan responsif

---

## 🛠 Stack Teknologi

| Kategori     | Teknologi                    |
|--------------|------------------------------|
| Frontend     | HTML5, CSS3, JavaScript      |
| Penyimpanan  | Web Storage API (`localStorage`) |
| Export       | Blob API (ekspor file JSON)  |
| AI Support   | IBM Granite AI               |
| Deployment   | Netlify / Vercel             |

---

## ⚙️ Cara Menjalankan

1. Clone repo ini:
```bash
git clone https://github.com/namamu/trouble-tracker-uppkb.git
