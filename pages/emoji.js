import FeedbackWidget from '@/components/widgets/feedback/AddFeedback';
import { Box } from '@chakra-ui/layout';
import React from 'react';

export default function Emojis(params) {
  return (
    <Box bg="gray.50">
      <FeedbackWidget title="Was this helpful?" />
    </Box>
  )
}