import { Flex, Link } from '@chakra-ui/react';

export default function CommentLink({ siteId }) {
  return (
    <Flex flexWrap="wrap" justifyContent="space-between" alignItems={["flex-start", "center"]} mb={2} width="full" mt={1} >
      <Link fontWeight="bold" fontSize="sm" href={`/site/${siteId}`} mx={2}>
        Leave a comment →
      </Link>
      <Link fontSize="xs" color="blackAlpha.500" href="/" mx={2}>
        Powered by Feedback Koa
      </Link>
    </Flex>
  );
}


