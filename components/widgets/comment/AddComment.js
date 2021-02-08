import React from 'react';
// import CommentLink from '../CommentLink';
import TextArea from '../../TextArea';

const CommentWidget = ({
  toAuthenticate,
  onSubmitComment,
  loading,
  user,
  btnStyles
}) => {
  return (
    <>
      <TextArea
        toAuthenticate={toAuthenticate}
        label="Leave comment"
        loginTextInfo="Login to leave comment"
        onSubmitHandler={onSubmitComment}
        user={user} loading={loading}
        btnStyles={btnStyles}
        placeholder="Leave a comment"
      />
    </>
  )
}

export default CommentWidget;