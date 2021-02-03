import React from 'react';
import { useRouter } from 'next/router'
import { Box, Text } from '@chakra-ui/react';

import { getAllFeedback, getAllSites, getSiteDetails } from '@/lib/db-admin';
import Feedback from '@/components/Feedback';
import FeedbackLink from '@/components/FeedbackLink';
// import { useAuth } from '@/lib/auth';
// import { createFeedback } from '@/lib/db';


export async function getStaticProps(context) {
  const [siteId, route] = context.params.site;
  const allFeedbackForSite = await getAllFeedback(siteId, route);
  const site = await getSiteDetails(siteId);

  return {
    props: {
      initialFeedbacks: allFeedbackForSite,
      site
    },
    revalidate: 1
  }
}

export async function getStaticPaths() {
  const sites = await getAllSites(),
    paths = sites.map(({ id }) => ({
      params: {
        site: [id.toString()]
      }
    }));


  return {
    paths,
    fallback: true
  };
}


function EmbedFeedbackPage({ initialFeedback, site }) {
  const router = useRouter();

  return (
    <Box display="flex" flexDirection="column" width="full">
      <FeedbackLink paths={router?.query?.site || []} />
      {initialFeedback?.length ? (
        initialFeedback.map((feedback, index) => (
          <Feedback
            key={feedback.id}
            settings={site?.settings}
            isLast={index === initialFeedback.length - 1}
            {...feedback}
          />
        ))
      ) : (
        <Text color="grey.500">
          There are no comments for this site.
        </Text>
      )}
    </Box>
  );
}



export default EmbedFeedbackPage;



 // const { siteId } = router.query;
  // const auth = useAuth();
  // const inputElemRef = useRef(null);
  // const [allFeedback, setAllFeedback] = useState(initialFeedbacks);
  // const toast = useToast();

  // const addCommentHandler = (e) => {
  //   e.preventDefault();
  //   const newFeedback = {
  //     author: auth.user.name,
  //     authorId: auth.user.uid,
  //     siteId,
  //     text: inputElemRef.current.value,
  //     status: "pending",
  //     provider: auth.user.provider,
  //     createdAt: new Date().toISOString(),
  //     rating: 5
  //   }
  // console.log({ newFeedback });
  // try {
  //   createFeedback(newFeedback);
  //   setAllFeedback([...allFeedback, newFeedback]);
  //   inputElemRef.current.value = '';
  // } catch (error) {
  //   console.log(error.message);
  // }

  // toast({
  //   title: "Success!",
  //   description: "Added new feedback",
  //   status: "success",
  //   duration: 4000,
  //   isClosable: true,
  // })
  // mutate('/api/sites', async (data) => {
  //   return { sites: [...data.sites, newSite] }
  // }, false);
  // }


// return (
//   <Flex
//     flexDir="column"
//     w="full"
//     // maxW="700px"
//     m="0 auto"
//   >
//     <Box as="form" my={4} onSubmit={addCommentHandler}>
//       <FormControl id="comment">
//         <FormLabel htmlFor="comment">comment</FormLabel>
//         <Input ref={inputElemRef} type="text" id="comment" placeholder="Enter your comment here" />
//       </FormControl>
//       <Button
//         mt={2}
//         type="submit"
//         isDisabled={router.isFallback}
//       >
//         Add comment
//       </Button>
//     </Box>
//     {allFeedback.length ? (
//       <Box>
//         {
//           allFeedback.map(feedback => (
//             <Feedback key={feedback.id} {...feedback} />
//           ))
//         }
//       </Box>
//     ) : (
//       <Box>
//         <Heading size="sm" as="h3" mb={0} mt={2} >
//           No feedbacks available for this site
//           </Heading>
//       </Box>
//     )}
//   </Flex>

// )