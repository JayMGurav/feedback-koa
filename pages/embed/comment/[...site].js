import { useRouter } from 'next/router';
import { Box } from '@chakra-ui/react';
import 'iframe-resizer/js/iframeResizer.contentWindow';
import { getAllComments, getAllSites, getCommentData } from '@/lib/db-admin';
import { CommentSectionWithoutFetching } from '@/components/widgets/comment/CommentSection';

export async function getStaticProps(context) {
  const [_, commentKey, route] = context.params.site;
  const comments = await getAllComments(commentKey, route);
  const { settings } = await getCommentData(commentKey);

  return {
    props: {
      initialFeedback: comments,
      settings
    },
    revalidate: 1
  };
}

export async function getStaticPaths() {
  const sites = await getAllSites();
  const paths = sites.map((site) => ({
    params: {
      site: [site.id.toString(), site.commentKey.toString()]
    }
  }));

  return {
    paths,
    fallback: true
  };
}

const EmbeddedCommentPage = ({ initialFeedback, settings }) => {
  const router = useRouter();
  const [siteId, commentKey, route] = router?.query?.site;
  // console.log({ siteId, commentKey, route });


  return (
    <Box display="flex" flexDirection="column" width="full">
      <CommentSectionWithoutFetching
        allComments={initialFeedback}
        settings={settings}
        siteId={siteId}
        commentKey={commentKey}
        route={route}
      />
    </Box>
  );
};

export default EmbeddedCommentPage;