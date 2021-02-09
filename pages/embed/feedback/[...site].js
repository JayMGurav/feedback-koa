import React from 'react';
import { useRouter } from 'next/router'
import { Box } from '@chakra-ui/react';
import 'iframe-resizer/js/iframeResizer.contentWindow';
import FeedbackWidget from '@/components/widgets/feedback/FeedbackSection';

const EmbeddedFeedbackPage = () => {
  const router = useRouter()
  const site = router.query.site || []
  const siteId = site ? site[0] : null;
  const feedbackKey = site ? site[1] : null
  const route = site ? site[2] : null;

  return (
    <Box display="flex" flexDirection="column" width="full" pt={4}>
      <FeedbackWidget title="Was this helpful?" siteId={siteId} feedbackKey={feedbackKey} route={route} />
    </Box>
  )
}

export default EmbeddedFeedbackPage;