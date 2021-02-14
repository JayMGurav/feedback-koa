import React, { useRef } from 'react';
import {
  Box,
  Skeleton,
  Text
} from '@chakra-ui/react';
import Comment from './Comment';
import useSWR from 'swr';
import fetcher from '@/utils/fetcher';

function SampleComment({ commentKey }) {
  const { data, error } = useSWR(`/api/comment/${commentKey}`, fetcher);
  const loading = !data && !error;
  if (error) console.log(error);

  const sampleComment = {
    author: "John Doe",
    text: "This is just a sample comment, The comments on your site will look similar to this comment.", createdAt: new Date().toISOString(),
    provider: "google.com",
    isLast: true,
    settings: data?.commentData?.settings
  }

  return (
    <Box px={2} mb={6}>
      <Text size="md" my={2} color="gray.500" fontWeight="bold">Sample comment</Text>
      <Box bg="white" p={4} >
        {loading ? <Skeleton height="60px" w="full" /> : <Comment {...sampleComment} />}
      </Box>
    </Box>
  )
}

export default SampleComment;