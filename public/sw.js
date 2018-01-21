
self.addEventListener('install', event => {
    console.log('SW Installed')
    event.waitUntil(
        caches.open('hello-pwa-static')
            .then(cache => {
                cache.addAll([
                    '/',
                    '/index.html',
                    '/scripts/app.js'
                ])
            })
    )
})

self.addEventListener('activate', () => {
    console.log('SW Activated')
})

self.addEventListener('fetch', event => {
    event.respondWith(cacheFirst(event.request))
})

function cacheFirst(req){
    return caches.match(req)
    .then(res => {
        return res || fetch(req)
    })
}