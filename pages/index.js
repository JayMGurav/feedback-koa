import Head from 'next/head'
import { useAuth } from '@/lib/auth'
import { Heading, Flex, Button, Stack, Box, Text } from "@chakra-ui/react"
import Github from '@/components/icons/Github';
import Google from '@/components/icons/Google';
import { getAllFeedback, getSiteDetails } from '@/lib/db-admin';
import LogginButtons from '@/components/LogginButtons';
import FeedbackLink from '@/components/FeedbackLink';
import Feedback from '@/components/Feedback';


const SITE_ID = process.env.NEXT_PUBLIC_HOME_PAGE_SITE_ID;


export async function getStaticProps(context) {
  const feedback = await getAllFeedback(SITE_ID);
  const site = await getSiteDetails(SITE_ID);

  return {
    props: {
      allFeedback: feedback,
      site
    },
    revalidate: 1
  }
}


export default function Home({ allFeedback, site }) {
  const auth = useAuth();
  return (
    <div>
      <Head>
        <script dangerouslySetInnerHTML={{
          __html: `
          if (document.cookie && document.cookie.includes('feedback_koa_auth')) {
            window.location.href = "/sites"
          }
          `
        }} />
        <title>koafeedback</title>
      </Head>
      <Flex w="full" direction={['column', 'row']} h="100vh">
        <Flex
          justifyContent="center"
          alignItems="center"
          py={8}
          px={2}
          bg="gray.100"
          flex="2"
          flexShrink="4"
        >
          <Box
            as="main"
            maxW="700px"
            py={4}
            px={2}
          >
            <Heading as="h1" mb={2} isTruncated>
              🐨
          </Heading>

            <Text mb={4}>
              <Text as="span" fontWeight="bold" display="inline">
                Feedback Koa
            </Text>
              {" "}is the easiest way to add comments, give reviews and provide feedback to your static site. Try it out by leaving a comment below. After the comment is approved, it will display below.
          </Text>
            {auth.user ?
              (<Button
                as="a"
                href="/sites"
                backgroundColor="gray.900"
                color="white"
                fontWeight="medium"
                mt={4}
                maxW="200px"
                _hover={{ bg: 'gray.700' }}
                _active={{
                  bg: 'gray.800',
                  transform: 'scale(0.95)'
                }}
              >
                View Dashboard
              </Button>) :
              (
                <LogginButtons />
              )}
          </Box>
        </Flex>
        <Flex
          py={4}
          px={4}
          bg="gray.50"
          flex="1"
          flexShrink="1"
          direction="column"
        >
          <FeedbackLink siteId={SITE_ID} />
          <Box overflowY="auto" minW="300px">
            {allFeedback.map(feedback => (
              <Feedback
                key={feedback.id}
                author={feedback.author}
                createdAt={feedback.createdAt}
                text={feedback.text}
                provider={feedback.provider}
              />
            ))}
          </Box>
        </Flex>
      </Flex>
    </div>
  )
}