import Head from 'next/head'
import { useAuth } from '@/lib/auth'
import { Heading, Flex, Button } from "@chakra-ui/react"

export default function Home() {
  const auth = useAuth();
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flex
        as="main"
        direction="column"
        justify="center"
        alignItems="center"
        h="100vh"
      >
        <Heading as="h1" isTruncated>
          Feedback koa🐨
          </Heading>
        {auth?.user ?
          (<button onClick={() => auth.signout()}>Sign out</button>) :
          (<Button mt={4} size="sm" onClick={() => auth.signinWithGithub()}>Sign in</Button>)}
      </Flex>
    </div>
  )
}
