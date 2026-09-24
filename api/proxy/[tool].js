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
  textanalisis: "textanalisis.php",
  screenshot: "screenshot.php",
  ogmail: "ogmail.php",
  wdomain: "wdomain.php",
  ipintelligence: "ipintelligence.php",
  otp: "otp.php",
  tqr: "tqr.php"
};

export default async function handler(req, res) {
  const { tool } = req.query;

  if (!ENDPOINTS[tool]) {
    return res.status(404).json({
      success: false,
      message: "Tool tidak ditemukan"
    });
  }

  const apiKey = process.env.HYERLS_API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      success: false,
      message: "HYERLS_API_KEY belum disetting di Vercel"
    });
  }

  const params = new URLSearchParams();

  params.set("key", apiKey);

  for (const [key, value] of Object.entries(req.query)) {
    if (
      key !== "tool" &&
      value !== undefined &&
      value !== ""
    ) {
      params.set(key, Array.isArray(value) ? value[0] : value);
    }
  }

  const url =
    `${API_BASE}/${ENDPOINTS[tool]}?${params.toString()}`;

  try {
    const response = await fetch(url);

    const contentType =
      response.headers.get("content-type") || "";

    const data = await response.text();

    res.status(response.status);

    if (contentType.includes("application/json")) {
      try {
        return res.json(JSON.parse(data));
      } catch {
        return res.send(data);
      }
    }

    res.setHeader("Content-Type", contentType || "text/plain");
    return res.send(data);

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Gagal menghubungi Rumah API",
      error: error.message
    });
  }
}
