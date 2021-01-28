import React from 'react'
import {
  Heading,
  Text,
  Box
} from '@chakra-ui/react'
import AddSiteModal from './AddSiteModal'

const EmptyState = () => (
  <Box textAlign="center" m="0 auto" p={4}>
    <Heading as="h2" size="lg">You haven't added any sites.</Heading>
    <Text mb={6}>Welcome 👋 Let's get started.</Text>
    <AddSiteModal btnLabel="Add your first site" />
  </Box>
)

export default EmptyState;