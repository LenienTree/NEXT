import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'LenientTree',
  description: 'Lenient Tree is a dynamic and comprehensive online platform designed to empower students by connecting them with opportunities that fuel growth and innovation.',

}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
