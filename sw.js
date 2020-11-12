//imports
importScripts('js/sw-utils.js');

const STATIC_CACHE = 'static-v3';
const DYNAMIC_CACHE = 'dynamic-v2';
///cache no modificable
const INMUTABLE_CACHE = 'inmutable-v1';

//app Shell
const APP_SHELL=[
    // '/',
    'index.html',
    'css/style.css',
    'img/favicon.ico',
    'img/avatars/hulk.jpg',
    'img/avatars/ironman.jpg',
    'img/avatars/spiderman.jpg',
    'img/avatars/thor.jpg',
    'img/avatars/wolverine.jpg',
    'js/app.js',
    'js/sw-utils.js',
    'https://i.pinimg.com/originals/4f/50/38/4f503844d9a44b0350c25eeefae028d3.jpg',
    'https://www.xtrafondos.com/wallpapers/fortnite-battle-bus-3760.jpg',
    'https://fondosmil.com/fondo/17027.jpg',
    'https://coatepec.gob.mx/wp-content/uploads/2019/09/4K-Moving-Stars-Live-Wallpaper-1.jpg',
    'https://www.setaswall.com/wp-content/uploads/2017/03/Artistic-4K-Wallpaper-3840x2160.jpg',
    'https://pbs.twimg.com/media/DxFijDDWoAACWx8.jpg',
    'https://i.redd.it/6ifcneixjdk21.jpg',
    'https://cdn.wccftech.com/wp-content/uploads/2020/02/download-windows-10-wallpaper-free-2060x1159.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQtSPlSGmUo8Ewlh6yEUJyK0u9Me4jIt6lYJQ&usqp=CAU',
    'https://assets.hongkiat.com/uploads/beautiful-minimalist-desktop-wallpapers/4k/original/01.jpg',
    'https://fondosmil.com/fondo/17021.jpg'

];

const APP_SHELL_INMUTABLE =[
    'https://fonts.googleapis.com/css?family=Quicksand:300,400',
    'https://fonts.googleapis.com/css?family=Lato:400,300',
    'https://use.fontawesome.com/releases/v5.3.1/css/all.css',
    'css/animate.css',
    'js/libs/jquery.js'
];

self.addEventListener('install',e=>{

    const cacheStatic = caches.open(STATIC_CACHE).then((cache)=>{
        return cache.addAll(APP_SHELL);
    });

    const cacheInmutable = caches.open(INMUTABLE_CACHE).then((cache)=>{
        return cache.addAll(APP_SHELL_INMUTABLE);
    });



    e.waitUntil( Promise.all([cacheStatic,cacheInmutable]));
});

self.addEventListener('activate',e=>{
    //Limpiar cache anterior
    const respuesta = caches.keys().then( keys => {

        keys.forEach( key => {

            // static-v4
            if (  key !== STATIC_CACHE && key.includes('static') ) {
                return caches.delete(key);
            }
            if (  key !== DYNAMIC_CACHE && key.includes('dynamic') ) {
                return caches.delete(key);
            }
        });

    });



    e.waitUntil( respuesta );
});

//cache only
self.addEventListener('fetch',e=>{

    const respuesta = caches.match(e.request).then((res)=>{
        if (res) {
            return res;
        }
        else{
            fetch(e.request).then((newRes)=>{
                return actualizaCacheDinamico(DYNAMIC_CACHE,e.request,newRes);
            })
            // console.log(e.request.url);
        }
    });

    e.respondWith(respuesta);
});