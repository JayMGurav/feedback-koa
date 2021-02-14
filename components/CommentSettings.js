import React from 'react';
import useSWR, { mutate } from 'swr';
import {
  Button,
  FormControl,
  FormLabel,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Switch,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { updateComment } from '@/lib/db';
import { useAuth } from '@/lib/auth';
import fetcher from '@/utils/fetcher';
import { SettingsIcon } from '@chakra-ui/icons';


function CommentSettings({ commentKey }) {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { handleSubmit, register } = useForm();

  const { data, error } = useSWR(`/api/comment/${commentKey}`, fetcher);
  const loading = !data && !error;
  if (error) console.log(error);


  if (loading) {
    return (
      <IconButton
        aria-label="Loading Comment Settings"
        icon={<Spinner size="xs" />}
        variant="solid"
        onClick={onOpen}
        mx={1}
        colorScheme="gray"
      />
    )
  }

  const onUpdateCommentSettings = async (newSetting) => {
    await updateComment(commentKey, {
      settings: newSetting
    })
    toast({
      title: 'Success!',
      description: "We've updated your site",
      status: 'success',
      duration: 4000,
      isClosable: true
    });
    mutate(`/api/comment/${commentKey}`);
    onClose();
  }

  const { settings } = data?.commentData;

  return (
    <>
      <IconButton
        aria-label="Comment Settings"
        icon={<SettingsIcon />}
        variant="solid"
        onClick={onOpen}
        mx={1}
        colorScheme="gray"
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onUpdateCommentSettings)}>
          <ModalHeader fontWeight="bold">Update Comment settings</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <Switch
                key={settings?.authentication}
                name="authentication"
                ref={register()}
                color="green"
                defaultChecked={settings?.authentication}
              />
              <FormLabel ml={2} htmlFor="show-timestamp">
                Authenticate comments
              </FormLabel>
            </FormControl>
            <FormControl>
              <Switch
                key={settings?.icons}
                name="icons"
                ref={register()}
                color="green"
                defaultChecked={settings?.icons}
              />
              <FormLabel ml={2} htmlFor="show-icons">
                Show Icon
              </FormLabel>
            </FormControl>
            <FormControl>
              <Switch
                key={settings?.timestamp}
                name="timestamp"
                ref={register()}
                color="green"
                defaultChecked={settings?.timestamp}
              />
              <FormLabel ml={2} htmlFor="show-timestamp">
                Show timestamp
              </FormLabel>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose} mr={3} fontWeight="medium">
              Cancel
            </Button>
            <Button
              backgroundColor="#99FFFE"
              color="#194D4C"
              fontWeight="medium"
              type="submit"
            >
              Update
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default CommentSettings;



