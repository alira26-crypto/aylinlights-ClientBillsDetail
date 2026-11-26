const C='albill-v13';
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(['./','./index.html'])));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x.startsWith('albill-')&&x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request,u=new URL(r.url);if(r.method!=='GET'||u.origin!==location.origin)return;
 e.respondWith(caches.open(C).then(c=>fetch(r,{cache:'no-store'}).then(res=>{if(res.ok)c.put(r.mode==='navigate'?'./index.html':r,res.clone());return res}).catch(()=>c.match(r.mode==='navigate'?'./index.html':r,{ignoreSearch:true}).then(x=>x||c.match('./')))))});
