# Pidz Store — Free Fire ID Checker

Website cek ID Free Fire dengan tampilan modern dan animasi loading.

## Deploy ke Vercel

1. Upload folder ini ke GitHub, lalu import repository tersebut ke Vercel.
2. Di Vercel buka **Project → Settings → Environment Variables**.
3. Tambahkan:
   - Name: `FF_API_KEY`
   - Value: `PREMIUM04JFHDUDJAISKXNRNDIAKNX`
   - Environment: Production (dan Preview jika diperlukan)
4. Deploy ulang setelah menyimpan variable.
5. Buka domain Vercel dan masukkan Player ID.

API key sengaja dipanggil dari Vercel Function (`/api/cekid`) sehingga tidak ditulis di JavaScript frontend.

## Struktur

- `index.html` — UI website
- `api/cekid.js` — proxy/serverless function ke API Hyerls
- `vercel.json` — konfigurasi Vercel
