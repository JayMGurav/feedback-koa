import React, { useState } from 'react';
import { useRouter } from 'next/router'
import useSWR from 'swr';
import {
  Box,
  Divider,
  Flex,
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
import CommentTable from '@/components/CommentTable';
import SampleComment from '@/components/SampleComment';
import CommentSettings from '../../components/CommentSettings';



const SiteCommentsPage = () => {
  const { user } = useAuth();
  const router = useRouter();
  const siteId = router.query?.comment?.[0] || null;
  const commentKey = router.query?.comment?.[1] || null;
  const { data, error } = useSWR(user ? [`/api/comment/${siteId}/${commentKey}/allcomments`, user.token] : null, fetcher);

  const loading = !data && !error;
  if (error) console.log(error);

  return (
    <DashboardShell>
      <Box
        bg="white"
        borderRadius={8}
      >
        <Flex bg="gray.50" p={4} justify="space-between" align="center" >
          <Box>
            <Heading as="h1" >Comments</Heading>
            <Text fontWeight="bold" fontSize="xs">FOR {" "}
              {loading ? (
                <Skeleton ml={2} w="50px" h="16px" display="inline-block" />
              ) :
                (
                  <NextLink href="/site/[siteId]/" as={`/site/${data?.site.id}`} passHref>
                    <Link color="blue.500">{(data?.site.name).toUpperCase()}</Link>
                  </NextLink>
                )
              }
            </Text>
          </Box>
          <CommentSettings commentKey={commentKey} />
        </Flex>
        <Divider />
        <Box p={4} bg="gray.50">
          <SampleComment commentKey={commentKey} />
        </Box>
        <Box p={4} >
          {loading ? <Skeleton h="100px" w="full" /> : data?.comments?.length ?
            <CommentTable allComments={data?.comments} />
            : <EmptyState
              title="There are no comments for this site"
              content="Share your wonders, get your feedback comments 🚀"
              action={null}
            />}
        </Box>
      </Box>
    </DashboardShell >
  );
}

export default SiteCommentsPage;
