import React, { useState } from "react";
import { Tr, Td, Code, Switch } from "@chakra-ui/react";
import DeleteCommentButton from './DeleteCommentButton'
import { updateComment } from "@/lib/db";
import { useAuth } from "@/lib/auth";
import { mutate } from 'swr';

const CommentRow = ({ id, author, route, text, status }) => {
  const auth = useAuth();
  const [isToggled, setIsToggled] = useState(status === 'active');

  const toggleComment = async () => {

    await updateComment(id, { status: !isToggled ? 'active' : 'pending' });
    setIsToggled(!isToggled);
    mutate(['/api/comment', auth.user.token]);
  }
  return (
    <Tr key={id}>
      <Td>{author}</Td>
      <Td>{text}</Td>
      <Td>
        <Code>{route || '/'}</Code>
      </Td>
      <Td>
        <Switch
          size="md"
          colorScheme="green"
          isChecked={isToggled}
          defaultChecked={isToggled}
          onChange={toggleComment}
        />
      </Td>
      <Td>
        <DeleteCommentButton feedbackId={id} />
      </Td>
    </Tr>
  )
}

export default CommentRow;