import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Wrap,
  Flex,
  FormErrorMessage,
  FormControl,
  FormLabel,
  Button,
  Input,
  Textarea,
  SlideFade,
  Heading,
  Text
} from "@chakra-ui/react"


import ReactionEmojis from './ReactionEmojis';
import mergeRefs from '@/utils/mergeRefs';
import { createFeedback } from '@/lib/db';
import FeedbackLink from '@/components/FeedbackLink';



function FeedbackWidget({ feedbackKey, title, route, siteId, borderColor }) {
  const [reaction, setReaction] = useState(false);
  const [statusMsg, setStatusMsg] = useState({});
  const [loading, setLoading] = useState(false);
  const initialFocusRef = React.useRef()
  const { register, handleSubmit, reset, errors } = useForm();


  const onSubmit = async (data, e) => {
    const newFeedback = {
      route: route || '/',
      createdAt: new Date().toISOString(),
      reaction: reaction,
      ...data
    }
    setLoading(true);
    await createFeedback(feedbackKey, newFeedback);
    console.log(newFeedback);
    setLoading(false);
    e.target.reset()
    setReaction(false);
    setStatusMsg({ msg: "Thankyou for your feedback!!🎉", color: "blue.500" });
  };

  const onReactionClicked = (reaction) => {
    if (initialFocusRef.current) {
      initialFocusRef.current.focus();
    }
    setReaction(reaction);
    setStatusMsg({ msg: "Go ahead tell us how you feel...", color: "blue.500" });
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
      >
        <FeedbackLink />
        <hr color="gray.500" />
        <Heading as="h5" size="sm" my={8} textAlign="center">{title}</Heading>
        <ReactionEmojis reaction={reaction} onClickhandler={onReactionClicked} />
        <SlideFade in={reaction} offsetY="20px" unmountOnExit >
          <form onSubmit={handleSubmit(onSubmit)} w="full" >
            <Flex direction={['column', 'row']} mt={8}>
              <FormControl
                id="email"
                mt={2}
                mr={2}
                isInvalid={errors?.email}
              >
                <FormLabel fontSize="xs" color="gray.600" fontWeight="normal">EMAIL</FormLabel>
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
                <FormLabel fontSize="xs" color="gray.600" fontWeight="normal">FULL NAME</FormLabel>
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
              <FormLabel fontSize="xs" color="gray.600" fontWeight="normal">FEEDBACK</FormLabel>
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
            <Button
              isLoading={loading}
              loadingText="Sending..."
              mt={4}
              mb={16}
              colorScheme="blue"
              size="sm"
              type="submit"
            >Send
            </Button>
          </form>
        </SlideFade >
        <Text color={statusMsg?.color} textAlign="center">{statusMsg?.msg}</Text>
        <hr color="gray.500" />
      </Flex >
    </>
  );
}

export default FeedbackWidget;