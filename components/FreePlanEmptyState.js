import React from 'react'
import {
  Flex,
  Heading,
  Text,
  Button
} from '@chakra-ui/react'
import DashboardShell from './DashbordShell'

const FreePlanEmptyState = () => (
  <DashboardShell>
    <Flex
      flexDirection="column"
      backgroundColor="white"
      borderRadius="8px"
      alignItems="center"
      justifyContent="center"
      mt={4}
      pl={8}
      pr={8}
      pt={4}
      pb={4}
    >
      <Heading as="h2">Get feedback on your site instantly</Heading>
      <Text>Start today, then grow with us🌱</Text>
      <Button variant="solid" size="md" mt={4}>
        Upgrade to Starter
              </Button>
    </Flex>
  </DashboardShell>
)

export default FreePlanEmptyState;