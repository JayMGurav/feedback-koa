import React from 'react';
import CommentLink from '../CommentLink';
import TextArea from '../TextArea';

const AddCommentWidget = ({
  siteId,
  toAuthenticate,
  onSubmitComment,
  loading,
  user,
  btnStyles
}) => {
  return (
    <>
      <CommentLink siteId={siteId} />
      <TextArea
        toAuthenticate={toAuthenticate}
        label="Leave comment"
        loginTextInfo="Login to leave comment"
        onSubmitHandler={onSubmitComment}
        user={user} loading={loading}
        btnStyles={btnStyles}
      />
    </>
  )
}

export default AddCommentWidget;