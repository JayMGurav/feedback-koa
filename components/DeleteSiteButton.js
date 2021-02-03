import React, { useState, useRef } from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  IconButton,
  Button,
  useToast
} from "@chakra-ui/react"
import { deleteSite } from '@/lib/db'
import { DeleteIcon } from '@chakra-ui/icons';
import { mutate } from 'swr';
import { useAuth } from '@/lib/auth';


function DeleteSiteButton({ siteId }) {
  const auth = useAuth();
  const [isOpen, setIsOpen] = useState(false)
  const toast = useToast()
  const cancelRef = useRef()

  const onClose = () => setIsOpen(false)
  const onDelete = (e) => {
    deleteSite(siteId);
    toast({
      title: "Success!",
      description: `We've removed your site`,
      status: "success",
      duration: 4000,
      isClosable: true,
    })
    mutate(
      ['/api/sites', auth.user.token],
      async (data) => {
        return {
          sites: data.sites.filter((site) => site.id !== siteId)
        };
      },
      false
    );
    onClose()
  }

  return (
    <>

      <IconButton
        aria-label="Delete site"
        icon={<DeleteIcon />}
        variant="ghost"
        onClick={() => setIsOpen(true)}
        mx={1}
        colorScheme="red"
      />

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Site
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? This will also delete all data left on this site aswell.
              You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button fontWeight="bold" colorScheme="red" onClick={onDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}
export default DeleteSiteButton;