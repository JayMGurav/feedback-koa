import React from 'react';
import { Box, Text, Divider, Heading, Flex } from '@chakra-ui/react';
import Github from './icons/Github';
import Google from './icons/Google';

export default function Feedback({ author, text, createdAt, provider, isLast, settings }) {
  console.log("hello")
  return (
    <Box borderRadius={4} maxWidth="700px" w="full">
      <Flex align="center">
        <Heading
          size="sm"
          as="h3"
          mb={0}
          color={authorColor[colorMode]}
          fontWeight="medium"
        >
          {author}
        </Heading>
        {settings?.icons &&
          provider == 'github.com' ? <Github /> : <Google />
        }
      </Flex>
      {settings?.timestamp && (
        <Text color="gray.500" fontSize="xs" mb={4} >
          {new Date(createdAt).toLocaleString()}
        </Text>
      )}
      <Text color="gray.800" mb={4}>{text}</Text>
      {!isLast && (
        <Divider borderColor="gray.200" mt={6} mb={6} />
      )}
    </Box>
  );
}


