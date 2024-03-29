//Asignar nombre y versión de la cache 

const CACHE_NAME = 'v1_cache_oscar_barrantes_pwa';

//Ficheros a cachear en la aplicación 

var urlToCache = [
  './',
  './css/styles.css',
  './img/favicon.png',
  './img/1.png',
  './img/2.png',
  './img/3.png',
  './img/4.png',
  './img/5.png',
  './img/6.png',
  './img/facebook.png',
  './img/twitter.png',
  './img/instagram.png',
  './img/favicon-1024.png',
  './img/favicon-512.png',
  './img/favicon-384.png',
  './img/favicon-256.png',
  './img/favicon-192.png',
  './img/favicon-128.png',
  './img/favicon-96.png',
  './img/favicon-64.png',
  './img/favicon-32.png',
  './img/favicon-16.png',
];

//Evento install 
//Instalación del service worker y guardar en cache los recursos estáticos 
self.addEventListener('install', e =>{ 
  e.waitUntil(
    caches.open(CACHE_NAME)
          .then(cache=>{
            return cache.addAll(urlToCache)
                        .then(() =>{
                          self.skipWaiting();
                        });
                        
                        })

          .catch(err =>{
            console.log('no se ha registrado el cache', err);
          })

    )

})

//Evento activate la app funcione sin conexión

self.addEventListener('activate', e =>{
  const cacheWhtitelist = [CACHE_NAME];

  e.waitUntil(
      caches.keys()
            .then(cacheNames => {
              return Promise.all(
                cacheNames.map(cacheName => {

                  if(cacheWhtitelist.indexOf(cacheName)===-1){

                      //Borrar elementos que no necesitamos
                      return caches.delete(cacheName);

                  }
               
                })
                )


            })
            .then(()=>{
              //Activa la caché en el dispositivo
              self.clients.claim();
            })
    )
})
//Evento fetch

self.addEventListener('fetch', e =>{
  e.respondWith(
    caches.match(e.request)
          .then(res=>{

            if(res){
              //Devuelvo datos desde cache
              return res;

            }
            return fetch(e.request);
          

          })



    )
})