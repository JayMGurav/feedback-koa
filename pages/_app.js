import { AuthProvider } from "@/lib/auth"
import { ChakraProvider, extendTheme } from "@chakra-ui/react"
// import { Global, css } from '@emotion/react';

import myTheme from "@/styles/theme"
import SEO from "../next-seo.config"
import { DefaultSeo } from 'next-seo';

const theme = extendTheme(myTheme);

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider resetCSS={true} theme={theme}>
      <AuthProvider>
        <DefaultSeo {...SEO} />
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  )
}

export default MyApp
