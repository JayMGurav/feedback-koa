import React, { useRef } from 'react';
import { useRouter } from 'next/router'
import { Box, Flex, Text, Button, FormControl, useToast, Textarea } from '@chakra-ui/react';

import { useAuth } from '@/lib/auth';
import { createFeedback } from '@/lib/db';
import Feedback from '@/components/Feedback';
import fetcher from '@/utils/fetcher';
import DashboardShell from '@/components/DashbordShell';
import useSWR from 'swr';
import LogginButtons from '@/components/LogginButtons';

const FeedBackPage = () => {
  const { user, loading } = useAuth();
  const inputElem = useRef(null);
  const router = useRouter();
  const slug = router.query?.site || [];
  const siteId = slug ? slug[0] : null;
  const route = slug ? slug[1] : null;

  const feedbackApi = route
    ? `/api/feedback/${siteId}/${route}`
    : `/api/feedback/${siteId}`;
  // const { data: { site } } = useSWR(`/api/site/${siteId}`, fetcher);
  const { data } = useSWR(feedbackApi, fetcher);
  const { feedback, site } = { feedback: data?.feedback, site: data?.site };
  // return (<Box>   <h1>Slug: {slug.join('/')}</h1> this  {user?.email}</Box>)


  const onSubmit = (e) => {
    e.preventDefault();

    const newFeedback = {
      siteId,
      siteAuthorId: site.ownerId,
      route: route || '/',
      author: user.name,
      authorId: user.uid,
      text: inputElem.current.value.replace('\n', '\n\n'),
      createdAt: new Date().toISOString(),
      provider: user.provider,
      status: 'pending'
    };

    inputElem.current.value = '';
    createFeedback(newFeedback);
    mutate(
      feedbackApi,
      async (data) => ({
        feedback: [newFeedback, ...data.feedback]
      }),
      false
    );
  };

  return (
    <DashboardShell>
      <Box
        display="flex"
        mx={4}
        flexDirection="column"
        width="full"
        maxWidth="700px"
      >
        {!loading && !user && <Text color="orange.300" my={2}>Login to leave a comment</Text>}
        <Box as="form" onSubmit={onSubmit}>
          <FormControl mb={8}>
            <Textarea
              ref={inputElem}
              id="comment"
              placeholder="Leave a comment"
              isDisabled={!user}
              h="100px"
            />
            {!loading && <LoginOrLeaveFeedback user={user} feedback={feedback} site={site} />}
          </FormControl>
        </Box>
        {
          feedback &&
          feedback.map((feedback, index) => (
            <Feedback
              key={feedback.id}
              settings={site?.settings}
              isLast={index === allFeedback.length - 1}
              {...feedback}
            />
          ))
        }
      </Box>
    </DashboardShell>
    // </Flex>
  );
}


function LoginOrLeaveFeedback({ user, feedback = null, site = null }) {
  return user ? (
    <Button
      type="submit"
      isDisabled={!feedback || !site}
      backgroundColor="gray.900"
      color="white"
      fontWeight="medium"
      mt={4}
      _hover={{ bg: 'gray.700' }}
      _active={{
        bg: 'gray.800',
        transform: 'scale(0.95)'
      }}
    >
      Leave Feedback
    </Button>
  ) : (
    <LogginButtons />
  );


}



export default FeedBackPage;














// /////-------------------------------------------------------------------------------------------
// export async function getStaticProps(context) {
//   const siteId = context.params.siteId;
//   const allFeedbackForSite = await getAllFeedback(siteId);

//   return {
//     props: {
//       initialFeedbacks: allFeedbackForSite,
//     },
//     revalidate: 1
//   }
// }

// export async function getStaticPaths() {
//   const sites = await getAllSites(),
//     paths = sites.map(({ id }) => ({
//       params: {
//         siteId: id
//       }
//     }));


//   return {
//     paths,
//     fallback: true
//   };
// }


// function SiteFeedbacks({ initialFeedbacks }) {
//   const router = useRouter();
//   const { siteId } = router.query;
//   const auth = useAuth();
//   const inputElememRef = useRef(null);
//   const [allFeedback, setAllFeedback] = useState(initialFeedbacks);
//   const toast = useToast();

//   const addCommentHandler = (e) => {
//     e.preventDefault();
//     const newFeedback = {
//       author: auth.user.name,
//       authorId: auth.user.uid,
//       siteId,
//       text: inputElememRef.current.value,
//       status: "pending",
//       provider: auth.user.provider,
//       createdAt: new Date().toISOString(),
//       rating: 5
//     }
//     // console.log({ newFeedback });
//     try {
//       createFeedback(newFeedback);
//       setAllFeedback([...allFeedback, newFeedback]);
//       inputElememRef.current.value = '';
//     } catch (error) {
//       console.log(error.message);
//     }

//     toast({
//       title: "Success!",
//       description: "Added new feedback",
//       status: "success",
//       duration: 4000,
//       isClosable: true,
//     })
//     // mutate('/api/sites', async (data) => {
//     //   return { sites: [...data.sites, newSite] }
//     // }, false);
//   }


//   return (
//     <Flex
//       flexDir="column"
//       w="full"
//       maxW="700px"
//       m="0 auto"
//     >
//       <Box as="form" my={4} onSubmit={addCommentHandler}>
//         <FormControl id="comment">
//           <FormLabel htmlFor="comment">comment</FormLabel>
//           <Input ref={inputElememRef} type="text" id="comment" placeholder="Enter your comment here" />
//         </FormControl>
//         <Button
//           mt={2}
//           type="submit"
//           isDisabled={router.isFallback}
//         >
//           Add comment
//         </Button>
//       </Box>
//       {allFeedback.length ? (
//         <Box>
//           {
//             allFeedback.map(feedback => (
//               <Feedback key={feedback.id} {...feedback} />
//             ))
//           }
//         </Box>
//       ) : (
//         <Box>
//           <Heading size="sm" as="h3" mb={0} mt={2} >
//             No feedbacks available for this site
//             </Heading>
//         </Box>
//       )}
//     </Flex>

//   )
// }



// export default SiteFeedbacks;