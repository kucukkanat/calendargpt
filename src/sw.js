const cacheName = "v1.5.0";
const precacheList = ["/"];

self.addEventListener("install", (e) => {
  console.log("[Service Worker] Install");
  skipWaiting();
  e.waitUntil(
    (async () => {
      const cache = await caches.open(cacheName);
      console.log("[Service Worker] Caching all: app shell and content");
      try {
        const r = await cache.addAll(precacheList);
      } catch (err) {
        console.log(`An error occured while caching: ${err}`);
      }
    })()
  );
});

self.addEventListener("fetch", (e) => {
  if (e.request.url.includes("chrome-extension")) {
    return;
  }
  e.respondWith(
    (async () => {
      const r = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (r) {
        return r;
      }
      const response = await fetch(e.request);
      const cache = await caches.open(cacheName);

      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })()
  );
});

//Clear cache on activate
self.addEventListener("activate", (e) => {
  console.log(caches.keys(), `being removed from caches`);
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key === cacheName) {
            return;
          }
          return caches.delete(key);
        })
      );
    })
  );
});
