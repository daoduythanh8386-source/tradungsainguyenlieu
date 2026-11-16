const C='oristar-v11',F=['./','index.html','app.js','data.js','scene.js','install.js','keypad.js','ui.js','greet.js','manifest.webmanifest','assets/oristar.jpg','assets/products.webp','assets/greeting.mp3','assets/iso9001.png','assets/icon-192.png','assets/icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(fetch(e.request).then(r=>{if(r.ok){const c=r.clone();caches.open(C).then(h=>h.put(e.request,c))}return r}).catch(()=>caches.match(e.request,{ignoreSearch:true})))});
