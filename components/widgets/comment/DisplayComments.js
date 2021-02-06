import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import Comment from '../../Comment';

function DisplayComments({ comments, settings }) {
  return (
    <Box py={4}>
      {comments?.length ? comments?.map((comment, index) => (
        <Comment
          key={comment.createdAt}
          isLast={index === comments?.length - 1}
          settings={settings}
          {...comment}
        />
      )) : (
        <Text mx="auto" color="gray.400" w="80%" px={2} textAlign="center">No comments yet!!, Go ahead and leave a comment above👆</Text>
      )}
    </Box>
  )
}

export default DisplayComments;