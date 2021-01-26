import Head from 'next/head'
import { useAuth } from '@/lib/auth'
import { Heading, Flex, Button } from "@chakra-ui/react"
import { useRouter } from 'next/router'

export default function Home() {
  const auth = useAuth();
  const router = useRouter()

  const handleClick = (e) => {
    e.preventDefault();
    router.push('/dashboard');
  }

  return (
    <div>
      <Head>
        <script dangerouslySetInnerHTML={{
          __html: `
          if (document.cookie && document.cookie.includes('feedback_koa_auth')) {
            window.location.href = "/dashboard"
          }
          `
        }} />
        <title>Feedback-koa</title>
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
          (<Button onClick={handleClick}>View dashboard</Button>) :
          (<Button mt={4} size="sm" onClick={() => auth.signinWithGithub()}>Sign in</Button>)}
      </Flex>
    </div>
  )
}