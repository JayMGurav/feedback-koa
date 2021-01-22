import React from 'react'
import {
  Heading,
  Text,
} from '@chakra-ui/react'
import AddSiteModal from './AddSiteModal'

const EmptyState = () => (
  <>
    <Heading as="h2" size="lg">You haven't added any sites.</Heading>
    <Text mb={4}>Welcome 👋 Let's get started.</Text>
    <AddSiteModal btnLabel="Add your first site" />
  </>
)

export default EmptyState;