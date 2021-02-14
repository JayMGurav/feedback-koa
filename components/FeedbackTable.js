import React from "react";
import { Table, Thead, Tbody, Tr, Th } from "@chakra-ui/react";
import FeedbackRow from "./FeedbackRow";

const FeedbackTable = ({ allFeedbacks }) => {
  return (
    <Table variant="simple" >
      <Thead
        backgroundColor="gray.100"
      >
        <Tr>
          <Th>Name</Th>
          <Th>Reaction</Th>
          <Th>Feedback</Th>
          <Th>Route</Th>
          <Th>Email</Th>
        </Tr>
      </Thead>
      <Tbody>
        {allFeedbacks.map(feedback => (
          <FeedbackRow  {...feedback} key={feedback.id} />
        ))}
      </Tbody>
    </Table>
  )
}

export default FeedbackTable;