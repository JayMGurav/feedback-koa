import React from 'react';
import { Box, Text, Divider, Heading, Flex } from '@chakra-ui/react';
import Github from './icons/Github';
import Google from './icons/Google';

export default function Comment({ author, text, createdAt, provider, isLast, settings }) {
  return (
    <Box borderRadius={4} maxWidth="700px" w="full">
      <Flex align="center">
        <Heading
          size="sm"
          as="h3"
          mb={0}
          color="black"
          fontWeight="medium"
          mr={2}
          my={1}
        >
          {author}
        </Heading>
        {settings?.icons
          ? provider == 'github.com' ? <Github /> : <Google /> : null
        }
      </Flex>
      {settings?.timestamp && (
        <Text color="gray.500" fontSize="xs" mb={4} >
          <time>{new Date(createdAt).toLocaleString()}</time>
        </Text>
      )}
      <Text color="gray.800" mt={4}>{text}</Text>
      {!isLast && (
        <Divider borderColor="gray.200" mt={6} mb={6} />
      )}
    </Box>
  );
}


