let CACHE_NAME = "v1_cache_chocodokas";
let FILES_TO_CACHE = [
    "/offline.html"
];

self.addEventListener("install", (evt)=>{
    evt.waitUntil(
        caches.open(CACHE_NAME).then((cache)=>{
            console.log("[ServiceWorker] Cache aberto com sucesso!");
            return cache.addAll(FILES_TO_CACHE);
        })
    )

    self.skipWaiting();
});

self.addEventListener("activate", (evt)=>{
    evt.waitUntil(
        caches.keys().then((keyList)=>{
            return Promise.all(keyList.map((key)=>{
                if(key !== CACHE_NAME){
                    console.log("[ServiceWorker] Limpando o cache antigo! ", key);
                    return caches.delete(key);
                }
            }));
        })
    )
    self.clients.claim();
});

self.addEventListener("fetch", (evt)=>{
    console.log("[ServiceWorker] Fetch", evt.request.url);
    if(evt.request.mode !== "navigate"){
        // Verifica a conexão com a insternet
        return;
    }
    evt.respondWith(
        fetch(evt.request).catch(()=>{
            return caches.open(CACHE_NAME).then(()=>{
                return caches.match("offline.html");
            })
        })
    )
});




