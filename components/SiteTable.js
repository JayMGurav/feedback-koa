import React from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Link } from "@chakra-ui/react";

const SiteTable = ({ sites }) => {
  return (
    <Table variant="simple" >
      <Thead
        backgroundColor="gray.100"
      >
        <Tr>
          <Th>Name</Th>
          <Th>Site Link</Th>
          <Th>Feedback Link</Th>
          <Th>Date Added</Th>
        </Tr>
      </Thead>
      <Tbody>
        {sites.map(({ name, url, createdAt, id }) => (
          <Tr key={createdAt}>
            <Td>{name}</Td>
            <Td>{url}</Td>
            <Td>
              <Link>View Feedback</Link>
            </Td>
            <Td>{new Date(createdAt).toLocaleString()}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}

export default SiteTable;