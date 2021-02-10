import Head from 'next/head'
import { useAuth } from '@/lib/auth'
import { Heading, Flex, Button, Box, Text } from "@chakra-ui/react"
// import { getAllComments, getCommentData } from '@/lib/db-admin';
import LogginButtons from '@/components/LogginButtons';
import CommentSection from '@/components/widgets/comment/CommentSection';


// export async function getStaticProps(context) {
//   const commentData = await getCommentData(COMMENT_KEY);
//   const comments = await getAllComments(COMMENT_KEY);
//   // const site = await getSiteDetails(SITE_ID);

//   return {
//     props: {
//       allComments: comments,
//       settings: commentData.settings
//     },
//     revalidate: 1
//   }
// }


const SITE_ID = process.env.NEXT_PUBLIC_HOME_PAGE_SITE_ID;
const COMMENT_KEY = process.env.NEXT_PUBLIC_HOME_PAGE_SITE_COMMENT_KEY;

export default function Home() {
  const auth = useAuth();

  return (
    <div>
      <Head>
        <script dangerouslySetInnerHTML={{
          __html: `
          if (document.cookie && document.cookie.includes('feedback_koa_auth')) {
            window.location.href = "/sites"
          }else{
            window.location.href = "/"
          }
          `
        }} />
        <title>Feedback Koa</title>
      </Head>
      <Flex w="full" h="full" direction={['column', 'row']} flexWrap="wrap" >
        <Flex
          justifyContent="center"
          alignItems="center"
          py={8}
          px={2}
          bg="gray.100"
          flex="2"
          flexShrink="4"
          basis="auto"
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
              {" "}is the easiest way to add comments, give reviews and provide pools to your static site. Try it out by leaving a comment below. After the comment is approved, it will display below.
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
        <Box
          py={4}
          bg="white"
          flex="1"
          flexShrink="1"
          basis="auto"
          direction="column"
          minW="300px"
          overflowY="auto"
          maxH="100vh"
        >
          {/* <CommentSectionWithoutFetching
            allComments={allComments}
            settings={settings}
            siteId={SITE_ID}
            commentKey={COMMENT_KEY}
          /> */}
          <CommentSection
            siteId={`${SITE_ID}`}
            commentKey={`${COMMENT_KEY}`}
          />
        </Box>
      </Flex>
    </div >
  )
}

