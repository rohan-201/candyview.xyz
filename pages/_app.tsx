import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react';
import { NetworkProvider } from '@/components/networkContext';


export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ChakraProvider>
        <NetworkProvider>
          <Component {...pageProps} />
        </NetworkProvider>
      </ChakraProvider>
    </>
  )
}
