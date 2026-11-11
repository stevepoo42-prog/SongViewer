// Offline support for live use.
// The app shell is cached on first load. After that every request tries the network first, but only for
// TIMEOUT ms: on a slow, flaky or internet-less Wi-Fi the saved copy is used instead, so the app always
// opens quickly. If the network answers later, the saved copy is refreshed in the background.
const CACHE = 'songviewer-v4';
const TIMEOUT = 2500;
const SHELL = ['./', './index.html', './preview.html', './manifest.json', './vendor/qrcode.min.js', './vendor/jsQR.js'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)));
  self.skipWaiting();
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith((async () => {
    const cache = await caches.open(CACHE);
    let bad = null;                                            // a non-OK answer (404/500), used only if there is nothing saved
    const net = fetch(e.request).then(r => {
      if (!r.ok) { bad = r; throw new Error('bad response'); }
      cache.put(e.request, r.clone());
      return r;
    });
    e.waitUntil(net.catch(() => {}));                          // let a slow request finish and refresh the saved copy
    const saved = () => cache.match(e.request, { ignoreSearch: true });
    try {
      const first = await Promise.race([net, new Promise(res => setTimeout(() => res(null), TIMEOUT))]);
      if (first) return first;                                 // network was quick enough
      return (await saved()) || net;                           // too slow: use the saved copy (or keep waiting if there is none)
    } catch (err) {
      return (await saved()) || bad || Promise.reject(err);    // offline or error
    }
  })());
});
