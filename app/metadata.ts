import type { Metadata, Viewport } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mnemosine-three.vercel.app';
const siteName = 'Mnemosine';
const description =
  'Piattaforma innovativa per la diagnosi precoce dell\'Alzheimer tramite esercizi interattivi e valutazione cognitiva. Supporto per medici, professionisti sanitari e pazienti.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Mnemosine - Diagnosi Precoce dell\'Alzheimer',
    template: '%s | Mnemosine',
  },
  description,
  keywords: [
    'Alzheimer',
    'diagnosi precoce',
    'cognitive training',
    'test cognitivo',
    'neuroscienze',
    'salute mentale',
    'esercizi cerebrali',
  ],
  authors: [
    {
      name: 'Mnemosine Team',
      url: siteUrl,
    },
  ],
  creator: 'Mnemosine Team',
  publisher: 'Mnemosine',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'it_IT',
    url: siteUrl,
    siteName,
    title: 'Mnemosine - Diagnosi Precoce dell\'Alzheimer',
    description,
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Mnemosine Platform',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@mnemosine_app',
    title: 'Mnemosine - Diagnosi Precoce dell\'Alzheimer',
    description,
    images: [`${siteUrl}/og-image.png`],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  manifest: '/site.webmanifest',
  alternates: {
    canonical: siteUrl,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
};
