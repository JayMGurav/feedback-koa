import React, { useState } from 'react';
import { useRouter } from 'next/router'
import useSWR from 'swr';
import {
  Box,
  Heading,
  Link,
  Skeleton,
  Text,
} from '@chakra-ui/react';
import NextLink from 'next/link'


import fetcher from '@/utils/fetcher';
import { useAuth } from '@/lib/auth';
import DashboardShell from '@/components/DashbordShell';
import EmptyState from '@/components/EmptyState';
import FeedbackTable from '@/components/FeedbackTable';


const SiteFeedbackPage = () => {
  const { user } = useAuth();
  const router = useRouter();
  const siteId = router.query?.feedback?.[0] || null;
  const feedbackKey = router.query?.feedback?.[1] || null;
  const { data, error } = useSWR(user ? [`/api/feedback/${siteId}/${feedbackKey}/allfeedbacks`, user.token] : null, fetcher);

  const loading = !data && !error;
  if (error) console.log(error);

  return (
    <DashboardShell>
      <Box
        bg="white"
        borderRadius={8}
      >
        <Box bg="gray.50" p={4}>
          <Heading as="h1">Feedbacks</Heading>
          {loading ? (
            <Skeleton my={2} w="100px" h="16px" display="inline-block" />
          ) :
            <Text fontWeight="bold" fontSize="xs">FOR {" "}
              <NextLink href="/site/[siteId]/" as={`/site/${data?.site.id}`} passHref>
                <Link color="blue.500">{(data?.site.name).toUpperCase()}</Link>
              </NextLink>
            </Text>
          }
        </Box>
        <Box p={4} >
          {loading ? <Skeleton h="100px" w="full" /> : data?.feedbacks?.length ?
            <FeedbackTable allFeedbacks={data?.feedbacks} />
            : <EmptyState
              title="There are no feedbacks for this site"
              content="Share your wonders, get your feedback 🚀"
              action={null}
            />}
        </Box>
      </Box>
    </DashboardShell >
  );
}

export default SiteFeedbackPage;
