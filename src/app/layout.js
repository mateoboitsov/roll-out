import "./globals.css";

import ClientLayout from "../client-layout";

import { ViewTransitions } from "next-view-transitions";

export const metadata = {
  title: "Roll Out Studios — Estudio de Marketing Digital y Creatividad",
  description: "Estudio creativo especializado en marketing digital estratégico, lanzamientos de infoproductos, ecommerce y consultoría de crecimiento. Generamos 50M+ en ventas reales. Portugal.",
  keywords: [
    "marketing digital",
    "lanzamientos digitales", 
    "infoproductos",
    "ecommerce",
    "consultoría marketing",
    "growth marketing",
    "publicidad digital",
    "estudio creativo",
    "Portugal",
    "Roll Out Studios"
  ],
  authors: [{ name: "Roll Out Studios", url: "https://rollout-studios.com" }],
  creator: "Roll Out Studios",
  publisher: "Roll Out Studios",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://rollout-studios.com'),
  alternates: {
    canonical: '/',
    languages: {
      'es-ES': '/es',
      'en': '/en',
    },
  },
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
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://rollout-studios.com',
    siteName: 'Roll Out Studios',
    title: 'Roll Out Studios — Estudio de Marketing Digital y Creatividad',
    description: 'Estudio creativo especializado en marketing digital estratégico, lanzamientos de infoproductos, ecommerce y consultoría de crecimiento. Generamos 50M+ en ventas reales.',
    images: [
      {
        url: '/images/Logo.png',
        width: 1200,
        height: 630,
        alt: 'Roll Out Studios - Logo',
        type: 'image/png',
      },
      {
        url: '/images/studio/hero.jpeg',
        width: 1200,
        height: 630,
        alt: 'Roll Out Studios - Estudio Creativo',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@rolloutstudios',
    creator: '@rolloutstudios',
    title: 'Roll Out Studios — Estudio de Marketing Digital y Creatividad',
    description: 'Estudio creativo especializado en marketing digital estratégico, lanzamientos de infoproductos, ecommerce y consultoría de crecimiento.',
    images: ['/images/Logo.png'],
  },
  other: {
    'theme-color': '#000000',
    'color-scheme': 'dark',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'apple-mobile-web-app-title': 'Roll Out Studios',
    'application-name': 'Roll Out Studios',
    'msapplication-TileColor': '#000000',
    'msapplication-config': '/browserconfig.xml',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body>
        <ViewTransitions>
          <ClientLayout>{children}</ClientLayout>
        </ViewTransitions>
      </body>
    </html>
  );
}
