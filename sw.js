var CACHE_NAME = 'easyenglish-v2';
var STATIC_CACHE = 'ee-static-v2';

// Core files to pre-cache on install
var CORE_FILES = [
  'index.html','style.css','nav.js','theme.js','common.js','gamification.js',
  'favicon.svg','offline.html'
];

// Install: cache core files
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(STATIC_CACHE).then(function(cache) {
      return cache.addAll(CORE_FILES);
    })
  );
  self.skipWaiting();
});

// Activate: clean old caches
self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.filter(function(k) {
          return k !== CACHE_NAME && k !== STATIC_CACHE;
        }).map(function(k) { return caches.delete(k); })
      );
    })
  );
  self.clients.claim();
});

// Fetch: Network-first with cache fallback
self.addEventListener('fetch', function(e) {
  var req = e.request;
  // Skip non-GET and external requests
  if (req.method !== 'GET') return;
  if (req.url.indexOf('googleapis') > -1 || req.url.indexOf('unpkg') > -1 || req.url.indexOf('googletagmanager') > -1) {
    // CDN: cache-first
    e.respondWith(
      caches.match(req).then(function(cached) {
        return cached || fetch(req).then(function(r) {
          if (r && r.status === 200) {
            var rc = r.clone();
            caches.open(CACHE_NAME).then(function(c) { c.put(req, rc); });
          }
          return r;
        });
      })
    );
    return;
  }

  // Local files: network-first, fallback to cache, then offline page
  e.respondWith(
    fetch(req).then(function(r) {
      if (r && r.status === 200) {
        var rc = r.clone();
        caches.open(CACHE_NAME).then(function(c) { c.put(req, rc); });
      }
      return r;
    }).catch(function() {
      return caches.match(req).then(function(cached) {
        if (cached) return cached;
        // If it's a page request, show offline page
        if (req.headers.get('accept') && req.headers.get('accept').indexOf('text/html') > -1) {
          return caches.match('offline.html');
        }
      });
    })
  );
});
