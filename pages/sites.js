import React from 'react';
import { useAuth } from '@/lib/auth'
import EmptyState from '@/components/EmptyState';
import DashboardShell from '@/components/DashbordShell';
import useSWR from 'swr'
import fetcher from '@/utils/fetcher';
import { Skeleton, Stack, Box } from "@chakra-ui/react"

import SiteTable from '@/components/SiteTable';
import TableHeader from '@/components/TableHeader';

export default function Dashboard() {
  const { user } = useAuth();
  const { data, error } = useSWR(user ? ['/api/sites', user.token] : null, fetcher);

  // if (!auth?.user) {
  if (error) console.log(error);

  if (!data) {
    return (
      <DashboardShell>
        <TableHeader label="Sites" siteModal />
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
      <TableHeader label="Sites" siteModal />
      <Box
        mt={8}
        p={4}
        overflowX="auto"
        overflowY="hidden"
        bg="white"
        borderRadius={8}
      >
        {data.sites.length ? <SiteTable sites={data.sites} /> : <EmptyState />}
      </Box>
    </DashboardShell>
  )
}
