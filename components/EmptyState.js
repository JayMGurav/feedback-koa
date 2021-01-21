import React from 'react'
import {
  Flex,
  Heading,
  Text,
  Button
} from '@chakra-ui/react'
import DashboardShell from './DashbordShell'
import AddSiteModal from './AddSiteModal'

const EmptyState = () => (
  <DashboardShell>
    <Flex
      flexDirection="column"
      backgroundColor="white"
      borderRadius="8px"
      alignItems="center"
      justifyContent="center"
      mt={4}
      p={8}
    >
      <Heading as="h2" size="lg">You haven't added any sites.</Heading>
      <Text mb={4}>Welcome 👋 Let's get started.</Text>
      {/* <Button variant="solid" size="md" mt={4}>
        Add your first site
      </Button> */}
      <AddSiteModal />
    </Flex>
  </DashboardShell>
)

export default EmptyState;