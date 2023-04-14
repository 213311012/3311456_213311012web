'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "7d9aa91288f458e4b5ccceb7e5249153",
"assets/FontManifest.json": "7e0b589bc271ca1a41b5cb372a5ef49f",
"assets/fonts/MaterialIcons-Regular.otf": "95db9098c58fd6db106f1116bae85a0b",
"assets/image/ad%25C4%25B1yaman1.PNG": "7b8c4103532fc2e03ef79d8e51e70de2",
"assets/image/ad%25C4%25B1yaman_br1.PNG": "15dcfefbd1c7601f6db6d25e7c457c4c",
"assets/image/aksaray10.PNG": "e52650ac9fc58786fdd6d2395a92fba2",
"assets/image/aksaray_br10.PNG": "8860caa2c1244b07e16cc4bef7adadbf",
"assets/image/antalya2.PNG": "b79b97f035cdf0e6d4f0db74c2805422",
"assets/image/antalya_br2.PNG": "e9d7ad0a8610bf0ecda21af2362cf02a",
"assets/image/balikesir11.PNG": "62da05cc3ef6d7289b36575a03ba1c94",
"assets/image/balikesir_br11.PNG": "924aa6f7b2e9b11b97a1b8f23e89d868",
"assets/image/denizli3.PNG": "bb62d3258f39b52002728b93a509d6d8",
"assets/image/denizli_br3.PNG": "e10f9c3e2cdf65c168d6486d81485901",
"assets/image/gaziantep4.PNG": "533d1989da168daf9b6c220f0fa48635",
"assets/image/gaziantep_br4.PNG": "9ec64b93f5623f414a0d88a5fd740ad1",
"assets/image/google.PNG": "9c05f166af0c3b14e8a14a13dd683db3",
"assets/image/izmir12.PNG": "c7cae9e588f09896ffd836925ed97701",
"assets/image/izmir_br12.PNG": "b6353a6cd8bc6ae50cb01ed22ef8297a",
"assets/image/logomuz1.PNG": "3210be4b18cf299d35a4eabaf1793d8c",
"assets/image/mugla6.PNG": "a86e458af980400d440a5f46957b15c7",
"assets/image/mugla_br6.PNG": "7a4af746bc07b48c5a2be3494d222860",
"assets/image/nevsehir7.PNG": "07e0ff124da100bc938678873f90cbbb",
"assets/image/nevsehir_br7.PNG": "187620f66276ff86153cfbaf800ac766",
"assets/image/sakarya8.PNG": "8173606e8a90133e91815306a1569d53",
"assets/image/sakarya_br8.PNG": "fae8879a4d6c903b7c9d03dc92d4730d",
"assets/image/sinop9.PNG": "3f6fefbffc4894103132fcda651590bb",
"assets/image/sinop_br9.PNG": "4903d9d485a0d9a5a5cb45e87ef59155",
"assets/image/trabzon5.PNG": "7eb1c9261e7e38655df0cbf642c088fe",
"assets/image/trabzon_br5.PNG": "b3eb6c69dd7dd56924c92825a2e05227",
"assets/NOTICES": "8f2b7ab052dfcf4ace9901a3769cab3f",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/shaders/ink_sparkle.frag": "6333b551ea27fd9d8e1271e92def26a9",
"assets/stiller/KaushanScript-Regular.ttf": "c76c991a669e5ef94081d9ac348673d5",
"canvaskit/canvaskit.js": "2bc454a691c631b07a9307ac4ca47797",
"canvaskit/canvaskit.wasm": "bf50631470eb967688cca13ee181af62",
"canvaskit/profiling/canvaskit.js": "38164e5a72bdad0faa4ce740c9b8e564",
"canvaskit/profiling/canvaskit.wasm": "95a45378b69e77af5ed2bc72b2209b94",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "f85e6fb278b0fd20c349186fb46ae36d",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "bdb18d92a8e0b9f8d0be77ff8d3641bf",
"/": "bdb18d92a8e0b9f8d0be77ff8d3641bf",
"main.dart.js": "07583d67b41aef46a83e24ca63adda12",
"manifest.json": "1e23d11aa43bf7dc83b69eb60169642f",
"version.json": "bcef92be9a7e04404bac9cc386370d30"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
