# PIDZ TOOLS

Website tools SPA dengan:
- Intro animation PIDZ TOOLS
- UI dark purple / neon
- Efek glow, glass, 3D hover dan animasi
- Kategori tools terpisah
- Halaman khusus setiap tool
- Responsive mobile
- API integration sesuai endpoint yang diberikan
- URL hash routing tanpa framework

## Menjalankan
1. Upload `index.html`, `style.css`, dan `app.js` ke hosting.
2. Buka website melalui HTTPS.
3. Jangan mengandalkan `file://` karena browser bisa memblokir request API akibat CORS.

## Catatan penting
API key saat ini berada di `app.js`, sehingga dapat dilihat pengunjung. Untuk production, pindahkan API request ke backend/proxy milik sendiri dan simpan key sebagai environment variable.

Tool `OSINT Gmail` sengaja tidak diaktifkan di template ini karena endpoint tersebut dapat digunakan untuk mencari informasi terkait akun/email orang lain. Tambahkan hanya bila penggunaan dan datanya memang berwenang.
