export default async function handler(req, res) {
  const id = String(req.query?.id || '').trim();

  if (!/^\d+$/.test(id)) {
    return res.status(400).json({ error: 'Player ID tidak valid.' });
  }

  const key = process.env.FF_API_KEY;
  if (!key) {
    return res.status(500).json({ error: 'FF_API_KEY belum dikonfigurasi di Vercel.' });
  }

  const endpoint = `https://hyerls.my.id/api/cekidff.php?key=${encodeURIComponent(key)}&id=${encodeURIComponent(id)}`;

  try {
    const response = await fetch(endpoint, {
      headers: { Accept: 'application/json' }
    });

    const text = await response.text();
    let data;
    try { data = JSON.parse(text); }
    catch { data = { response: text }; }

    if (!response.ok) {
      return res.status(response.status).json({
        error: data?.message || data?.error || 'API Free Fire gagal merespons.',
        upstream: data
      });
    }

    return res.status(200).json(data);
  } catch (error) {
    return res.status(502).json({
      error: 'Tidak dapat terhubung ke API Free Fire.',
      detail: error.message
    });
  }
}
