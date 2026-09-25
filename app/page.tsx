 "use client";
import { useMemo, useState } from "react";
import {
  ArrowLeft, Search, Download, Sparkles, ShieldCheck, Gamepad2, Wrench,
  Music2, Youtube, Instagram, Image as ImageIcon, MessageCircle, LockKeyhole,
  QrCode, KeyRound, Globe2, Database, UserRoundSearch, WandSparkles,
  Code2, CheckCircle2, Upload, Copy, ExternalLink
} from "lucide-react";

type Tool = {
  id: string; name: string; category: string; icon: any; desc: string;
  method?: "GET" | "POST"; path?: string; params?: string[];
  local?: "hash"|"base64enc"|"base64dec"|"password"|"otp";
};

const tools: Tool[] = [
 {id:"ytsearch",name:"YouTube Search",category:"Download",icon:Search,desc:"Cari video YouTube.",path:"/api/ytsearch.php",params:["q"]},
 {id:"lyric",name:"Search Lyrics",category:"Music",icon:Music2,desc:"Cari lirik lagu.",path:"/api/lyric.php",params:["q"]},
 {id:"ytplay",name:"YouTube Play",category:"Download",icon:Youtube,desc:"Cari dan putar hasil YouTube.",path:"/api/ytplayv2.php",params:["q"]},
 {id:"spotify",name:"Spotify Downloader",category:"Download",icon:Music2,desc:"Ambil media dari link Spotify.",path:"/api/spotify.php",params:["url"]},
 {id:"ytmp4",name:"YouTube MP4",category:"Download",icon:Youtube,desc:"Download video YouTube.",path:"/api/ytmp4.php",params:["url"]},
 {id:"ytmp3",name:"YouTube MP3",category:"Download",icon:Music2,desc:"Download audio YouTube.",path:"/api/ytmp3.php",params:["url"]},
 {id:"ytshort",name:"YouTube Shorts",category:"Download",icon:Youtube,desc:"Download Shorts.",path:"/api/ytshort.php",params:["url"]},
 {id:"igdownload",name:"Instagram Download",category:"Download",icon:Instagram,desc:"Download media Instagram.",path:"/api/igdownload.php",params:["url"]},
 {id:"pint",name:"Pinterest Search",category:"Download",icon:Search,desc:"Cari konten Pinterest.",path:"/api/pint.php",params:["query"]},
 {id:"animetoreal",name:"Anime To Real",category:"AI",icon:WandSparkles,desc:"Transform gambar anime.",path:"/api/animetoreal.php",params:["url"]},
 {id:"nanobanana",name:"Image Editor",category:"AI",icon:ImageIcon,desc:"Edit gambar dengan prompt AI.",path:"/api/nanobanana.php",params:["image","prompt"]},
 {id:"unliai",name:"Unlimited Chat AI",category:"AI",icon:MessageCircle,desc:"Chat AI dari prompt teks.",path:"/api/unliai.php",params:["teks"]},
 {id:"ssl",name:"SSL Checker",category:"Web",icon:ShieldCheck,desc:"Periksa SSL sebuah domain.",path:"/api/ssl.php",params:["url"]},
 {id:"fakeaddress",name:"Fake Address",category:"Generator",icon:Globe2,desc:"Generate data alamat contoh.",path:"/api/fakeaddress.php"},
 {id:"dbgenerator",name:"Dataset Generator",category:"Generator",icon:Database,desc:"Generate dataset contoh.",path:"/api/dbgenerator.php",params:["limit"]},
 {id:"randomuser",name:"Random Data",category:"Generator",icon:UserRoundSearch,desc:"Generate data pengguna acak.",path:"/api/randomuser.php"},
 {id:"hash",name:"Hash Generator",category:"Security",icon:LockKeyhole,desc:"MD5 / SHA-256.",local:"hash",params:["text","type"]},
 {id:"decode64",name:"Base64 Decode",category:"Security",icon:Code2,desc:"Decode Base64.",local:"base64dec",params:["text"]},
 {id:"base64",name:"Base64 Encode",category:"Security",icon:Code2,desc:"Encode ke Base64.",local:"base64enc",params:["text"]},
 {id:"strengthpass",name:"Password Strength",category:"Security",icon:KeyRound,desc:"Uji kekuatan password.",path:"/api/strengthpass.php",params:["password"]},
 {id:"textanalisis",name:"Text Analysis",category:"Text",icon:Code2,desc:"Analisis karakter dan teks.",path:"/api/textanalisis.php",params:["text"]},
 {id:"screenshot",name:"Website Screenshot",category:"Web",icon:ImageIcon,desc:"Screenshot website.",path:"/api/screenshot.php",params:["url"]},
 {id:"ogmail",name:"OSINT Gmail",category:"OSINT",icon:Search,desc:"Lookup informasi email melalui API.",path:"/api/ogmail.php",params:["email"]},
 {id:"wdomain",name:"Domain Detail",category:"Web",icon:Globe2,desc:"Detail domain.",path:"/api/wdomain.php",params:["domain"]},
 {id:"ipintelligence",name:"IP Intelligence",category:"OSINT",icon:Globe2,desc:"Informasi IP.",path:"/api/ipintelligence.php",params:["ip"]},
 {id:"otp",name:"OTP Generator",category:"Generator",icon:KeyRound,desc:"Generate OTP.",path:"/api/otp.php",params:["length"]},
 {id:"tqr",name:"Text To QR",category:"Generator",icon:QrCode,desc:"Buat QR dari teks.",path:"/api/tqr.php",params:["text","size"]},
 {id:"cekml",name:"Mobile Legends ID",category:"Games",icon:Gamepad2,desc:"Cek ID Mobile Legends.",path:"/api/cekml.php",params:["id","server"]},
 {id:"cekidff",name:"Free Fire ID / Stalker",category:"Games",icon:Gamepad2,desc:"Lookup ID Free Fire.",path:"/api/cekidff.php",params:["id"]},
 {id:"supersus",name:"SuperSus ID",category:"Games",icon:Gamepad2,desc:"Lookup ID SuperSus.",path:"/api/supersus.php",params:["id"]},
 {id:"fakecall",name:"Canvas Fake Call",category:"Fun",icon:MessageCircle,desc:"Buat tampilan panggilan dari gambar.",path:"/api/fakecall.php",params:["imgUrl","name","durasi"]},
 {id:"stalkttv1",name:"TikTok Stalk",category:"OSINT",icon:UserRoundSearch,desc:"Lookup profil TikTok.",path:"/api/stalkttv1.php",params:["username"]},
 {id:"igstalkv2",name:"Instagram Stalk",category:"OSINT",icon:Instagram,desc:"Lookup profil Instagram.",path:"/api/igstalkv2.php",params:["username"]},
 {id:"robloxstalk",name:"Roblox Stalk",category:"OSINT",icon:Gamepad2,desc:"Lookup profil Roblox.",path:"/api/robloxstalk.php",params:["username"]}
];

