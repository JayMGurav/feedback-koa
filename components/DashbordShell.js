import React from 'react'
import {
  Flex,
  Stack,
  Link,
  Avatar,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
} from '@chakra-ui/react'
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
        py={4}
        px={2}
      >
        <Stack
          spacing={4}
          isInline
          justifyContent="flex-start"
          alignItems="stretch"
        >
          <Link boxSize={3} display="block">🐨</Link>
          <Link>Sites</Link>
          <Link>Feedback</Link>
        </Stack>
        <Flex alignItems="center">
          <Link pr={4}>Acount</Link>
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
          <Breadcrumb mb={4}>
            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink color="gray.700" fontSize="sm" >Sites</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <Heading>Sites</Heading>
          {children}
        </Flex>
      </Flex>
    </Flex>
  )
}
export default DashboardShell