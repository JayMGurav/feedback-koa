import React from 'react';
import { Box, Text, Divider, Heading } from '@chakra-ui/react';

export default function Feedback({ author, createdAt, text }) {
  return (
    <Box borderRadius={4} maxWidth="700px" >
      <Heading size="sm" as="h3" mb={0} mt={2} >
        {author}
      </Heading>
      <Text color="gray.500" mb={2} fontSize="">
        {new Date(createdAt).toLocaleString()}
      </Text>
      <Text color="gray.800" mb={4}>{text}</Text>
      <Divider borderColor="gray.200" />
    </Box>
  );
}


