'use client';

import { ReactNode } from 'react';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { ClerkProvider } from '@clerk/nextjs';
import { ApolloProvider } from '@apollo/client';
import { client } from '../lib/apollo-client';

const theme = createTheme({
  palette: {
    primary: {
      main: '#968575',
      light: '#FAF0E6',
    },
    secondary: {
      main: '#F5EBE0',
    },
    background: {
      default: '#F5EBE0',
    },
    text: {
      primary: '#6E6E6E',
      secondary: '#B0B0B0',
    },
    error: {
      main: '#C94C4C',
    }
  },
  typography: {
    fontFamily: 'Raleway, sans-serif',
  },
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ClerkProvider>
            <ApolloProvider client={client}>
              {children}
            </ApolloProvider>
          </ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
