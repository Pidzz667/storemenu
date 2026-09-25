'use client';
import {useEffect,useMemo,useState} from "react";
import {ArrowLeft,Download,Search,Copy,Image as ImageIcon,Music,Video,Gamepad2,ShieldCheck,Wand2,Database,Globe,Code2,LockKeyhole,UserRound,QrCode,RefreshCw} from "lucide-react";
type Tool={id:string;name:string;desc:string;icon:any;fields:{key:string;label:string;placeholder:string}[]};
const tools:Tool[]=[
["ytsearch.php","YouTube Search","Cari video YouTube",Search,[["q","Judul video","Contoh: lofi hip hop"]]],
["ytplayv2.php","YouTube Play","Ambil media",Video,[["q","Judul","Judul lagu / video"]]],
["ytmp4.php","YouTube MP4","Download video",Video,[["url","URL YouTube","https://youtube.com/watch?v=..."]]],
["ytmp3.php","YouTube MP3","Download audio",Music,[["url","URL YouTube","https://youtube.com/watch?v=..."]]],
["ytshort.php","YouTube Shorts","Download Shorts",Video,[["url","URL Shorts","https://youtube.com/shorts/..."]]],
["spotify.php","Spotify Downloader","Ambil media Spotify",Music,[["url","URL Spotify","https://open.spotify.com/..."]]],
["igdownload.php","Instagram Download","Download media",ImageIcon,[["url","URL Instagram","https://instagram.com/..."]]],
["lyric.php","Lyrics","Cari lirik lagu",Music,[["q","Judul lagu","Judul - artis"]]],
["pint.php","Pinterest Search","Cari Pinterest",Search,[["query","Pencarian","wallpaper anime"]]],
["animetoreal.php","Anime To Real","Transformasi gambar",Wand2,[["url","URL gambar","https://..."]]],
["nanobanana.php","AI Image Editor","Edit gambar",Wand2,[["image","URL gambar","https://..."],["prompt","Prompt","Buat lebih cinematic"]]],
["unliai.php","Unlimited AI","AI text",Wand2,[["teks","Pesan","Tulis pertanyaan..."]]],
["ssl.php","SSL Checker","Cek SSL",ShieldCheck,[["url","Domain","google.com"]]],
["wdomain.php","Domain Detail","Info domain",Globe,[["domain","Domain","example.com"]]],
["ipintelligence.php","IP Intelligence","Info IP",Globe,[["ip","IP","8.8.8.8"]]],
["screenshot.php","Website Screenshot","Screenshot website",ImageIcon,[["url","URL","https://example.com"]]],
["otp.php","OTP Generator","Generate OTP",LockKeyhole,[["length","Panjang","6"]]],
["tqr.php","Text To QR","Buat QR",QrCode,[["text","Teks","Teks QR"],["size","Ukuran","400"]]],
["hash.php","Hash Generator","MD5 / SHA256",Code2,[["text","Teks","Teks..."],["type","Type","sha256"]]],
["base64.php","Base64 Encode","Encode Base64",Code2,[["text","Teks","Teks..."]]],
["decode64.php","Base64 Decode","Decode Base64",Code2,[["text","Base64","SGVsbG8="]]],
["strengthpass.php","Password Strength","Analisis password",LockKeyhole,[["password","Password","Password"]]],
["textanalisis.php","Text Analysis","Analisis teks",Code2,[["text","Teks","Masukkan teks"]]],
["randomuser.php","Random User","Data random",UserRound,[]],
["dbgenerator.php","Dataset Generator","Generate dataset",Database,[["limit","Jumlah","10"]]],
["cekidff.php","Free Fire ID","Cek ID Free Fire",Gamepad2,[["id","ID Free Fire","3616810990"]]],
["stalkffv2.php","Free Fire Stalk","Stalk akun FF",Gamepad2,[["uid","UID","UID Free Fire"]]],
["cekml.php","Mobile Legends","Cek ID ML",Gamepad2,[["id","ID","ID ML"],["server","Server","1234"]]],
["supersus.php","SuperSus","Cek ID SuperSus",Gamepad2,[["id","ID","ID SuperSus"]]],
["stalkttv1.php","TikTok Stalk","Info akun TikTok",UserRound,[["username","Username","username"]]],
["igstalkv2.php","Instagram Stalk","Info akun Instagram",UserRound,[["username","Username","username"]]],
["robloxstalk.php","Roblox Stalk","Info akun Roblox",Gamepad2,[["username","Username","username"]]]
].map(x=>({id:x[0],name:x[1],desc:x[2],icon:x[3],fields:(x[4] as any[]).map(v=>({key:v[0],label:v[1],placeholder:v[2]}))}));
const cats=[["All","Semua",Globe],["Download","Video & audio",Download],["AI","AI & gambar",Wand2],["Game","Game",Gamepad2],["Developer","Developer",Code2],["Utility","Utility",Database]];
const game=new Set(["cekidff.php","stalkffv2.php","cekml.php","supersus.php","stalkttv1.php","igstalkv2.php","robloxstalk.php"]);
const dl=new Set(["ytmp4.php","ytmp3.php","ytshort.php","spotify.php","igdownload.php","ytplayv2.php"]);
const ai=new Set(["animetoreal.php","nanobanana.php","unliai.php"]);
const dev=new Set(["ssl.php","wdomain.php","ipintelligence.php","hash.php","base64.php","decode64.php","textanalisis.php"]);
function cat(id:string){if(dl.has(id))return"Download";if(ai.has(id))return"AI";if(game.has(id))return"Game";if(dev.has(id))return"Developer";return"Utility"}
export default function Home(){
 const[loading,setLoading]=useState(true),[filter,setFilter]=useState("All"),[tool,setTool]=useState<Tool|null>(null),[vals,setVals]=useState<Record<string,string>>({}),[res,setRes]=useState<any>(null),[busy,setBusy]=useState(false);
 useEffect(()=>{const t=setTimeout(()=>setLoading(false),1100);return()=>clearTimeout(t)},[]);
 const list=useMemo(()=>tools.filter(t=>filter==="All"||cat(t.id)===filter),[filter]);
 async function run(){if(!tool)return;setBusy(true);setRes(null);try{const q=new URLSearchParams({endpoint:tool.id});tool.fields.forEach(f=>q.set(f.key,vals[f.key]||""));const r=await fetch("/api/proxy?"+q);if(!r.ok)throw Error(await r.text()||"Request gagal");const ct=r.headers.get("content-type")||"";if(ct.includes("json"))setRes({m:"json",v:await r.json()});else if(ct.startsWith("image/"))setRes({m:"image",v:URL.createObjectURL(await r.blob())});else if(ct.startsWith("video/")||ct.startsWith("audio/")||ct.includes("octet-stream"))setRes({m:"file",v:URL.createObjectURL(await r.blob())});else setRes({m:"text",v:await r.text()})}catch(e:any){setRes({m:"error",v:e.message})}finally{setBusy(false)}}
 if(loading)return <div className="loader"><b>PIDZ TOOLS</b><i></i><span>Loading...</span></div>;
 return <main><header><strong><em>PIDZ</em> TOOLS</strong><small>PIDZ STORE</small></header>{!tool?<><section className="hero"><label>UTILITY HUB</label><h1>Tools yang<br/><em>langsung jalan.</em></h1><p>Download, AI, game, developer dan utility dalam satu dashboard.</p></section><nav>{cats.map(([n,d,I]:any)=><button className={filter===n?"on":""} onClick={()=>setFilter(n)} key={n}><I size={17}/><span>{n}<small>{d}</small></span></button>)}</nav><section className="grid">{list.map(t=>{const I=t.icon;return <button className="card" onClick={()=>{setTool(t);setVals({});setRes(null)}} key={t.id}><div className="ico"><I size={20}/></div><b>{t.name}</b><p>{t.desc}</p><span>→</span></button>})}</section></>:<section className="tool"><button className="back" onClick={()=>setTool(null)}><ArrowLeft size={17}/> Kembali</button><div className="heading"><div className="ico"><tool.icon size={23}/></div><div><label>PIDZ TOOL</label><h2>{tool.name}</h2><p>{tool.desc}</p></div></div><div className="form">{tool.fields.map(f=><label key={f.key}>{f.label}<input value={vals[f.key]||""} placeholder={f.placeholder} onChange={e=>setVals({...vals,[f.key]:e.target.value})}/></label>)}<button className="run" disabled={busy} onClick={run}>{busy?<><RefreshCw className="spin" size={17}/> Memproses...</>:<>Jalankan <span>→</span></>}</button></div>{res&&<div className="result"><div className="rhead"><b>RESULT</b>{(res.m==="text"||res.m==="json")&&<button onClick={()=>navigator.clipboard.writeText(typeof res.v==="string"?res.v:JSON.stringify(res.v,null,2))}><Copy size={14}/> Copy</button>}</div>{res.m==="error"&&<pre className="error">{res.v}</pre>}{res.m==="text"&&<pre>{res.v}</pre>}{res.m==="json"&&<pre>{JSON.stringify(res.v,null,2)}</pre>}{res.m==="image"&&<div className="media"><img src={res.v}/><a href={res.v} download="pidz-result.png"><Download size={16}/> Simpan</a></div>}{res.m==="file"&&<div className="media"><p>File diterima dari API.</p><a href={res.v} download><Download size={16}/> Download file</a></div>}</div>}</section>}<footer>PIDZ TOOLS · Developer by PIDZ STORE</footer></main>
                                                                                                                                                                                                                                                                                                                                               }
