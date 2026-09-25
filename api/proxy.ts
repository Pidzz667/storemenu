import type { NextApiRequest, NextApiResponse } from "next";

const API_BASE = "https://hyerls.my.id";
const KEY = process.env.RUMAH_API_KEY || "PREMIUM04JFHDUDJAISKXNRNDIAKNX";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(405).json({error:"Method not allowed"});
  const raw = String(req.query.path || "");
  if (!raw.startsWith("/api/") || raw.includes("://") || raw.includes("..")) return res.status(400).json({error:"Invalid API path"});
  const params = new URLSearchParams();
  for (const [k,v] of Object.entries(req.query)) {
    if (k === "path") continue;
    if (typeof v === "string" && v) params.set(k,v);
  }
  params.set("key", KEY);
  try {
    const upstream = await fetch(`${API_BASE}${raw}?${params.toString()}`, {headers:{accept:"application/json, */*"}});
    const ct = upstream.headers.get("content-type") || "";
    res.status(upstream.status);
    if (ct.includes("application/json")) return res.json(await upstream.json());
    const text = await upstream.text();
    if (ct.startsWith("image/") || ct.startsWith("video/") || ct.startsWith("audio/")) {
      res.setHeader("content-type",ct); return res.send(Buffer.from(text));
    }
    try { return res.json(JSON.parse(text)); } catch { return res.json({raw:text}); }
  } catch(e) { return res.status(502).json({error:"Upstream API request failed",detail:String(e)}); }
}
