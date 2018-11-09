var files = [
    "/desafio/index.html",
    "/desafio/manifest.json",
    "/desafio/estilo.css",
    "/desafio/img/face.png",
    "/desafio/img/Git.png",
    "/desafio/img/linkedin.png",
    "/desafio/img/perfil.png",
    "/desafio/service-worker.js",
    "/desafio/css/bootsrap.min.css",
    "/desafio/js/bootstrap.min.js"
  ];
  // dev only
  if (typeof files == 'undefined') {
    var files = [];
  } else {
    files.push('./');
  }
  
  var CACHE_NAME = 'feijao-v1';
  
  self.addEventListener('activate', function(event) {
    console.log('[SW] Activate');
    event.waitUntil(
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.map(function(cacheName) {
            if (CACHE_NAME.indexOf(cacheName) == -1) {
              console.log('[SW] Delete cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
  });
  
  self.addEventListener('install', function(event){
    console.log('[SW] Install');
    event.waitUntil(
      caches.open(CACHE_NAME).then(function(cache) {
        return Promise.all(
            files.map(function(file){
                return cache.add(file);
            })
        );
      })
    );
  });
  
