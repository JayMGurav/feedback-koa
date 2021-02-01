import React, { useState } from "react";
import { Tr, Td, Code, Switch } from "@chakra-ui/react";
import RemoveButton from './RemoveButton'
import { updateFeedback } from "@/lib/db";
import { useAuth } from "@/lib/auth";
import { mutate } from 'swr';

const FeedbackRow = ({ id, author, route, text, status }) => {
  const auth = useAuth();
  const [isToggled, setIsToggled] = useState(status === 'active');

  const toggleFeedback = async () => {
    
    await updateFeedback(id, { status: !isToggled ? 'active' : 'pending' });
    setIsToggled(!isToggled);
    mutate(['/api/feedback', auth.user.token]);
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
          onChange={toggleFeedback}
        />
      </Td>
      <Td>
        <RemoveButton feedbackId={id} />
      </Td>
    </Tr>
  )
}

export default FeedbackRow;