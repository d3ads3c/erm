self.addEventListener('push', function(event) {
  const data = event.data?.json() || {};
  const title = data.title || 'Notification';
  const options = {
    body: data.body || '',
    icon: '/img/logo/192.png',
    badge: '/img/logo/192.png',
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

// This line is required for next-pwa injectManifest mode
self.__WB_MANIFEST;