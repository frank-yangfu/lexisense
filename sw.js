/* 辞源 · Service Worker
   策略：stale-while-revalidate —— 有缓存立即返回（秒开、离线可用），同时后台更新，下次刷新生效 */
var CACHE = 'lexisense-v3';
var ASSETS = [
  './',
  './index.html',
  './data-core.js',
  './data-skill.js',
  './data-primary.js',
  './data-junior.js',
  './data-senior.js',
  './data-gskill-a.js',
  './data-gskill-b.js',
  './data-enrich.js',
  './data-curriculum.js',
  './app.js',
  './manifest.json',
  './icon.svg'
];

self.addEventListener('install', function (e) {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(function (c) {
    return Promise.all(ASSETS.map(function (u) {
      return c.add(u).catch(function () { });
    }));
  }));
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET') return;
  var url = new URL(req.url);
  if (url.origin !== location.origin) return;

  e.respondWith(
    caches.open(CACHE).then(function (c) {
      return c.match(req).then(function (hit) {
        var net = fetch(req).then(function (res) {
          if (res && res.status === 200 && res.type === 'basic') c.put(req, res.clone());
          return res;
        }).catch(function () { return hit; });
        return hit || net;
      });
    })
  );
});
