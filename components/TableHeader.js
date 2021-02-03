import {
  Flex,
  Breadcrumb,
  BreadcrumbItem,
  Heading,
  Spacer,
} from '@chakra-ui/react'
import NextLink from 'next/link'

export default function TableHeader({ label, url, action }) {
  return (
    <>
      <Breadcrumb mt={0}>
        <BreadcrumbItem isCurrentPage>
          <NextLink href={url} passHref color="gray.700" fontSize="sm" >{label}</NextLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Flex alignItems="center">
        <Heading>{label}</Heading>
        <Spacer />
        {action && action}
      </Flex>
    </>
  )
}