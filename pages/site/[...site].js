import React, { useRef } from 'react';
import { useRouter } from 'next/router'
import { Box, Flex, Text, Button, FormControl, useToast, Textarea } from '@chakra-ui/react';

import { useAuth } from '@/lib/auth';
import { createComment } from '@/lib/db';
import Comment from '@/components/Comment';
import fetcher from '@/utils/fetcher';
import DashboardShell from '@/components/DashbordShell';
import useSWR, { mutate } from 'swr';
import LogginButtons from '@/components/LogginButtons';

const CommentPage = () => {
  const { user, loading } = useAuth();
  const inputElem = useRef(null);
  const router = useRouter();
  const slug = router.query?.site || [];
  const siteId = slug ? slug[0] : null;
  const route = slug ? slug[1] : null;

  const commentApi = route
    ? `/api/comment/${siteId}/${route}`
    : `/api/comment/${siteId}`;
  // const { data: { site } } = useSWR(`/api/site/${siteId}`, fetcher);
  const { data } = useSWR(commentApi, fetcher);
  const { comments, site } = { comments: data?.comments, site: data?.site };
  // return (<Box>   <h1>Slug: {slug.join('/')}</h1> this  {user?.email}</Box>)

  const onSubmit = (e) => {
    e.preventDefault();

    const newComment = {
      siteId,
      siteAuthorId: site.ownerId,
      route: route || '/',
      author: user.name,
      authorId: user.uid,
      text: inputElem.current.value.replace('\n', '\n\n'),
      createdAt: new Date().toISOString(),
      provider: user.provider,
      status: 'pending'
    };

    inputElem.current.value = '';
    createComment(newComment);
    mutate(
      commentApi,
      async (data) => ({
        comments: [newComment, ...data.comments]
      }),
      false
    );
  };

  return (
    <DashboardShell>
      <Box
        display="flex"
        mx={4}
        flexDirection="column"
        width="full"
        maxWidth="700px"
      >
        {!loading && !user && <Text color="orange.300" my={2}>Login to leave a comment</Text>}
        <Box as="form" onSubmit={onSubmit}>
          <FormControl mb={8}>
            <Textarea
              ref={inputElem}
              id="comment"
              placeholder="Leave a comment"
              isDisabled={!user}
              h="100px"
            />
            {!loading && <LoginOrLeaveComment user={user} comments={comments} site={site} />}
          </FormControl>
        </Box>
        {
          comments &&
          comments.map((comment, index) => (
            <Comment
              key={comment.id}
              settings={site?.settings}
              isLast={index === comments.length - 1}
              {...comment}
            />
          ))
        }
      </Box>
    </DashboardShell>
    // </Flex>
  );
}


function LoginOrLeaveComment({ user, comments, site }) {

  return user ? (
    <Button
      type="submit"
      isDisabled={!comments || !site}
      backgroundColor="gray.900"
      color="white"
      fontWeight="medium"
      mt={4}
      _hover={{ bg: 'gray.700' }}
      _active={{
        bg: 'gray.800',
        transform: 'scale(0.95)'
      }}
    >
      Leave Comment
    </Button>
  ) : (
    <LogginButtons />
  );


}



export default CommentPage;