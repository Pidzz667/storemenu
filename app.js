const API="https://hyerls.my.id/api/";
const KEY="PREMIUM04JFHDUDJAISKXNRNDIAKNX";

const tools={
 download:[
  {id:"ytplay",name:"YouTube Play",icon:"▶",desc:"Cari & putar video",fields:[["q","Judul / kata kunci","text"]],endpoint:"ytplayv2.php",map:{q:"q"}},
  {id:"spotify",name:"Spotify Downloader",icon:"♫",desc:"Download dari URL Spotify",fields:[["url","URL Spotify","url"]],endpoint:"spotify.php",map:{url:"url"}},
  {id:"ytmp4",name:"YouTube MP4",icon:"▣",desc:"Download video YouTube",fields:[["url","URL YouTube","url"]],endpoint:"ytmp4.php",map:{url:"url"}},
  {id:"ytmp3",name:"YouTube MP3",icon:"♫",desc:"Download audio YouTube",fields:[["url","URL YouTube","url"]],endpoint:"ytmp3.php",map:{url:"url"}},
  {id:"shorts",name:"YouTube Shorts",icon:"▯",desc:"Download YouTube Shorts",fields:[["url","URL Shorts","url"]],endpoint:"ytshort.php",map:{url:"url"}},
  {id:"instagram",name:"Instagram Download",icon:"◎",desc:"Download Reel / media publik",fields:[["url","URL Instagram","url"]],endpoint:"igdownload.php",map:{url:"url"}}
 ],
 search:[
  {id:"ytsearch",name:"YouTube Search",icon:"⌕",desc:"Cari video YouTube",fields:[["q","Judul video","text"]],endpoint:"ytsearch.php",map:{q:"q"}},
  {id:"lyrics",name:"Search Lyrics",icon:"♫",desc:"Cari lirik lagu",fields:[["q","Judul lagu / artis","text"]],endpoint:"lyric.php",map:{q:"q"}},
  {id:"pinterest",name:"Pinterest Search",icon:"P",desc:"Cari konten Pinterest",fields:[["query","Kata kunci","text"]],endpoint:"pint.php",map:{query:"query"}}
 ],
 ai:[
  {id:"animereal",name:"Anime To Real",icon:"✦",desc:"Transform gambar anime",fields:[["url","Link gambar anime","url"]],endpoint:"animetoreal.php",map:{url:"url"}},
  {id:"editor",name:"Image Editor AI",icon:"✧",desc:"Edit gambar dengan prompt",fields:[["image","Link gambar","url"],["prompt","Perintah edit","text"]],endpoint:"nanobanana.php",map:{image:"image",prompt:"prompt"}},
  {id:"unliai",name:"Unlimited Chat AI",icon:"AI",desc:"Chat dengan AI",fields:[["teks","Pesan","textarea"]],endpoint:"unliai.php",map:{teks:"teks"}}
 ],
 utility:[
  {id:"fakeaddress",name:"Fake Address Generator",icon:"⌖",desc:"Generate data alamat fiktif",fields:[],endpoint:"fakeaddress.php",map:{}},
  {id:"dataset",name:"Dataset Generator",icon:"▦",desc:"Generate dataset",fields:[["limit","Jumlah data","number"]],endpoint:"dbgenerator.php",map:{limit:"limit"}},
  {id:"randomuser",name:"Random Data",icon:"♙",desc:"Generate random user data",fields:[],endpoint:"randomuser.php",map:{}},
  {id:"otp",name:"OTP Generator",icon:"#",desc:"Generate kode OTP",fields:[["length","Panjang OTP","number"]],endpoint:"otp.php",map:{length:"length"}},
  {id:"qr",name:"Text To QR Code",icon:"▣",desc:"Buat QR dari teks",fields:[["text","Teks","text"],["size","Ukuran","number"]],endpoint:"tqr.php",map:{text:"text",size:"size"}},
  {id:"password",name:"Generate Password",icon:"♢",desc:"Buat password kuat",fields:[["password","Password / basis teks","text"]],endpoint:"strengthpass.php",map:{password:"password"}}
 ],
 security:[
  {id:"ssl",name:"SSL Checker",icon:"◈",desc:"Periksa SSL domain",fields:[["url","Domain / URL","text"]],endpoint:"ssl.php",map:{url:"url"}},
  {id:"hash",name:"Hash Generator",icon:"#",desc:"MD5 / SHA-256",fields:[["text","Teks","text"],["type","Hash type","select","md5|sha256"]],endpoint:"hash.php",map:{text:"text",type:"type"}},
  {id:"decode64",name:"Base64 Decode",icon:"↓",desc:"Decode Base64",fields:[["text","Base64","textarea"]],endpoint:"decode64.php",map:{text:"text"}},
  {id:"encode64",name:"Base64 Encode",icon:"↑",desc:"Encode ke Base64",fields:[["text","Teks","textarea"]],endpoint:"base64.php",map:{text:"text"}},
  {id:"strength",name:"Password Strength",icon:"◆",desc:"Analisis kekuatan password",fields:[["password","Password","password"]],endpoint:"strengthpass.php",map:{password:"password"}},
  {id:"textanalysis",name:"Text Analysis",icon:"≡",desc:"Analisis teks",fields:[["text","Teks","textarea"]],endpoint:"textanalisis.php",map:{text:"text"}},
  {id:"screenshot",name:"Website Screenshot",icon:"▣",desc:"Screenshot halaman publik",fields:[["url","URL website","url"]],endpoint:"screenshot.php",map:{url:"url"}},
  {id:"domain",name:"Domain Detail",icon:"◉",desc:"Informasi domain",fields:[["domain","Domain","text"]],endpoint:"wdomain.php",map:{domain:"domain"}},
  {id:"ip",name:"IP Intelligence",icon:"◎",desc:"Informasi IP publik",fields:[["ip","IP (kosong = IP kamu)","text"]],endpoint:"ipintelligence.php",map:{ip:"ip"},omitEmpty:["ip"]}
 ]
};

