import 'src/assets/globals.css';

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin - Universidad Tierra Garat ',
  description: 'Training para el personal de cafeterías',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body class="bg-maroon flex-column">
        {children}
      </body>
    </html>
  )
}
