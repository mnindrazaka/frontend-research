import { AppProps } from 'next/app';
import Head from 'next/head';
import { ChakraProvider } from '@chakra-ui/react';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Head>
        <title>Welcome to 01-data-fetching!</title>
      </Head>
      <main className="app">
        <Component {...pageProps} />
      </main>
    </ChakraProvider>
  );
}

export default CustomApp;
