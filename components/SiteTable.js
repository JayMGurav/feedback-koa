import React from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Link } from "@chakra-ui/react";
import NextLink from 'next/link'

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
            <Td>
              <NextLink href="/site/[siteId]" as={`/site/${id}`} passHref>
                <Link color="blue.500">{name}</Link>
              </NextLink>
            </Td>
            <Td>
              <Link href={url} isExternal>
                {url}
              </Link>
            </Td>
            <Td>
              <NextLink href="/feedback/[siteId]" as={`/feedback/${id}`} passHref>
                <Link color="blue.500">View Feedback</Link>
              </NextLink>
            </Td>
            <Td>{new Date(createdAt).toLocaleString()}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}

export default SiteTable;