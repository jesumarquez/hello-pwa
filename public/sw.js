var staticAssets = [
    '/',
    '/index.html',
    '/scripts/app.js'
]

self.addEventListener('install', async event => {
    const cache = await caches.open('hello-pwa-static')
    cache.addAll(staticAssets)
    console.log('SW Installed')
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

async function cacheFirst(req){
    const res = await caches.match(req)
    return res || fetch(req)
}

async function networkFirst(req){
    const dynamicCache = await caches.open('hello-pwa-dynamic')
    try {
        const networkResponse = await fetch(req)
        dynamicCache.put(req, networkResponse.clone())
        return networkResponse
    } catch (error) {
        const cachedResponse = await dynamicCache.match(req) 
        return cachedResponse
    }
}