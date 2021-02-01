import React from 'react';
import { Box, Text, Divider, Heading, Flex } from '@chakra-ui/react';
import Github from './icons/Github';
import Google from './icons/Google';

export default function Feedback({ author, createdAt, text, provider }) {
  return (
    <Box maxWidth="700px" >
      <Flex alignItems="center" align="center">
        <Heading size="sm" as="h3" mb={1} mt={2} mr={1}>
          {author}
        </Heading>
        {provider == 'github.com' ? <Github /> : <Google />}
      </Flex>
      <Text color="gray.500" fontSize="xs" mb={4} >
        {new Date(createdAt).toLocaleString()}
      </Text>
      <Text color="gray.800" mb={4}>{text}</Text>
      <Divider borderColor="gray.200" />
    </Box>
  );
}


