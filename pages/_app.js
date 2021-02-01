import { AuthProvider } from "@/lib/auth"
import { ChakraProvider, extendTheme } from "@chakra-ui/react"
// import { Global, css } from '@emotion/react';
import { MDXProvider } from '@mdx-js/react';

import MDXComponents from '@/components/MDXComponents';
import myTheme from "@/styles/theme"
import SEO from "../next-seo.config"
import { DefaultSeo } from 'next-seo';

const theme = extendTheme(myTheme);

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider resetCSS={true} theme={theme}>
      <AuthProvider>
        {/* <MDXProvider components={MDXComponents}> */}
        <DefaultSeo {...SEO} />
        <Component {...pageProps} />
        {/* </MDXProvider> */}
      </AuthProvider>
    </ChakraProvider>
  )
}

export default MyApp
