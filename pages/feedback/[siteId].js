import React from 'react';
import { useAuth } from '@/lib/auth'
import EmptyState from '@/components/EmptyState';
import DashboardShell from '@/components/DashbordShell';
import useSWR from 'swr'
import fetcher from '@/utils/fetcher';
import { Skeleton, Stack, Box } from "@chakra-ui/react"

import FeedbackTable from '@/components/FeedbackTable';
import TableHeader from '@/components/TableHeader';
import { useRouter } from 'next/router';



// view all the feedbacks give for the site
export default function SiteFeedback() {
  const { user } = useAuth();
  const { siteId } = useRouter().query
  const { data, error } = useSWR(user ? [`/api/feedback/${siteId}`, user.token] : null, fetcher);

  // if (!auth?.user) {
  if (error) console.log(error);
  if (!data) {
    return (
      <DashboardShell>
        <TableHeader label="Feedback" />
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
      <TableHeader label="All Feedback" />
      <Box
        mt={4}
        p={4}
        overflowX="auto"
        overflowY="hidden"
        bg="white"
        borderRadius={8}
      >
        {/* Empty state is there are no feedback for this site */}
        {data.feedback.length ? <FeedbackTable allFeedback={data.feedback} /> : <EmptyState />}
      </Box>
    </DashboardShell>
  )
}
