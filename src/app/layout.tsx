"use client"

import '../assets/globals.css';
import MainFooter from "./pieces/Footer";
import ReduxProvider from '../redux/provider';

import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import { LightTheme, BaseProvider } from 'baseui';
import { ReactNode } from 'react';
import { useStyletron } from '../lib/styletron';

interface RootLayoutProps {
  children: ReactNode;
  title: string;
}

export default function RootLayout( { children, title } : RootLayoutProps ) {

  const engine = useStyletron();

  return (
    <html lang="en">
      <head>
        <title>{title}</title>
      </head>
      <body className="bg-maroon flex-column">
        <StyletronProvider value={engine}>
          <BaseProvider theme={LightTheme}>
            <ReduxProvider>
              {children}
              <MainFooter />
            </ReduxProvider>
          </BaseProvider>
        </StyletronProvider>
      </body>
    </html>
  );
}
