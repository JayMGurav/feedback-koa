import React, { useRef } from 'react';
import { useRouter } from 'next/router'

import { useAuth } from '@/lib/auth';
import fetcher, { fetchData } from '@/utils/fetcher';
import DashboardShell from '@/components/DashbordShell';
import useSWR, { mutate } from 'swr';
import {
  Box,
  Code,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Link,
  Stack,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Switch,
  Text,
} from '@chakra-ui/react';
import { ExternalLinkIcon, WarningIcon } from '@chakra-ui/icons';
import NextLink from 'next/link'
import Comment from '@/components/Comment';

function SampleComment({ settings }) {
  const sampleComment = {
    author: "John Doe",
    text: "This is just a sample comment, The comments on your site will look similar to this comment.", createdAt: new Date().toISOString(),
    provider: "google.com",
    isLast: true,
    settings
  }

  return (
    <Box px={2} mb={6}>
      <Text size="md" my={2} color="gray.500" fontWeight="bold">Sample comment</Text>
      <Box bg="white" p={4} >
        <Comment {...sampleComment} />
      </Box>
    </Box>
  )
}

const SiteCommentsPage = () => {
  const { user } = useAuth();
  const router = useRouter();
  const siteId = router.query?.comment?.[0] || null;
  const commentKey = router.query?.comment?.[1] || null;
  const { data, error } = useSWR(user ? [`/api/comment/${siteId}/${commentKey}/allcomments`, user.token] : null, fetcher);

  const loading = !data && !error;
  if (error) console.log(error);
  console.log(data);

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


  function CommentSettings({ settings }) {
    return (
      <Box px={2} mb={6} >
        <Text size="md" my={2} color="gray.500" fontWeight="bold">Comment settings</Text>
        <Flex direction={["column", "row"]} w="100%" justify="space-between">
          <Box minW="30%" maxW="full" bg="white" borderRadius={6} p={5} borderWidth="1px">
            <Heading fontSize="sm">Authenticate comments</Heading>
            <Switch
              id="email-alerts"
              size="md"
              mt={3}
              colorScheme="green"
              defaultChecked={settings.authentication}
              onChange={() => console.log({ authentication: 'clicked' })}
            />
          </Box>
          <Box minW="30%" maxW="full" bg="white" borderRadius={6} p={5} borderWidth="1px" >
            <Heading fontSize="sm">View icons</Heading>
            <Switch
              id="email-alerts"
              size="md"
              mt={3}
              colorScheme="green"
              defaultChecked={settings.icons}
              onChange={() => console.log({ icons: 'clicked' })}
            />
          </Box>
          <Box minW="30%" maxW="full" bg="white" borderRadius={6} p={5} borderWidth="1px">
            <Heading fontSize="sm">View timestamp</Heading>
            <Switch
              id="email-alerts"
              size="md"
              mt={3}
              colorScheme="green"
              defaultChecked={settings.timestamp}
              onChange={() => console.log({ timestamp: 'clicked' })}
            />
          </Box>
        </Flex>
      </Box>
    )
  }

  const { site, commentData, comments } = data;
  return (
    <DashboardShell>
      <Box
        mt={4}
        // overflow="auto"
        bg="white"
        borderRadius={8}
      >
        <Box bg="gray.50" p={4} mb={4} pb={8}>
          <HStack mb={6} py={6} px={4} alignItems="center" justify="space-between">
            <Box>
              <Heading as="h1" >Comments</Heading>
              <Text fontWeight="bold" fontSize="xs">FOR {" "}
                <NextLink href="/site/[siteId]/" as={`/feedback/${commentData.siteId}`} passHref>
                  <Link color="blue.500">{(site.name).toUpperCase()}</Link>
                </NextLink>
              </Text>
            </Box>
            <FormControl textAlign="center" width="max-content">
              <FormLabel htmlFor="comments" mt="0" fontSize="xs">
                enabled?
            </FormLabel>
              <Switch
                id="enabled-commenting"
                size="md"
                colorScheme="green" defaultChecked={commentData.enabled}
                onChange={() => console.log({ enable: 'clicked' })} />
            </FormControl>
          </HStack>
          <Divider />
          <CommentSettings settings={commentData.settings} />
          <Divider />
          <SampleComment settings={commentData.settings} />
          {/* <Divider /> */}
        </Box>
        <Box>

        </Box>
      </Box>
    </DashboardShell >
  );
}

export default SiteCommentsPage;
