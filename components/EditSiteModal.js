import React from 'react';
import { useForm } from 'react-hook-form';
const {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Button,
  Switch,
  useToast,
  useDisclosure,
  IconButton
} = require("@chakra-ui/react")
import { SettingsIcon } from '@chakra-ui/icons';

import { updateSite } from '@/lib/db';
import { mutate } from 'swr';


const EditSiteModal = ({ settings, siteId }) => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { handleSubmit, register } = useForm();

  const onUpdateSite = async (newSetting) => {
    await updateSite(siteId, {
      settings: newSetting
    })
    toast({
      title: 'Success!',
      description: "We've updated your site",
      status: 'success',
      duration: 4000,
      isClosable: true
    });
    mutate(`/api/site/${siteId}`);
    onClose();
  }

  return (
    <>
      <IconButton
        aria-label="Site Settings"
        icon={<SettingsIcon />}
        variant="solid"
        onClick={onOpen}
        mx={1}
        colorScheme="gray"
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onUpdateSite)}>
          <ModalHeader fontWeight="bold">Update Site settings</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <Switch
                key={settings?.timestamp}
                name="timestamp"
                ref={register()}
                color="green"
                defaultIsChecked={settings?.timestamp}
              />
              <FormLabel ml={2} htmlFor="show-timestamp">
                Show Timestamp
              </FormLabel>
            </FormControl>
            <FormControl>
              <Switch
                key={settings?.icons}
                name="icons"
                ref={register()}
                color="green"
                defaultIsChecked={settings?.icons}
              />
              <FormLabel ml={2} htmlFor="show-icons">
                Show Icon
              </FormLabel>
            </FormControl>
            <FormControl>
              <Switch
                key={settings?.ratings}
                name="ratings"
                ref={register()}
                color="green"
                defaultIsChecked={settings?.ratings}
              />
              <FormLabel ml={2} htmlFor="show-ratings">
                Show Ratings
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

export default EditSiteModal;