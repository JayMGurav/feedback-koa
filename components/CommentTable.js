import React from "react";
import { Table, Thead, Tbody, Tr, Th } from "@chakra-ui/react";
import CommentRow from "./CommentRow";

const CommentTable = ({ allComments }) => {
  return (
    <Table variant="simple" >
      <Thead
        backgroundColor="gray.100"
      >
        <Tr>
          <Th>Name</Th>
          <Th>Comment</Th>
          <Th>Route</Th>
          <Th>Visible</Th>
          <Th>{" "}</Th>
        </Tr>
      </Thead>
      <Tbody>
        {allComments.map(comment => (
          <CommentRow {...comment} key={comment.id} />
        ))}
      </Tbody>
    </Table>
  )
}

export default CommentTable;