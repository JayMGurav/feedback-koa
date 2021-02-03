import React from 'react';
import { useAuth } from '@/lib/auth'
import EmptyState from '@/components/EmptyState';
import DashboardShell from '@/components/DashbordShell';
import useSWR from 'swr'
import fetcher from '@/utils/fetcher';
import { Skeleton, Stack, Box } from "@chakra-ui/react"

import SiteTable from '@/components/SiteTable';
import TableHeader from '@/components/TableHeader';
import AddSiteModal from '@/components/AddSiteModal';
import Page from '@/components/Page';

function Dashboard() {
  const { user } = useAuth();
  const { data, error } = useSWR(user ? ['/api/sites', user.token] : null, fetcher);

  // if (!auth?.user) {
  if (error) console.log(error);

  if (!data) {
    return (
      <DashboardShell>
        <TableHeader label="Sites" url="/sites" action={<AddSiteModal label="Add your site" />} />
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
      <TableHeader label="Sites" url="/sites" action={<AddSiteModal label="Add your site" />}
      />
      <Box
        mt={8}
        p={4}
        overflowX="auto"
        overflowY="hidden"
        bg="white"
        borderRadius={8}
      >
        {data.sites.length ? <SiteTable sites={data.sites} uid={user.uid} /> : <EmptyState
          title="You haven't added any sites."
          content="Welcome 👋 Let's get started."
          action={<AddSiteModal label="Add your first site" />}
        />}
      </Box>
    </DashboardShell>
  )
}


const DashboardPage = () => (
  <Page name="Dashboard" path="/sites">
    <Dashboard />
  </Page>
);

export default DashboardPage;