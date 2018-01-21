
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
    const req = event.request
    const url = new URL(req.url)
    if(url.origin === location.origin){
        event.respondWith(cacheFirst(req))
    } else {
        event.respondWith(networkFirst(req))
    }
})

function cacheFirst(req){
    return caches.match(req)
    .then(res => {
        return res || fetch(req)
    })
}

function networkFirst(req){
    return caches.open('hello-pwa-dynamic')
        .then(cache => {
            try {
                return fetch(req)
                    .then(res => {
                        cache.put(req, res.clone())
                        return res
                    })
            } catch (error) {
                return cache.match(req) 
                    .then(res => {
                        return res
                    })
            }
        })
}