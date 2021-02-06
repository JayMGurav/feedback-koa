import React, { useState } from 'react';
import { Box, Button, FormControl, Textarea } from '@chakra-ui/react';
import { useAuth } from '@/lib/auth';
import LogginButtons from './LogginButtons';




const TextArea = ({
  label,
  user,
  loading,
  toAuthenticate,
  loginTextInfo,
  onSubmitHandler,
  btnStyles,
}) => {
  const [value, setValue] = useState("");
  // const { user, loading } = useAuth();
  const styles = {
    colorScheme: btnStyles?.colorScheme || "blue",
    variant: btnStyles?.variant || "solid",
    size: btnStyles?.size || "sm"
  }

  const handleInputChange = (e) => {
    let inputValue = e.target.value
    setValue(inputValue)
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const data = value.replace('\n', '\n\n');
    onSubmitHandler(data);
    setValue("");
  }

  return (
    <Box as="form" onSubmit={onSubmit} mb={4}>
      <FormControl mb={4}>
        <Textarea
          value={value}
          onChange={handleInputChange}
          id="comment"
          placeholder="Leave a comment"
          isDisabled={toAuthenticate && !loading && !user}
          h="100px"
          resize="vertical"
        />
        {toAuthenticate && !loading && !user ? <LogginButtons textInfo={loginTextInfo} /> : (
          <Button
            type="submit"
            mt={4}
            {...styles}
            isDisabled={!value}
          >
            {label}
          </Button>
        )}
      </FormControl>
    </Box>
  )
}


export default TextArea;