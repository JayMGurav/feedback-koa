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
} from "@chakra-ui/react"
import { useForm } from "react-hook-form";
import { createSite } from "@/lib/db";

function AddSiteModal() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = useRef();
  const { register, handleSubmit, watch, errors } = useForm();
  const oncreateSite = data => createSite(data);


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