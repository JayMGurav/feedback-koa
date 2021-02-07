import React from 'react';
import { useRouter } from 'next/router'
import { Box } from '@chakra-ui/react';
import 'iframe-resizer/js/iframeResizer.contentWindow';
import CommentSection from '@/components/widgets/comment/CommentSection';

const EmbeddedCommentPage = () => {
  const router = useRouter()
  const site = router.query.site || []
  const siteId = site ? site[0] : null;
  const commentKey = site ? site[1] : null
  const route = site ? site[2] : null;

  return (
    <Box display="flex" flexDirection="column" width="full" pt={4}>
      <CommentSection
        siteId={siteId}
        commentKey={commentKey}
        route={route}
      />
    </Box>
  )
}

export default EmbeddedCommentPage