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
import { deleteComment } from '@/lib/db'
import { DeleteIcon } from '@chakra-ui/icons';
import { mutate } from 'swr';
import { useAuth } from '@/lib/auth';


function DeleteCommentButton({ commentId }) {
  const auth = useAuth();
  const [isOpen, setIsOpen] = useState(false)
  const toast = useToast()
  const cancelRef = useRef()

  const onClose = () => setIsOpen(false)
  const onDelete = (e) => {
    deleteComment(commentId);
    toast({
      title: "Success!",
      description: `We've removed your comment`,
      status: "success",
      duration: 4000,
      isClosable: true,
    })
    mutate(
      ['/api/comment', auth.user.token],
      async (data) => {
        return { comments: data.comments.filter(comment => comment.id !== commentId) }
      }, false);
    onClose()
  }

  return (
    <>

      <IconButton
        aria-label="Delete comment"
        icon={<DeleteIcon />}
        variant="ghost"
        colorScheme="red"
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
              Delete comment
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure, you want to delete this comment? You can't undo this action afterwards.
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
export default DeleteCommentButton;