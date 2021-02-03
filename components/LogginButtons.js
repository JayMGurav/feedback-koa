import React from 'react';
import { Button, Flex } from '@chakra-ui/react';

import { useAuth } from '@/lib/auth';
import Github from './icons/Github';
import Google from './icons/Google';

const LogginButtons = () => {
  const auth = useAuth();

  return (
    <Flex direction={['column', 'row']} >
      <Button
        mt={2}
        mr={2}
        leftIcon={<Github />}
        size="sm"
        backgroundColor="gray.900"
        color="white"
        _hover={{ bg: "gray.700" }}
        _active={{
          bg: "gray.800",
          transform: 'scale(0.95)'
        }}
        onClick={() => auth.signinWithGithub('/')}
      >
        Sign in with Github
      </Button>
      <Button
        mt={2}
        mr={2}
        leftIcon={<Google />}
        size="sm"
        backgroundColor="white"
        color="gray.900"
        variant="outline"
        _hover={{ bg: "gray.100" }}
        _active={{
          bg: "gray.100",
          transform: 'scale(0.95)'
        }}
        onClick={() => auth.signinWithGoogle('/')}
      >
        Sign in with Google
      </Button>
    </Flex>
  );
}

export default LogginButtons;