import React, { useRef } from "react"
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
import { useForm } from "react-hook-form";
import { createSite } from "@/lib/db";
import { useAuth } from "@/lib/auth";

function AddSiteModal() {
  const auth = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()
  const initialRef = useRef();
  const { register, handleSubmit, watch, errors } = useForm();


  const oncreateSite = ({ site, url }) => {
    createSite({
      owner: auth.user.uid,
      createdAt: new Date().toISOString(),
      site,
      url
    });
    onClose();
    toast({
      title: "Success!",
      description: `We've added ${site}`,
      status: "success",
      duration: 4000,
      isClosable: true,
    })
  };


  return (
    <>
      <Button onClick={onOpen} >Add your first site</Button>
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
              <Input ref={initialRef} placeholder="My site" name="site" ref={register({ required: true })} />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Link</FormLabel>
              <Input placeholder="https://mywebsite.com" name="url" ref={register({ required: true })} />
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