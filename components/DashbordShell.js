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
  Button,
  Spacer,
} from '@chakra-ui/react'
import { useAuth } from '@/lib/auth'
import AddSiteModal from './AddSiteModal'


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
          {auth.user && <Button variant="ghost" mr={2} onClick={() => auth?.signout()}>Logout</Button>}
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
          <Flex alignItems="center">
            <Heading>My Sites</Heading>
            <Spacer />
            <AddSiteModal btnLabel="Add site" />
          </Flex>
          <Flex
            flexDirection="column"
            backgroundColor="white"
            borderRadius="8px"
            alignItems="center"
            justifyContent="center"
            mt={4}
            p={4}
            overflowX="auto"
            overflowY="hidden"
          >
            {children}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}
export default DashboardShell