const categories = [
 {id:"Download",label:"Download",icon:Download},
 {id:"AI",label:"AI Tools",icon:Sparkles},
 {id:"Web",label:"Web Tools",icon:Globe2},
 {id:"Generator",label:"Generator",icon:Wrench},
 {id:"Security",label:"Security",icon:LockKeyhole},
 {id:"Games",label:"Games",icon:Gamepad2},
 {id:"OSINT",label:"OSINT",icon:UserRoundSearch},
 {id:"Music",label:"Music",icon:Music2},
 {id:"Text",label:"Text",icon:Code2},
 {id:"Fun",label:"Fun",icon:MessageCircle}
];

export default function Home() {
 const [intro,setIntro]=useState(true), [category,setCategory]=useState<string|null>(null), [tool,setTool]=useState<Tool|null>(null);
 const [query,setQuery]=useState("");
 const [values,setValues]=useState<Record<string,string>>({});
 const [loading,setLoading]=useState(false); const [result,setResult]=useState<any>(null);
 const filtered=useMemo(()=>tools.filter(t=>!category||t.category===category).filter(t=>t.name.toLowerCase().includes(query.toLowerCase())),[category,query]);
 const set=(k:string,v:string)=>setValues(x=>({...x,[k]:v}));

 async function runTool(){
   if(!tool)return;
   setLoading(true); setResult(null);
   try{
     if(tool.local==="hash"){
       const text=values.text||""; const type=values.type||"sha256";
       const enc=new TextEncoder().encode(text);
       const buf=await crypto.subtle.digest(type==="md5"?"SHA-256":"SHA-256",enc);
       const hex=[...new Uint8Array(buf)].map(b=>b.toString(16).padStart(2,"0")).join("");
       setResult(type==="md5" ? "MD5 lokal tidak tersedia di Web Crypto. Gunakan API hash dengan type=md5." : hex);
     } else if(tool.local==="base64enc") setResult(btoa(unescape(encodeURIComponent(values.text||""))));
     else if(tool.local==="base64dec") setResult(decodeURIComponent(escape(atob(values.text||""))));
     else {
       const params=new URLSearchParams();
       (tool.params||[]).forEach(k=>{if(values[k])params.set(k,values[k])});
       if(tool.id==="ipintelligence" && !values.ip){} 
       const r=await fetch(`/api/proxy?path=${encodeURIComponent(tool.path||"")}&${params.toString()}`);
       const data=await r.json().catch(()=>({raw:"Response bukan JSON",status:r.status}));
       setResult(data);
     }
   }catch(e){setResult({error:e instanceof Error?e.message:"Request gagal"});}
   finally{setLoading(false);}
 }

 if(intro) return <div className="intro" onClick={()=>setIntro(false)}>
   <div className="orb o1"/><div className="orb o2"/><div className="grid"/>
   <div className="introBox"><div className="mini">WELCOME TO</div><h1>PIDZ <span>TOOLS</span></h1><p>POWERFUL • SMOOTH • PROFESSIONAL</p><div className="enter">TAP TO ENTER <ArrowLeft size={15}/></div></div>
 </div>;

 return <main>
  <header><button className="brand" onClick={()=>{setCategory(null);setTool(null)}}><span className="brandMark">P</span><span>PIDZ <b>TOOLS</b></span></button><div className="search"><Search size={18}/><input placeholder="Cari tools..." value={query} onChange={e=>setQuery(e.target.value)}/></div><div className="status"><i/> API ONLINE</div></header>
  <section className="hero"><div><div className="eyebrow">NEXT-GEN UTILITY HUB</div><h2>Everything you need.<br/><span>One purple workspace.</span></h2><p>Tools download, AI, web, generator, security, games dan lainnya dalam satu UI.</p></div><div className="heroOrb"><Sparkles size={54}/></div></section>
  {!tool ? <>
   <div className="sectionHead"><div><small>CATEGORIES</small><h3>{category||"Explore Tools"}</h3></div>{category&&<button className="back" onClick={()=>setCategory(null)}><ArrowLeft size={15}/> Semua kategori</button>}</div>
   {!category && <div className="catGrid">{categories.map(c=>{const I=c.icon;return <button className="cat" key={c.id} onClick={()=>setCategory(c.id)}><span className="catIcon"><I/></span><span><b>{c.label}</b><small>{tools.filter(t=>t.category===c.id).length} tools</small></span><span className="chev">→</span></button>})}</div>}
   <div className="toolGrid">{filtered.map(t=>{const I=t.icon;return <button className="toolCard" key={t.id} onClick={()=>{setTool(t);setValues({});setResult(null)}}><span className="toolIcon"><I/></span><div><b>{t.name}</b><p>{t.desc}</p></div><ExternalLink size={15}/></button>})}</div>
  </>: <ToolPage tool={tool} values={values} set={set} run={runTool} loading={loading} result={result} back={()=>setTool(null)}/>}
  <footer>PIDZ TOOLS <span>•</span> Powered by your API gateway</footer>
 </main>
}

