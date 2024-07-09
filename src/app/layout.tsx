import '/src/assets/globals.css';

import type { Metadata } from 'next';
import FooterWrapper from './pieces/FooterWrapper';
import { ReduxProvider } from '/src/redux/provider';

export const metadata: Metadata = {
  title: 'Universidad Tierra Garat ',
  description: 'Training para el personal de cafeterías',
}

function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
      <html lang="en">
          <body className="bg-maroon flex-column">
            <ReduxProvider>
              {children}
              <FooterWrapper />
            </ReduxProvider>
          </body>
      </html>
  )
}

export default RootLayout;
