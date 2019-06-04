importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');
if (workbox) {
    workbox.setConfig({ debug: true })

    workbox.core.skipWaiting();
    workbox.core.clientsClaim();

    workbox.precaching.precacheAndRoute([

        { url: '/', revision: '060319-02' },
        { url: '/login', revision: '060319-02' }
    ]);

    workbox.routing.registerRoute(
        /^https:\/\/fonts\.gstatic\.com/,
        new workbox.strategies.CacheFirst({
            cacheName: 'google-fonts-webfonts',
            plugins: [
                new workbox.cacheableResponse.Plugin({
                    statuses: [0, 200],
                }),
                new workbox.expiration.Plugin({
                    maxAgeSeconds: 60 * 60 * 24 * 365,
                }),
            ],
        }),
    );

    workbox.routing.registerRoute(
        /\.(?:js|css)$/,
        new workbox.strategies.StaleWhileRevalidate(
            {
                cacheName: 'static-cache'
            }
        )
    );

    // workbox.routing.registerRoute(
    //     '/',
    //     new workbox.strategies.NetworkFirst({
    //         cacheName: 'ls-hp-html',
    //         plugins: [
    //             new workbox.expiration.Plugin({
    //                 maxAgeSeconds: 7 * 24 * 60 * 60,
    //             })
    //         ]
    //     })
    // );


    workbox.routing.registerRoute(
        /\.(?:png|jpg|jpeg|svg|gif)$/,
        new workbox.strategies.CacheFirst({
            cacheName: 'image-cache',
            plugins: [
                new workbox.expiration.Plugin({
                    maxEntries: 100,
                    maxAgeSeconds: 7 * 24 * 60 * 60,
                })
            ],
        })
    );

}