import {
  Flex,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  Spacer,
} from '@chakra-ui/react'
import AddSiteModal from './AddSiteModal'

export default function TableHeader({ label, siteModal }) {
  return (
    <>
      <Breadcrumb mt={0}>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink color="gray.700" fontSize="sm" >{label}</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Flex alignItems="center">
        <Heading>My {label}</Heading>
        <Spacer />
        {siteModal && <AddSiteModal btnLabel="Add site" />}
      </Flex>
    </>
  )
}