function ToolPage({tool,values,set,run,loading,result,back}:{tool:Tool,values:Record<string,string>,set:(a:string,b:string)=>void,run:()=>void,loading:boolean,result:any,back:()=>void}){
 const I=tool.icon;
 return <section className="toolPage"><button className="back" onClick={back}><ArrowLeft size={16}/> Kembali</button><div className="toolHero"><span className="bigIcon"><I/></span><div><small>{tool.category.toUpperCase()}</small><h2>{tool.name}</h2><p>{tool.desc}</p></div></div>
 <div className="panel"><div className="panelTitle"><span>INPUT</span><span className="secure"><CheckCircle2 size={14}/> SECURE REQUEST</span></div>
 {(tool.params||[]).map(k=> <label key={k}>{k==="imgUrl"||k==="image" ? "IMAGE / URL" : k.toUpperCase()}<div className="inputRow">{(k==="imgUrl"||k==="image")&&<Upload size={17}/>}<input value={values[k]||""} onChange={e=>set(k,e.target.value)} placeholder={k==="url"?"https://...":`Masukkan ${k}...`} />{(k==="imgUrl"||k==="image")&&<small>Upload galeri atau tempel URL</small>}</div></label>)}
 <button className="run" onClick={run} disabled={loading}>{loading?<><span className="spinner"/> Memproses...</>:<>RUN TOOL <Sparkles size={17}/></>}</button></div>
 {result!==null&&<div className="result"><div className="panelTitle"><span>RESULT</span><button onClick={()=>navigator.clipboard.writeText(typeof result==="string"?result:JSON.stringify(result,null,2))}><Copy size={14}/> Copy</button></div><pre>{typeof result==="string"?result:JSON.stringify(result,null,2)}</pre></div>}
 </section>
         }