const categories=[
 {id:"download",name:"Download",icon:"⇩",desc:"Media downloader"},
 {id:"search",name:"Search",icon:"⌕",desc:"Cari media & lyrics"},
 {id:"ai",name:"AI & Creative",icon:"✦",desc:"AI & image tools"},
 {id:"utility",name:"Utilities",icon:"◈",desc:"Generator serbaguna"},
 {id:"security",name:"Security",icon:"◇",desc:"Web & text utilities"}
];

function allTools(){return Object.values(tools).flat()}
function toolById(id){return allTools().find(x=>x.id===id)}
function categoryOf(id){return Object.keys(tools).find(k=>tools[k].some(x=>x.id===id))}
function goHome(){
 document.querySelector(".sidebar")?.classList.remove("open");
 location.hash="";
 renderHome();
}
function toggleSidebar(){document.querySelector(".sidebar").classList.toggle("open")}
function toggleTheme(){
 document.body.classList.toggle("light");
 if(document.body.classList.contains("light")){
   document.documentElement.style.setProperty("--bg","#f7f4fb");
   document.documentElement.style.setProperty("--text","#21152e");
   document.documentElement.style.setProperty("--panel","rgba(255,255,255,.8)");
   document.documentElement.style.setProperty("--line","rgba(70,35,100,.12)");
 }else{
   document.documentElement.style.setProperty("--bg","#090510");
   document.documentElement.style.setProperty("--text","#f8f5ff");
   document.documentElement.style.setProperty("--line","rgba(255,255,255,.09)");
 }
}
function renderHome(){
 const app=document.getElementById("app");
 app.innerHTML=`
 <section class="hero"><div class="hero-glow"></div><div class="eyebrow">WEB UTILITY SUITE</div>
 <h1>PIDZ TOOLS</h1><p>Kumpulan tools web dalam satu dashboard. Download, search, AI, generator, sampai utilitas keamanan, dibungkus UI ungu yang tidak terlihat seperti tugas sekolah tahun 2012.</p></section>
 <div class="section-head"><div><h2>Categories</h2><p>Pilih kategori untuk masuk ke halaman tools khusus</p></div></div>
 <div class="categories">${categories.map(c=>`<button class="cat" onclick="showCategory('${c.id}')"><div class="cat-icon">${c.icon}</div><h3>${c.name}</h3><p>${c.desc} • ${tools[c.id].length} tools</p></button>`).join("")}</div>
 <div class="section-head"><div><h2>All Tools</h2><p>${allTools().length} tools tersedia</p></div></div>
 <div class="tools-grid">${allTools().map(t=>toolCard(t)).join("")}</div>
 <footer>PIDZ TOOLS • BUILT FOR FAST WEB UTILITIES</footer>`;
}
function toolCard(t){return `<button class="tool-card" onclick="openTool('${t.id}')"><div class="tool-icon">${t.icon}</div><div><h3>${t.name}</h3><p>${t.desc}</p></div></button>`}
function showCategory(id){
 document.querySelector(".sidebar")?.classList.remove("open");
 const c=categories.find(x=>x.id===id); if(!c)return;
 document.getElementById("app").innerHTML=`
 <div class="page-head"><button class="back" onclick="goHome()">←</button><div><h1>${c.icon} ${c.name}</h1><p>${c.desc} • ${tools[id].length} tools</p></div></div>
 <div class="tools-grid">${tools[id].map(t=>toolCard(t)).join("")}</div>`;
}
function openTool(id){
 const t=toolById(id); if(!t)return;
 const inputs=t.fields.map(f=>{
   const [key,label,type,opts]=f;
   if(type==="textarea")return `<div class="field"><label>${label}</label><textarea id="f_${key}" placeholder="${label}"></textarea></div>`;
   if(type==="select")return `<div class="field"><label>${label}</label><select id="f_${key}">${opts.split("|").map(o=>`<option value="${o}">${o.toUpperCase()}</option>`).join("")}</select></div>`;
   return `<div class="field"><label>${label}</label><input id="f_${key}" type="${type}" placeholder="${label}"></div>`;
 }).join("");
 document.getElementById("app").innerHTML=`
 <div class="page-head"><button class="back" onclick="showCategory('${categoryOf(id)}')">←</button><div><h1>${t.icon} ${t.name}</h1><p>${t.desc}</p></div></div>
 <section class="tool-panel"><div>${inputs||`<div class="empty">Tool ini tidak membutuhkan input. Klik tombol untuk menjalankan.</div>`}
 <button class="btn" onclick="runTool('${id}')">RUN TOOL</button><div id="result" class="result"></div></div></section>`;
}
function buildUrl(t){
 const p=new URLSearchParams(); p.set("key",KEY);
 for(const [key,param] of Object.entries(t.map)){
   const el=document.getElementById("f_"+key); const value=el?.value??"";
   if(t.omitEmpty?.includes(key) && !value.trim())continue;
   p.set(param,value);
 }
 return API+t.endpoint+"?"+p.toString();
}
async function runTool(id){
 const t=toolById(id), box=document.getElementById("result");
 box.className="result show"; box.innerHTML=`<div class="loading"><span class="spinner"></span> Memproses request...</div>`;
 try{
   const res=await fetch(buildUrl(t),{method:"GET"});
   const type=res.headers.get("content-type")||"";
   if(type.includes("application/json")){
     const data=await res.json();
     renderResult(data,box);
   }else{
     const text=await res.text();
     if(type.startsWith("image/")) box.innerHTML=`<img src="${URL.createObjectURL(new Blob([text]))}" style="max-width:100%">`;
     else box.innerHTML=`<pre>${escapeHtml(text)}</pre>`;
   }
 }catch(e){
   box.innerHTML=`<pre>Request gagal.\n\n${escapeHtml(e.message)}\n\nJika dibuka dari file://, deploy ke hosting HTTPS. Browser bisa memblokir API karena CORS.</pre>`;
 }
}
function renderResult(data,box){
 if(typeof data==="string"){box.innerHTML=`<pre>${escapeHtml(data)}</pre>`;return}
 let html="";
 if(data?.result?.url) html+=`<div style="margin-bottom:12px"><a href="${safeUrl(data.result.url)}" target="_blank" rel="noopener" class="btn" style="display:block;text-align:center;text-decoration:none">OPEN RESULT</a></div>`;
 if(data?.url && typeof data.url==="string") html+=`<div style="margin-bottom:12px"><a href="${safeUrl(data.url)}" target="_blank" rel="noopener" class="btn" style="display:block;text-align:center;text-decoration:none">OPEN RESULT</a></div>`;
 html+=`<pre>${escapeHtml(JSON.stringify(data,null,2))}</pre>`;
 box.innerHTML=html;
}
function safeUrl(u){try{return new URL(u).href}catch{return "#"}}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}
window.addEventListener("hashchange",()=>route());
function route(){
 const h=location.hash.replace("#","");
 if(!h)renderHome();
 else if(h.startsWith("cat-"))showCategory(h.slice(4));
 else if(h.startsWith("tool-"))openTool(h.slice(5));
}
renderHome();
setTimeout(()=>{document.getElementById("intro")?.remove()},3900);
