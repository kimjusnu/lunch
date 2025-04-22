const CACHE_NAME = "lunchmenu-cache-v1";

const STATIC_ASSETS = [
    "/",
    "/manifest.json",
    "/favicon.ico",
    "/icons/icon-192x192.png",
    "/icons/icon-512x512.png",
    "/offline.html",
];

self.addEventListener("install", event => {
    console.log("✅ Service Worker: Install");
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_ASSETS))
    );
    self.skipWaiting();
});

self.addEventListener("activate", event => {
    console.log("✅ Service Worker: Activate");
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(
                keys.map(key => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }
                })
            )
        )
    );
    self.clients.claim();
});

self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(cached => {
            return (
                cached ||
                fetch(event.request).catch(() => caches.match("/offline.html"))
            );
        })
    );
});
