export default async function handler() {
  const configured = Boolean(process.env.HYERLS_API_KEY);
  if (!configured) return Response.json({ ok: false, rumahApiKey: false }, { status: 500 });
  return Response.json({ ok: true, rumahApiKey: true, runtime: "vercel-node" });
}
