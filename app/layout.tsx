import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/custom/header'
import { Toaster } from 'react-hot-toast'

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
          <Toaster
            position="bottom-center"
            reverseOrder={false}
          />
        </div>
      </body>
    </html>
  )
}
