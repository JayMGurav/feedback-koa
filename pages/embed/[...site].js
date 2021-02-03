import React from 'react';
import { useRouter } from 'next/router'
import { Box, Text } from '@chakra-ui/react';

import { getAllComments, getAllSites, getSiteDetails } from '@/lib/db-admin';
import Comment from '@/components/Comment';
import CommentLink from '@/components/CommentLink';
// import { useAuth } from '@/lib/auth';
// import { createFeedback } from '@/lib/db';


export async function getStaticProps(context) {
  const [siteId, route] = context.params.site;
  const allCommentsForSite = await getAllComments(siteId, route);
  const site = await getSiteDetails(siteId);

  return {
    props: {
      initialComments: allCommentsForSite,
      site
    },
    revalidate: 1
  }
}

export async function getStaticPaths() {
  const sites = await getAllSites(),
    paths = sites.map(({ id }) => ({
      params: {
        site: [id.toString()]
      }
    }));


  return {
    paths,
    fallback: true
  };
}


function EmbedCommentPage({ initialComments, site }) {
  const router = useRouter();

  return (
    <Box display="flex" flexDirection="column" width="full">
      <CommentLink paths={router?.query?.site || []} />
      {initialComments?.length ? (
        initialComments.map((comment, index) => (
          <Comment
            key={comment.id}
            settings={site?.settings}
            isLast={index === initialComments.length - 1}
            {...comment}
          />
        ))
      ) : (
        <Text color="grey.500">
          There are no comments for this site.
        </Text>
      )}
    </Box>
  );
}



export default EmbedCommentPage;


