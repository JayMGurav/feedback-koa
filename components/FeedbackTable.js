import React from "react";
import { Table, Thead, Tbody, Tr, Th } from "@chakra-ui/react";
import FeedbackRow from "./FeedbackRow";

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
          <FeedbackRow {...feedback} key={feedback.id} />
        ))}
      </Tbody>
    </Table>
  )
}

export default FeedbackTable;