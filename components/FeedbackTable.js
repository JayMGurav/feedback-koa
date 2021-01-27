import React from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Code, Switch } from "@chakra-ui/react";
import RemoveButton from './RemoveButton'

const FeedbackTable = ({ allFeedback }) => {
  return (
    <Table variant="simple" >
      <Thead
        backgroundColor="gray.100"
      >
        <Tr>
          <Th>Name</Th>
          <Th>Feedback</Th>
          <Th>Route</Th>
          <Th>Visible</Th>
          <Th>{" "}</Th>
        </Tr>
      </Thead>
      <Tbody>
        {allFeedback.map(feedback => (
          <Tr key={feedback.id}>
            <Td>{feedback.author}</Td>
            <Td>{feedback.text}</Td>
            <Td>
              <Code>{'/'}</Code>
            </Td>
            <Td><Switch size="md" variant="green" defaultChecked={feedback.status === 'active'} /></Td>
            <Td>
              <RemoveButton feedbackId={feedback.id} />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}

export default FeedbackTable;