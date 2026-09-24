// PIDZ TOOLS Vercel Serverless Proxy
// Vercel: Settings -> Environment Variables -> HYERLS_API_KEY

const BASE = "https://hyerls.my.id/api/";
const ALLOWED = new Set([
  "ytsearch","lyric","ytplayv2","spotify","ytmp4","ytmp3","ytshort",
  "igdownload","pint","animetoreal","nanobanana","unliai","ssl",
  "fakeaddress","dbgenerator","randomuser","hash","decode64","base64",
  "strengthpass","textanalisis","screenshot","wdomain","ipintelligence",
  "otp","tqr"
]);

export default async function handler(req, res) {
  const origin = req.headers.origin || "*";
  const cors = {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Vary": "Origin"
  };
  if (req.method === "OPTIONS") {
    res.writeHead(204, cors);
    return res.end();
  }

  const { tool, ...params } = req.query || {};
  if (!tool || !ALLOWED.has(tool)) {
    res.writeHead(400, {...cors, "Content-Type":"application/json"});
    return res.end(JSON.stringify({success:false,error:"Tool tidak diizinkan"}));
  }

  const key = process.env.HYERLS_API_KEY;
  if (!key) {
    res.writeHead(500, {...cors, "Content-Type":"application/json"});
    return res.end(JSON.stringify({success:false,error:"HYERLS_API_KEY belum dipasang di Vercel"}));
  }

  const upstream = new URL(`${BASE}${tool}.php`);
  upstream.searchParams.set("key", key);

  for (const [k,v] of Object.entries(params)) {
    if (v !== undefined && v !== "") upstream.searchParams.set(k, Array.isArray(v) ? v[0] : String(v));
  }

  try {
    const r = await fetch(upstream.toString(), {
      headers: {"Accept":"*/*","User-Agent":"PIDZ-TOOLS/1.0"}
    });
    const body = Buffer.from(await r.arrayBuffer());
    res.writeHead(r.status, {
      "X-PIDZ-Upstream-Status": String(r.status),
      ...cors,
      "Content-Type": r.headers.get("content-type") || "application/octet-stream",
      "Cache-Control":"no-store"
    });
    return res.end(body);
  } catch (e) {
    res.writeHead(502, {...cors, "Content-Type":"application/json"});
    return res.end(JSON.stringify({
      success:false,
      error:"Gagal menghubungi API upstream",
      detail:String(e.message || e)
    }));
  }
}
