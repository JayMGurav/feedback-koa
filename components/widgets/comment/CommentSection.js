import React, { useState } from 'react';
import { Box, Flex, Skeleton } from '@chakra-ui/react';
import { useAuth } from '@/lib/auth';
import useSWR, { mutate } from 'swr';
import fetcher from '@/utils/fetcher';
import { createComment } from '@/lib/db';
import DisplayComments from './DisplayComments';
import CommentLink from '../../CommentLink';
import TextArea from '../../TextArea';


const CommentSection = ({ siteId, commentKey, route, btnStyles }) => {
  const { user, loading } = useAuth();
  const [settings, setSetting] = useState({});
  const [toAuthenticate, setToAuthenticate] = useState(null);

  const commentApi = route
    ? `/api/comment/${siteId}/${commentKey}/${route}`
    : `/api/comment/${siteId}/${commentKey}`;

  // console.log({ in: 'commentSec', siteId, commentKey })
  const { data } = useSWR(commentApi, fetcher, {
    onSuccess: (data) => {
      setSetting(data.commentData.settings);
      setToAuthenticate(data.commentData.settings.authentication)
    }
  });

  const addComment = (comment) => {
    const commentData = {
      route: route || '/',
      text: comment,
      createdAt: new Date().toISOString(),
      status: 'active',
    }
    const newComment = toAuthenticate ? {
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
      <CommentLink paths={[`${siteId}`, `${commentKey}`, `${route}`]} />
      <TextArea
        toAuthenticate={toAuthenticate}
        label="Leave comment"
        loginTextInfo="Login to leave comment"
        onSubmitHandler={addComment}
        user={user}
        loading={loading}
        btnStyles={btnStyles}
      />
      {data ?
        <DisplayComments
          comments={data?.comments}
          settings={settings}
        />
        :
        <>
          <Skeleton height="100px" width="full" my={6} h="80vh" borderRadius={4} />
        </>
      }
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
  // const { authentication, ...commentDisplaySettings } = settings;

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
      <CommentLink paths={[`${siteId}`, `${commentKey}`, `${route}`]} />
      <TextArea
        toAuthenticate={settings?.authentication}
        label="Leave comment"
        loginTextInfo="Login to leave comment"
        onSubmitHandler={addComment}
        user={user}
        loading={loading}
      />
      {comments?.length ?
        <DisplayComments
          comments={comments}
          settings={settings}
        /> :
        <>
          <Skeleton height="100px" width="full" my={6} h="80vh" borderRadius={4} />
        </>
      }
    </Box>
  )
}



export default CommentSection;