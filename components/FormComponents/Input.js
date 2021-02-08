import { InputGroup } from "@chakra-ui/input";
import React from "react";
import { Input } from "@chakra-ui/react";

export function InputComponent({ register, name, ...rest }) {
  return <Input name={name} ref={register} {...rest} />;
}