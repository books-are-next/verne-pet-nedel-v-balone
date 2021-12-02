/* eslint-disable no-restricted-globals */

/* global self, caches, fetch */

const CACHE = 'cache-0345a92';

self.addEventListener('install', e => {
  e.waitUntil(precache()).then(() => self.skipWaiting());
});

self.addEventListener('activate', event => {
  self.clients
    .matchAll({
      includeUncontrolled: true,
    })
    .then(clientList => {
      const urls = clientList.map(client => client.url);
      console.log('[ServiceWorker] Matching clients:', urls.join(', '));
    });

  event.waitUntil(
    caches
      .keys()
      .then(cacheNames =>
        Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE) {
              console.log('[ServiceWorker] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
            return null;
          })
        )
      )
      .then(() => {
        console.log('[ServiceWorker] Claiming clients for version', CACHE);
        return self.clients.claim();
      })
  );
});

function precache() {
  return caches.open(CACHE).then(cache => cache.addAll(["./","./colophon.html","./favicon.png","./index.html","./manifest.json","./pet_nedel_v_balone_split_001.html","./pet_nedel_v_balone_split_003.html","./pet_nedel_v_balone_split_004.html","./pet_nedel_v_balone_split_005.html","./pet_nedel_v_balone_split_006.html","./pet_nedel_v_balone_split_007.html","./pet_nedel_v_balone_split_008.html","./pet_nedel_v_balone_split_009.html","./pet_nedel_v_balone_split_010.html","./pet_nedel_v_balone_split_011.html","./pet_nedel_v_balone_split_012.html","./pet_nedel_v_balone_split_013.html","./pet_nedel_v_balone_split_014.html","./pet_nedel_v_balone_split_015.html","./pet_nedel_v_balone_split_016.html","./pet_nedel_v_balone_split_017.html","./pet_nedel_v_balone_split_018.html","./pet_nedel_v_balone_split_019.html","./pet_nedel_v_balone_split_020.html","./pet_nedel_v_balone_split_021.html","./pet_nedel_v_balone_split_022.html","./pet_nedel_v_balone_split_023.html","./pet_nedel_v_balone_split_024.html","./pet_nedel_v_balone_split_025.html","./pet_nedel_v_balone_split_026.html","./pet_nedel_v_balone_split_027.html","./pet_nedel_v_balone_split_028.html","./pet_nedel_v_balone_split_029.html","./pet_nedel_v_balone_split_030.html","./pet_nedel_v_balone_split_031.html","./pet_nedel_v_balone_split_032.html","./pet_nedel_v_balone_split_033.html","./pet_nedel_v_balone_split_034.html","./pet_nedel_v_balone_split_035.html","./pet_nedel_v_balone_split_036.html","./pet_nedel_v_balone_split_037.html","./pet_nedel_v_balone_split_038.html","./pet_nedel_v_balone_split_039.html","./pet_nedel_v_balone_split_040.html","./pet_nedel_v_balone_split_041.html","./pet_nedel_v_balone_split_042.html","./pet_nedel_v_balone_split_043.html","./pet_nedel_v_balone_split_044.html","./pet_nedel_v_balone_split_045.html","./pet_nedel_v_balone_split_046.html","./pet_nedel_v_balone_split_047.html","./fonts/Literata-Italic-var.woff2","./fonts/Literata-var.woff2","./fonts/LiterataTT-TextItalic.woff2","./fonts/LiterataTT-TextRegular.woff2","./fonts/LiterataTT-TextSemibold.woff2","./fonts/LiterataTT_LICENSE.txt","./fonts/SpaceGroteskVF.woff2","./fonts/SpaceGroteskVF_LICENSE.txt","./resources/image001.jpg","./resources/image002.jpg","./resources/image003.jpg","./resources/image004.jpg","./resources/image005.jpg","./resources/image006.jpg","./resources/image007.jpg","./resources/image008.jpg","./resources/image009.jpg","./resources/image010.jpg","./resources/image011.jpg","./resources/image012.jpg","./resources/image013.jpg","./resources/image014.jpg","./resources/image015.jpg","./resources/image016.jpg","./resources/image017.jpg","./resources/image018.jpg","./resources/image019.jpg","./resources/image020.jpg","./resources/image021.jpg","./resources/image022.jpg","./resources/image023.jpg","./resources/image024.jpg","./resources/image025.jpg","./resources/image026.jpg","./resources/obalka_pet_nedel_v_balone.jpg","./resources/upoutavka_eknihy.jpg","./scripts/bundle.js","./style/style.min.css","./template-images/circles.png"]));
}

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.open(CACHE).then(cache => {
      return cache.match(e.request).then(matching => {
        if (matching) {
          console.log('[ServiceWorker] Serving file from cache.');
          console.log(e.request);
          return matching;
        }

        return fetch(e.request);
      });
    })
  );
});
