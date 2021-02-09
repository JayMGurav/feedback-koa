import React, { useRef } from "react"
import { useForm } from "react-hook-form";
import { createSite } from "@/lib/db";
import { useAuth } from "@/lib/auth";
import { mutate } from 'swr';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Button,
  useDisclosure,
  useToast
} from "@chakra-ui/react"
import { AddIcon } from '@chakra-ui/icons'

function AddSiteModal({ label = null }) {
  const auth = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()
  const initialRef = useRef();
  const { register, handleSubmit } = useForm();


  const oncreateSite = async ({ name, url }) => {
    const newSite = {
      ownerId: auth.user.uid,
      createdAt: new Date().toISOString(),
      name,
      url
    }
    const { id } = await createSite(newSite);
    toast({
      title: "Success!",
      description: "We've added your site",
      status: "success",
      duration: 4000,
      isClosable: true,
    })
    mutate(
      ['/api/sites', auth.user.token],
      async (data) => ({ sites: [{ id, ...newSite }, ...data.sites] }),
      false
    );
    onClose();
  };


  return (
    <>
      <Button
        onClick={onOpen}
        size="sm"
        backgroundColor="gray.900"
        color="white"
        _hover={{ bg: "gray.700" }}
        _active={{
          bg: "gray.800",
          transform: 'scale(0.95)'
        }}
      >
        <AddIcon mr={label ? 2 : 0} />
        {label}
      </Button>
      <Modal
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(oncreateSite)}>
          <ModalHeader>Add Site</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input ref={initialRef} placeholder="Site name" name="name" ref={register({ required: true })} />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Link</FormLabel>
              <Input placeholder="Link to my website" name="url" ref={register({ required: true })} />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose} mr={3}>Cancel</Button>
            <Button backgroundColor="#99FFFE" color="#194D4c" variant="solid" type="submit">
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default AddSiteModal;