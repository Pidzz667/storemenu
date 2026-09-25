import {NextRequest} from "next/server";
const BASE="https://hyerls.my.id/api";
const allowed=new Set(["ytsearch.php","lyric.php","ytplayv2.php","spotify.php","ytmp4.php","ytmp3.php","ytshort.php","igdownload.php","pint.php","animetoreal.php","nanobanana.php","unliai.php","ssl.php","fakeaddress.php","dbgenerator.php","randomuser.php","hash.php","decode64.php","base64.php","strengthpass.php","textanalisis.php","screenshot.php","ogmail.php","wdomain.php","ipintelligence.php","otp.php","tqr.php","cekml.php","cekidff.php","supersus.php","fakecall.php","stalkttv1.php","igstalkv2.php","robloxstalk.php","stalkffv2.php"]);
export async function GET(req:NextRequest){
 try{
  const u=new URL(req.url), endpoint=u.searchParams.get("endpoint")||"";
  if(!allowed.has(endpoint)) return new Response("Endpoint tidak diizinkan",{status:403});
  const key=process.env.RUMAH_API_KEY;
  if(!key) return new Response("RUMAH_API_KEY belum diatur di Vercel",{status:500});
  const q=new URLSearchParams();
  u.searchParams.forEach((v,k)=>{if(k!=="endpoint"&&k!=="key")q.append(k,v)});
  q.set("key",key);
  const r=await fetch(`${BASE}/${endpoint}?${q}`,{cache:"no-store",redirect:"follow"});
  const h=new Headers();
  for(const n of ["content-type","content-length","content-disposition","cache-control"]){const v=r.headers.get(n);if(v)h.set(n,v)}
  if(!h.has("cache-control"))h.set("Cache-Control","no-store");
  return new Response(await r.arrayBuffer(),{status:r.status,headers:h});
 }catch(e){return new Response(e instanceof Error?e.message:"Proxy error",{status:500})}
}
