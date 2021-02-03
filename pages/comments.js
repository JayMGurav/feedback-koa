import React from 'react';
import { useAuth } from '@/lib/auth'
import EmptyState from '@/components/EmptyState';
import DashboardShell from '@/components/DashbordShell';
import useSWR from 'swr'
import fetcher from '@/utils/fetcher';
import { Skeleton, Stack, Box } from "@chakra-ui/react"

import CommentTable from '@/components/CommentTable';
import TableHeader from '@/components/TableHeader';

export default function MyFeedback() {
  const { user } = useAuth();
  const { data, error } = useSWR(user ? ['/api/comment', user.token] : null, fetcher);

  // if (!auth?.user) {
  if (error) console.log(error);
  if (!data) {
    return (
      <DashboardShell>
        <TableHeader label="Comments" url="/comments" />
        <Box
          mt={4}
          p={4}
          overflowX="auto"
          overflowY="hidden"
          bg="white"
          borderRadius={8}
        >
          <Stack>
            <Skeleton height="20px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
          </Stack>
        </Box>
      </DashboardShell>
    )
  }


  return (
    <DashboardShell>
      <TableHeader label="Comments" url="/comments" />
      <Box
        mt={4}
        p={4}
        overflowX="auto"
        overflowY="hidden"
        bg="white"
        borderRadius={8}
      >
        {data.feedback?.length ? <CommentTable allComments={data.comments} /> : <EmptyState
          title="There aren't any comments."
          content="Share your sites!🚀"
          action={null}
        // label=""
        />}
      </Box>
    </DashboardShell>
  )
}
