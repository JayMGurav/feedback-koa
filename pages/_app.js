import { AuthProvider } from "@/lib/auth"
import { ChakraProvider, extendTheme, CSSReset } from "@chakra-ui/react"
import { Global, css } from '@emotion/react';

import myTheme from "@/styles/theme"

const theme = extendTheme(myTheme);

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider resetCSS={true} theme={theme}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  )
}

export default MyApp
