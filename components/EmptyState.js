import React from 'react'
import {
  Heading,
  Text,
  Box
} from '@chakra-ui/react'
// import AddSiteModal from './AddSiteModal'

const EmptyState = ({ title, content, action }) => (
  <Box textAlign="center" m="0 auto" p={4}>
    <Heading as="h2" size="lg">{title}</Heading>
    <Text mb={6}>{content}</Text>
    {action && action}
  </Box>
)

export default EmptyState;