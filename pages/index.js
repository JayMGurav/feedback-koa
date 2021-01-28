import Head from 'next/head'
import { useAuth } from '@/lib/auth'
import { Heading, Flex, Button, Stack } from "@chakra-ui/react"
import { useRouter } from 'next/router'
import Github from '@/components/icons/Github';
import Google from '@/components/icons/Google';

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
          (
            <Stack>
              <Button
                leftIcon={<Github />}
                size="sm"
                backgroundColor="gray.900"
                color="white"
                _hover={{ bg: "gray.700" }}
                _active={{
                  bg: "gray.800",
                  transform: 'scale(0.95)'
                }}
                onClick={() => auth.signinWithGithub()}
              >
                Sign in with Github
            </Button>
              <Button
                leftIcon={<Google />}
                size="sm"
                backgroundColor="white"
                color="gray.900"
                variant="outline"
                _hover={{ bg: "gray.100" }}
                _active={{
                  bg: "gray.100",
                  transform: 'scale(0.95)'
                }}
                onClick={() => auth.signinWithGoogle()}
              >
                Sign in with Google
            </Button>
            </Stack>
          )}
      </Flex>
    </div>
  )
}