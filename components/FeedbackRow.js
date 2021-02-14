import React from "react";
import { Tr, Td, Code, Text } from "@chakra-ui/react";

const FeedbackRow = ({ fullname, email, route, feedback, reaction }) => (
  <Tr >
    <Td>{fullname}</Td>
    <Td>{reaction}</Td>
    <Td>{feedback}</Td>
    <Td>
      <Code>{route || '/'}</Code>
    </Td>
    <Td>{email}</Td>
  </Tr>
)

export default FeedbackRow;