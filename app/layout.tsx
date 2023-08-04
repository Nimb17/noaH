import './globals.css'
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'

const Monts = Montserrat ({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'noah stories',
  description: 'Cuentos cortos por IA',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={Monts.className}>{children}</body>
    </html>
  )
}
