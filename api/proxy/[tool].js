const API_BASE = "https://hyerls.my.id/api";

const ENDPOINTS = {
  ytsearch: "ytsearch.php",
  lyric: "lyric.php",
  ytplay: "ytplayv2.php",
  spotify: "spotify.php",
  ytmp4: "ytmp4.php",
  ytmp3: "ytmp3.php",
  ytshort: "ytshort.php",
  igdownload: "igdownload.php",
  pint: "pint.php",
  animetoreal: "animetoreal.php",
  nanobanana: "nanobanana.php",
  unliai: "unliai.php",
  ssl: "ssl.php",
  fakeaddress: "fakeaddress.php",
  dbgenerator: "dbgenerator.php",
  randomuser: "randomuser.php",
  hash: "hash.php",
  decode64: "decode64.php",
  base64: "base64.php",
  strengthpass: "strengthpass.php",
  generatepass: "strengthpass.php",
  textanalisis: "textanalisis.php",
  screenshot: "screenshot.php",
  ogmail: "ogmail.php",
  wdomain: "wdomain.php",
  ipintelligence: "ipintelligence.php",
  otp: "otp.php",
  tqr: "tqr.php"
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" }
  });
}

export default async function handler(request) {
  const url = new URL(request.url);
  const parts = url.pathname.split("/").filter(Boolean);
  const tool = parts.at(-1);
  const endpoint = ENDPOINTS[tool];

  if (!endpoint) return json({ success: false, message: "Tool tidak ditemukan." }, 404);

  const apiKey = process.env.HYERLS_API_KEY;
  if (!apiKey) return json({ success: false, message: "HYERLS_API_KEY belum diatur di Vercel Environment Variables." }, 500);

  const params = new URLSearchParams(url.search);
  params.delete("tool");
  params.set("key", apiKey);

  const upstreamUrl = `${API_BASE}/${endpoint}?${params.toString()}`;

  try {
    const upstream = await fetch(upstreamUrl, {
      method: "GET",
      headers: { accept: "application/json, text/plain, */*", "user-agent": "PIDZ-Tools/2.0" },
      signal: AbortSignal.timeout(55000),
      cache: "no-store"
    });

    const contentType = upstream.headers.get("content-type") || "";
    const body = await upstream.arrayBuffer();
    const headers = new Headers();
    headers.set("cache-control", "no-store");
    if (contentType) headers.set("content-type", contentType);
    const contentDisposition = upstream.headers.get("content-disposition");
    if (contentDisposition) headers.set("content-disposition", contentDisposition);

    if (!upstream.ok) {
      let detail = new TextDecoder().decode(body).slice(0, 1200);
      return json({ success: false, message: `Rumah API mengembalikan HTTP ${upstream.status}.`, detail }, upstream.status);
    }

    return new Response(body, { status: 200, headers });
  } catch (error) {
    const message = error?.name === "TimeoutError"
      ? "Rumah API terlalu lama merespons (timeout 55 detik)."
      : `Tidak dapat terhubung ke Rumah API: ${error?.message || "network error"}`;
    return json({ success: false, message, target: endpoint }, 502);
  }
}
