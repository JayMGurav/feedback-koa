import React, { useState } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { useAuth } from '@/lib/auth';
import useSWR, { mutate } from 'swr';
import fetcher from '@/utils/fetcher';
import { createComment } from '@/lib/db';
import DisplayComments from './DisplayComments';
import CommentLink from '../CommentLink';
import TextArea from '../TextArea';


const CommentSection = ({ siteId, commentKey, route, btnStyles }) => {
  const { user, loading } = useAuth();

  const commentApi = route
    ? `/api/comment/${siteId}/${commentKey}/${route}`
    : `/api/comment/${siteId}/${commentKey}`;
  const { data } = useSWR(commentApi, fetcher);
  const { authentication, ...settings } = data?.commentData?.settings;

  const addComment = (comment) => {
    const commentData = {
      route: route || '/',
      text: comment,
      createdAt: new Date().toISOString(),
      status: 'active',
    }
    const newComment = authentication ? {
      provider: user.provider,
      author: user.name,
      authorId: user.uid,
      ...commentData
    } : commentData;


    createComment(commentKey, newComment);
    mutate(
      commentApi,
      async (data) => ({
        comments: [newComment, ...data.comments]
      }),
      false
    );
  }

  return (
    <Flex
      flexDirection="column"
      w="full"
      mx="auto"
      maxW="800px"
      px={4}
    >
      <CommentLink siteId={siteId} />
      <TextArea
        toAuthenticate={authentication}
        label="Leave comment"
        loginTextInfo="Login to leave comment"
        onSubmitHandler={addComment}
        user={user}
        loading={loading}
        btnStyles={btnStyles}
      />
      <DisplayComments
        comments={data?.comments}
        settings={settings}
      />
    </Flex>
  )
}



export const CommentSectionWithoutFetching = ({
  allComments,
  settings,
  siteId,
  commentKey,
  route
}) => {
  const { user, loading } = useAuth();
  const [comments, setComments] = useState(allComments);
  const { authentication, ...commentDisplaySettings } = settings;


  // const commentApi = route
  //   ? `/api/comment/${siteId}/${commentKey}/${route}`
  //   : `/api/comment/${siteId}/${commentKey}`;

  const addComment = (comment) => {
    const commentData = {
      route: route || '/',
      text: comment,
      createdAt: new Date().toISOString(),
      status: 'active',
    }
    const newComment = authentication ? {
      provider: user.provider,
      author: user.name,
      authorId: user.uid,
      ...commentData
    } : commentData;

    createComment(commentKey, newComment);
    setComments([newComment, ...comments]);
    // mutate(
    //   commentApi,
    //   async (data) => ({
    //     comments: [newComment, ...data.comments]
    //   }),
    //   false
    // );
  }

  return (
    <Box
      // flexDirection="column"
      w="full"
      mx="auto"
      maxW="800px"
      px={4}
      // grow="1"
      overflowY="auto"
    >
      <CommentLink siteId={siteId} />
      <TextArea
        toAuthenticate={authentication}
        label="Leave comment"
        loginTextInfo="Login to leave comment"
        onSubmitHandler={addComment}
        user={user}
        loading={loading}
      />
      <DisplayComments
        comments={comments}
        settings={commentDisplaySettings}
      />
    </Box>
  )
}



export default CommentSection;