import React from 'react';
import { Box, Text, Divider, Heading, Flex } from '@chakra-ui/react';
import Github from './icons/Github';
import Google from './icons/Google';

export default function Comment({ author, text, createdAt, provider, isLast, settings }) {

  let iconToDisplay = null;
  switch (provider) {
    case 'github.com':
      iconToDisplay = <Github />
      break;
    case 'google.com':
      iconToDisplay = <Google />
      break;
    default:
      iconToDisplay = null;
      break;
  }

  return (
    <Box maxWidth="700px" w="full">
      {author && <Flex align="center">
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
        {settings?.icons && iconToDisplay}
      </Flex>
      }
      {settings?.timestamp && (
        <Text color="gray.500" fontSize="xs" >
          <time>{new Date(createdAt).toLocaleString()}</time>
        </Text>
      )}
      <Text color="gray.800" mt={3}>{text}</Text>
      {!isLast && (
        <Divider borderColor="gray.300" my={6} />
      )}
    </Box>
  );
}


