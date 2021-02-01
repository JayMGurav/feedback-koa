import { Flex, Link } from '@chakra-ui/react';

export default function FeedbackLink({ siteId }) {
  return (
    <Flex flexWrap="wrap" justifyContent="space-between" alignItems={["flex-start", "center"]} mb={8} width="full" mt={1} >
      <Link fontWeight="bold" fontSize="sm" href={`/site/${siteId}`} mx={2}>
        Leave a comment →
      </Link>
      <Link fontSize="xs" color="blackAlpha.500" href="/" mx={2}>
        Powered by feedback-koa
      </Link>
    </Flex>
  );
}


