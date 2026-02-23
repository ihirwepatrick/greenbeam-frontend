import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'
import { AuthProvider } from '../contexts/AuthContext'
import { CartProvider } from '../contexts/CartContext'
import { CurrencyProvider } from '../contexts/CurrencyContext'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.greenbeam.online'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'GreenBeam',
  description: 'GreenBeam is a renewable energy company that provides solar panel installation and maintenance services.',
  icons: {
    icon: '/logo.jpg',
    shortcut: '/logo.jpg',
    apple: '/logo.jpg',
  },
  openGraph: {
    title: 'GreenBeam – Empowering You To Harness Nature\'s Power',
    description: 'Leading provider of sustainable energy solutions for homes and businesses.',
    url: siteUrl,
    siteName: 'GreenBeam',
    images: [
      {
        url: '/banner.png',
        width: 1200,
        height: 630,
        alt: 'GreenBeam – Empowering You To Harness Nature\'s Power',
      },
    ],
    locale: 'en',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GreenBeam – Empowering You To Harness Nature\'s Power',
    description: 'Leading provider of sustainable energy solutions for homes and businesses.',
    images: ['/banner.png'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>
        <AuthProvider>
          <CurrencyProvider>
            <CartProvider>
              {children}
            </CartProvider>
          </CurrencyProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
