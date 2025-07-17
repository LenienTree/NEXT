// app/layout.jsx
import './globals.css'

export const metadata = {
  title: 'LenientTree',
  description: 'Your platform for student opportunities',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}