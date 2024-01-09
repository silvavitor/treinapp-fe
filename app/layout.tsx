import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/custom/header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Treinapp',
  description: '',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className + ' max-w-3xl m-auto'}>
        <div className='mx-2'>
          <Header />
          {children}
        </div>
      </body>
    </html>
  )
}
