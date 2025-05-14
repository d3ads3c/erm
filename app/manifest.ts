import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Business Manager',
    short_name: 'Business Manager',
    description: 'Manage your Business in Smart Ways',
    start_url: '/', // Corrected typo from '/dashbaord'
    display: 'standalone',
    background_color: '#fff',
    theme_color: '#dc2626',
    icons: [
      {
        src: '/img/logo/192.png', // Ensure the path is correct
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/img/logo/512.png', // Ensure the path is correct
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}