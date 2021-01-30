import React from 'react'
import {
  Flex,
  Stack,
  Link,
  Avatar,
  Button,
  Box,
} from '@chakra-ui/react'
import NextLink from 'next/link';

import { useAuth } from '@/lib/auth'
import { NextSeo } from 'next-seo';

const DashboardShell = ({ pageTitle, children }) => {
  const auth = useAuth()
  // const title = `Feedback Koa - ${pageTitle}`;
  // const url = '';
  return (
    <>
      {/* <NextSeo
        title={title}
        // canonical={url}
        openGraph={{
          url,
          title,
        }}
      /> */}
      <Flex
        flexDirection="column"
        height="100vh"
      >
        <Flex
          backgroundColor="whiteAlpha.500"
          justifyContent="space-between"
          alignItems="center"
          p={4}
        >
          <Stack
            spacing={4}
            isInline
            justifyContent="flex-start"
            alignItems="stretch"
          >
            <NextLink boxSize={3} display="block" href="/" passHref>🐨</NextLink>
            <NextLink href="/sites" passHref><Link>Sites</Link></NextLink>
            <NextLink href="/feedback" passHref><Link>My Feedbacks</Link></NextLink>
          </Stack>
          <Flex alignItems="center">
            {auth.user && <Button variant="ghost" mr={1} onClick={() => auth?.signout()}>Logout</Button>}
            <Avatar size="sm" src={auth?.user?.photoUrl} />
          </Flex>
        </Flex>
        <Flex
          flexDirection="row"
          backgroundColor="blackAlpha.50"
          p={8}
          flex="1"
          overflow="auto"
        >
          <Flex
            w="100%"
            maxWidth="800px"
            ml="auto"
            mr="auto"
            direction="column"
            flex={1}
          >
            {children}
          </Flex>
        </Flex>
      </Flex>
    </>
  )
}
export default DashboardShell