import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ConfusedFace, CryingEmoji, HappyFace, Amazing } from '@/components/icons/ReactionIcons';
import {
  Wrap, WrapItem, Flex,
  FormErrorMessage,
  FormControl,
  FormLabel,
  Button,
  Input,
  Textarea,
  SlideFade,
  Divider,
  Heading
} from "@chakra-ui/react"
import mergeRefs from '@/utils/mergeRefs';


const ReactionEmojiWrapper = ({ onClickhandler, reaction }) => {
  const EmojiArray = [
    { component: CryingEmoji, value: "worst" },
    { component: ConfusedFace, value: "bad" },
    { component: HappyFace, value: "good" },
    { component: Amazing, value: "amazing" }
  ]
  return (
    <Wrap spacing={8} align="center" my={4} justify="center" width="full">
      {EmojiArray.map(({ component, value }, i) => (
        <WrapItem
          key={value + i}
          filter={reaction == value ? "none " : "grayscale(100%)"}
          transform={reaction == value ? "scale(1.3)" : "scale(1)"}
          transition="all 0.1s cubic-bezier(.47,.02,.54,.99)"
          _hover={{
            filter: "none",
            cursor: "pointer",
            transform: "scale(1.3)"
          }}
          onClick={() => onClickhandler(value)}
        >
          {React.createElement(component)}
        </WrapItem>
      ))}
    </Wrap>
  )
}


function FeedbackWidget({ title, bgColor }) {
  const [reaction, setReaction] = useState(null);
  const initialFocusRef = React.useRef()
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = data => {
    console.log({ ...data, reaction });
  };
  console.log(errors);

  const onReactionClicked = (reaction) => {
    if (initialFocusRef.current) {
      initialFocusRef.current.focus();
    }
    setReaction(reaction);
  }
  return (
    <>
      <Flex
        flexDirection="column"
        w="full"
        mx="auto"
        maxW="600px"
        p={4}
        my={4}
        bg="gray.50"
        borderRadius={8}
      >
        <Divider size="100px" />
        <Heading as="h5" size="sm" my={8} textAlign="center">{title}</Heading>
        <Wrap spacing={8} align="center" justify="center" mb={16} width="full">
          <ReactionEmojiWrapper reaction={reaction} onClickhandler={onReactionClicked} />
        </Wrap>
        <SlideFade in={reaction} offsetY="20px" unmountOnExit >
          <form onSubmit={handleSubmit(onSubmit)} w="full">
            <Flex direction={['column', 'row']} >
              <FormControl
                id="email"
                mt={2}
                mr={2}
                isInvalid={errors?.email}
              >
                <FormLabel fontSize="sm" color="gray.600">EMAIL</FormLabel>
                <Input
                  ref={mergeRefs(initialFocusRef, register({
                    required: { value: true, message: "Email is required" },
                    pattern: { value: /^\S+@\S+$/i, message: "Invalid Email Id" }
                  }))}
                  variant="outline"
                  errorBorderColor="red"
                  placeholder="Your email address..."
                  name="email"
                />
                <FormErrorMessage >{errors?.email?.message}</FormErrorMessage>
              </FormControl>
              <FormControl
                id="fullname"
                mt={2}
                isInvalid={errors?.fullname ? true : false}
              >
                <FormLabel fontSize="sm" color="gray.600">FULL NAME</FormLabel>
                <Input
                  variant="outline"
                  errorBorderColor="red.200"
                  placeholder="Your full name"
                  name="fullname"
                  ref={register({
                    required: { value: true, message: "Your fullname is required" },
                    maxLength: { value: 80, message: "Full name can't be more than 80 characters" }
                  })}
                />
                <FormErrorMessage>{errors?.fullname?.message}</FormErrorMessage>
              </FormControl>
            </Flex>
            <FormControl
              mt={4}
              isInvalid={errors?.feedback ? true : false}
            >
              <FormLabel fontSize="sm" color="gray.600">FEEDBACK</FormLabel>
              <Textarea
                ref={register({
                  required: { value: true, message: "Your Feedback is required" }
                })}
                name="feedback"
                w="full"
                h="100px"
                resize="vertical"
                placeholder="Enter your feedback here..."
                errorBorderColor="red.200"
              />
              <FormErrorMessage>{errors?.feedback?.message}</FormErrorMessage>
            </FormControl>
            <Button mt={4} mb={16} colorScheme="blue" size="sm" type="submit">Send</Button>
          </form>
        </SlideFade >
        <Divider />
      </Flex >
    </>
  );
}

export default FeedbackWidget;