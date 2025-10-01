import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Vaulto - AI-Powered Stablecoin Platform',
  description: 'Mint stablecoins, swap tokenized assets, and get AI-powered investment guidance',
  icons: {
    icon: '/favicon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-vaulto-dark text-white min-h-screen`}>
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  )
}
