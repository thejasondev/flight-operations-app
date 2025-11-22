// Service Worker para Panel Operaciones Aéreas
// Proporciona caché básico offline del shell de la app y recursos estáticos

const CACHE_VERSION = 'vra-ops-cache-v1';
const APP_SHELL = [
  '/',
  '/offline',
  '/site.webmanifest',
  '/logo/logo-ops.png',
  '/logo/logo-ops.webp',
  '/logo/web-app-manifest-192x192.png',
  '/logo/web-app-manifest-512x512.png',
  '/logo/apple-touch-icon.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_VERSION)
          .map((key) => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;

  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // Navegación (páginas): estrategia network-first con fallback al shell
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const responseClone = response.clone();
          caches.open(CACHE_VERSION).then((cache) => {
            cache.put(request, responseClone);
          });
          return response;
        })
        .catch(async () => {
          const cached = await caches.match(request);
          if (cached) return cached;
          const offlinePage = await caches.match('/offline');
          if (offlinePage) return offlinePage;
          return caches.match('/');
        })
    );
    return;
  }

  // Recursos estáticos del mismo origen: estrategia cache-first
  if (url.origin === self.location.origin) {
    if (
      url.pathname.startsWith('/logo/') ||
      url.pathname.endsWith('.css') ||
      url.pathname.endsWith('.js') ||
      url.pathname.endsWith('.woff2') ||
      url.pathname.endsWith('.woff') ||
      url.pathname.endsWith('.ttf')
    ) {
      event.respondWith(
        caches.match(request).then((cached) => {
          if (cached) return cached;
          return fetch(request).then((response) => {
            const responseClone = response.clone();
            caches.open(CACHE_VERSION).then((cache) => cache.put(request, responseClone));
            return response;
          });
        })
      );
    }
  }
});
