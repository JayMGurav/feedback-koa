import React from 'react';
import { Box, Text } from "@chakra-ui/react";

export const Th = props => (
  <Text
    as="th"
    textTransform="uppercase"
    fontSize="xs"
    color="gray.500"
    fontWeight="medium"
    px={4}
    {...props}
  />
);


export const Tr = props => (
  <Text
    as="tr"
    backgroundColor="gray.50"
    borderTopEndRadius={8}
    color="gray.500"
    borderBottomColor="gray.200"
    borderBottom="1px solid"
    height="40px"
    // p={4}
    {...props}
  />
);


export const Td = props => (
  <Text
    as="td"
    color="gray.500"
    p={4}
    borderBottom="1px solid"
    borderBottomColor="gray.100"
    {...props}
  />
);


export const Table = props => (
  <Box
    as="table"
    textAlign="left"
    backgroundColor="white"
    ml={0}
    mr={0}
    color="gray.500"
    borderRadius={8}
    boxShadow="0px 4px 10px rgba(0,0,0,0.05)"
    {...props}
  />
);

