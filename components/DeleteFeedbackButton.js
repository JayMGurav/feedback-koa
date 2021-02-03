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
import { deleteFeedback } from '@/lib/db'
import { DeleteIcon } from '@chakra-ui/icons';
import { mutate } from 'swr';
import { useAuth } from '@/lib/auth';


function DeleteFeedbackButton({ feedbackId }) {
  const auth = useAuth();
  const [isOpen, setIsOpen] = useState(false)
  const toast = useToast()
  const cancelRef = useRef()

  const onClose = () => setIsOpen(false)
  const onDelete = (e) => {
    deleteFeedback(feedbackId);
    toast({
      title: "Success!",
      description: `We've removed your feedback`,
      status: "success",
      duration: 4000,
      isClosable: true,
    })
    mutate(
      ['/api/feedback', auth.user.token],
      async (data) => {
        return { feedbacks: data.feedbacks.filter(feedback => feedback.id !== feedbackId) }
      }, false);
    onClose()
  }

  return (
    <>

      <IconButton
        aria-label="Delete feedback"
        icon={<DeleteIcon />}
        variant="ghost"
        onClick={() => setIsOpen(true)}
      />

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Feedback
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure, you want to delete this feedback? You can't undo this action afterwards.
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
export default DeleteFeedbackButton;