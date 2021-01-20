import { AuthProvider } from "@/lib/auth"
import { ChakraProvider, extendTheme, CSSReset } from "@chakra-ui/react"
import { Global, css } from '@emotion/react';

import myTheme from "@/styles/theme"

const theme = extendTheme(myTheme);

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <CSSReset />
        <Global
          styles={css`
          html {
            scroll-behavior: smooth;
          }
          #__next {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
          }
        `}
        />
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  )
}

export default MyApp
