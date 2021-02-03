import React from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Link } from "@chakra-ui/react";
import NextLink from 'next/link'

import DeleteSiteButton from './DeleteSiteButton';
import EditSiteModal from './EditSiteModal';

const SiteTable = ({ sites, uid }) => {
  return (
    <Table variant="simple" >
      <Thead
        backgroundColor="gray.100"
      >
        <Tr>
          <Th>Name</Th>
          <Th>Site Link</Th>
          <Th>Comment Link</Th>
          <Th>Date Added</Th>
          <Th>{''}</Th>
        </Tr>
      </Thead>
      <Tbody>
        {sites.map(({ name, url, createdAt, id, ownerId, settings }) => (
          <Tr key={createdAt}>
            <Td>
              <NextLink href="/site/[siteId]" as={`/site/${id}`} passHref>
                <Link color="blue.500">{name}</Link>
              </NextLink>
            </Td>
            <Td>
              <Link href={url} isExternal rel="noopener noreferrer">
                {url}
              </Link>
            </Td>
            <Td>
              <NextLink href="/site/[siteId]" as={`/site/${id}`} passHref>
                <Link color="blue.500">View Comments</Link>
              </NextLink>
            </Td>
            <Td>{new Date(createdAt).toLocaleString()}</Td>
            <Td display="inline-flex">
              {uid == ownerId && (
                <>
                  <EditSiteModal settings={settings} siteId={id} />
                  <DeleteSiteButton siteId={id} />
                </>
              )}
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}

export default SiteTable;