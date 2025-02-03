import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Bible Recall',
    short_name: 'BibleRecall',
    description: "Memorize, Meditate, Connect with God's Word",
    display: 'standalone',
    start_url: '/',
    background_color: '#09090b',
    theme_color: '#4d574c',
    icons: [
      {
        src: '/web-app-manifest-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/web-app-manifest-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  }
}
