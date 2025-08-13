import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'
import { AuthProvider } from '../contexts/AuthContext'
import AuthDebug from '../components/AuthDebug'

export const metadata: Metadata = {
  title: 'GreenBeam',
  description: 'GreenBeam is a renewable energy company that provides solar panel installation and maintenance services.',
  generator: 'GreenBeam',
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
          <AuthDebug />
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
