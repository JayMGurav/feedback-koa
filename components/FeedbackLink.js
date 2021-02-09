import { Flex, Link } from '@chakra-ui/react';

export default function FeedbackLink() {
  return (
    <Flex flexWrap="wrap" justifyContent="flex-end" my={1} width="full" >
      <Link fontSize="xs" color="blackAlpha.500" href="/" mx={2}>
        Powered by Feedback Koa
      </Link>
    </Flex>
  );
}


