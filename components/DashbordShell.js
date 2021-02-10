import React from 'react'
import Head from 'next/head';
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


const DashboardShell = ({ children }) => {
  const auth = useAuth()
  return (
    <Flex
      flexDirection="column"
      height="100vh"
    >
      <Flex
        backgroundColor="whiteAlpha.500"
        justifyContent="space-between"
        alignItems="center"
        px={8}
        py={4}
      >
        <Stack
          spacing={4}
          isInline
          justifyContent="flex-start"
          alignItems="stretch"
        >
          <NextLink boxSize={3} display="block" href="/" passHref>
            <Link>🐨</Link>
          </NextLink>
          <NextLink href="/sites" passHref>
            <Link>Sites</Link>
          </NextLink>
          <NextLink href="/comments" passHref>
            <Link>Comments</Link>
          </NextLink>
        </Stack>
        <Flex alignItems="center">
          <NextLink href="/account" passHref>
            <Link>Account</Link>
          </NextLink>
          <Avatar size="sm" src={auth?.user?.photoUrl} mx={2} />
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
          maxWidth="900px"
          ml="auto"
          mr="auto"
          direction="column"
          flex={1}
        >
          {children}
        </Flex>
      </Flex>
    </Flex >
  )
}
export default DashboardShell