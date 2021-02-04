import React, { useState } from 'react';
import { Box, Button, Flex, FormControl, Textarea } from '@chakra-ui/react';
import CommentLink from '../CommentLink';
import { useAuth } from '@/lib/auth';
import LogginButtons from '../LogginButtons';
import useSWR, { mutate } from 'swr';
import fetcher from '@/utils/fetcher';
import { createComment } from '@/lib/db';
import Comment from '../Comment';





const AddCommentWidget = ({ siteId, commentKey, route, btnStyles }) => {
  const [value, setValue] = useState("");
  const { user, loading } = useAuth();

  const commentApi = route
    ? `/api/comment/${siteId}/${commentKey}/${route}`
    : `/api/comment/${siteId}/${commentKey}`;

  const { data } = useSWR(commentApi, fetcher);
  // const { comments, site, commentData } = { comments: data?.comments, site: data?.site, commentData: data?.commentData };
  // console.log(data);

  const toAuthenticate = data?.commentData?.settings.authentication;

  const styles = {
    colorScheme: btnStyles?.colorScheme || "gray",
    variant: btnStyles?.variant || "solid",
    size: btnStyles?.size || "sm"
  }

  const handleInputChange = (e) => {
    let inputValue = e.target.value
    setValue(inputValue)
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const commentData = {
      route: route || '/',
      text: value.replace('\n', '\n\n'),
      createdAt: new Date().toISOString(),
      status: 'active',
    }

    const newComment = toAuthenticate ? {
      provider: user.provider,
      author: user.name,
      authorId: user.uid,
      ...commentData
    } : commentData;
    // default assume comment collection and subdocument sitecomments exist
    createComment(commentKey, newComment);
    mutate(
      commentApi,
      async (data) => ({
        comments: [newComment, ...data.comments]
      }),
      false
    );
    setValue("");
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
      <Box as="form" onSubmit={onSubmit} mb={4}>
        <FormControl mb={4}>
          <Textarea
            value={value}
            onChange={handleInputChange}
            id="comment"
            placeholder="Leave a comment"
            isDisabled={toAuthenticate && !loading && !user}
            h="100px"
            resize="vertical"
          />
          {toAuthenticate && !loading && !user ? <LogginButtons /> : (
            <Button
              type="submit"
              {...styles}
              isDisabled={!value}
            >
              Leave comment
            </Button>
          )}
        </FormControl>
      </Box>
      <Box>
        {data?.comments?.map((comment, index) => (
          <Comment
            key={comment.createdAt}
            isLast={index === data?.comments?.length - 1}
            settings={data?.commentData?.settings}
            {...comment}
          />
        ))}
      </Box>
    </Flex>
  )
}


export default AddCommentWidget;