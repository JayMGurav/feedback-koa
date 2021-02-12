import React, { useRef } from 'react';
import { useRouter } from 'next/router'

import { useAuth } from '@/lib/auth';
import fetcher, { fetchData } from '@/utils/fetcher';
import DashboardShell from '@/components/DashbordShell';
import useSWR, { mutate } from 'swr';
import {
  Box,
  Code,
  Heading,
  Link,
  Stack,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
} from '@chakra-ui/react';
import { ExternalLinkIcon, WarningIcon } from '@chakra-ui/icons';
import NextLink from 'next/link'



const SiteDetailsPage = () => {
  const { user } = useAuth();
  const router = useRouter();
  // const { hasCopied, onCopy } = useClipboard(value)


  const siteId = router.query?.siteId || null;
  const { data, error } = useSWR(user ? [`/api/site/${siteId}`, user.token] : null, fetcher);

  const loading = !data && !error;
  if (error) console.log(error);
  if (loading) {
    return (
      <DashboardShell>
        <Box
          mt={4}
          p={4}
          overflowX="auto"
          overflowY="hidden"
          bg="white"
          borderRadius={8}
        >
          Loading,,,
        </Box>
      </DashboardShell>
    )
  }
  return (
    <DashboardShell>
      <Box
        mt={4}
        py={4}
        px={8}
        overflowX="auto"
        overflowY="hidden"
        bg="white"
        borderRadius={8}
      >
        <Box mb={6}>
          <Heading as="h1">{data.name}</Heading>
          <Link href={data.url} isExternal rel="noopener noreferrer">
            {data.url}
            <ExternalLinkIcon boxSize="0.85em" mb={3} ml={1} />
          </Link>
        </Box>
        <Stack direction={["column", "row"]} align="center" spacing={8} alignItems="center" >
          <Stat p={4} border="1px" borderRadius={6} borderColor="gray.200" >
            <StatLabel>Total Comments</StatLabel>
            <StatNumber >{data.commentCount}</StatNumber>
            <StatHelpText>
              <NextLink href="/comment/[siteId]/[commentKey]/" as={`/comment/${data.id}/${data.commentKey}/`} passHref>
                <Link color="blue.500">All Comments</Link>
              </NextLink>
            </StatHelpText>
          </Stat>
          <Stat p={4} border="1px" borderRadius={6} borderColor="gray.200" >
            <StatLabel>Total Feebacks</StatLabel>
            <StatNumber >{data.feedbackCount}</StatNumber>
            <StatHelpText>
              <NextLink href="/feedback/[siteId]/[feedbackKey]" as={`/feedback/${data.id}/${data.feedbackKey}`} passHref>
                <Link color="blue.500">All Feedbacks</Link>
              </NextLink>
            </StatHelpText>
          </Stat>
        </Stack>
        <Box p={4} my={4} borderRadius={6} bg="red.50">
          <Box mb={6}>
            <WarningIcon color="red.400" mr={2} />
            <Text as="strong">Your secrets </Text>
          </Box>
          <Text my={2} >Comment Key: <Code children={data.commentKey} px={2} bg="white" /></Text>
          <Text my={2} >Feedback Key: <Code children={data.feedbackKey} px={2} bg="white" /></Text>
        </Box>
      </Box>
    </DashboardShell >
  );
}

export default SiteDetailsPage;
