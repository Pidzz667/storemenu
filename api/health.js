export default function handler(req, res) {
  res.status(200).json({ ok: true, service: "PIDZ TOOLS proxy", message: "Vercel Function aktif" });
}
