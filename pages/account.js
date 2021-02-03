import React from 'react';
import { useAuth } from '@/lib/auth'
import DashboardShell from '@/components/DashbordShell';
import {
  Box,
  Avatar,
  Heading,
  Button,
  Text,
  Flex,
  Skeleton
} from "@chakra-ui/react"

import Page from '@/components/Page';

function MyAccount() {
  const { user, signout } = useAuth();

  if (!user) {
    return (
      <DashboardShell>
        <Flex
          mt={8}
          direction="column"
          justifyContent="center"
          alignItems="center"
          overflowY="auto"
        >
          <Box w="full" textAlign="center" mb={6}>
            <Avatar
              w={['3rem', '6rem']}
              h={['3rem', '6rem']}
            />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
          </Box>
          <Box
            mt={8}
            p={4}
            bg="white"
            borderRadius={8}
            w="full"
          >
            <Skeleton height="20px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
          </Box>
        </Flex>
      </DashboardShell>
    )
  }

  return user && (
    <DashboardShell>
      <Flex
        mt={8}
        direction="column"
        justifyContent="center"
        alignItems="center"
        overflowY="auto"
      >
        <Box w="full" textAlign="center" mb={6}>
          <Avatar
            w={['3rem', '6rem']}
            h={['3rem', '6rem']}
            src={user?.photoUrl}
            loading="eager"
          />
          <Heading letterSpacing="-1px" mt={2}>{user?.name}</Heading>
          <Text>{user?.email}</Text>
        </Box>
        <Box
          mt={8}
          p={4}
          bg="white"
          borderRadius={8}
          w="full"
        >
          <Button variant="ghost" ml={4} onClick={() => signout()} >
            Log Out
          </Button>
        </Box>
      </Flex>
    </DashboardShell>
  )
}


const AccountPage = () => (
  <Page name="Account" path="/account">
    <MyAccount />
  </Page>
);

export default AccountPage;