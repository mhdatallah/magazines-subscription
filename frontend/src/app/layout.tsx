import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Magazines For Less',
  description: 'Welcome to Magazines For Less. Your one-stop-shop for all online magazines.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className='h-screen p-8 bg-black'>
          <h1>Magazines For Less</h1>
          {children}
        </div>
      </body>
    </html>
  )
}
