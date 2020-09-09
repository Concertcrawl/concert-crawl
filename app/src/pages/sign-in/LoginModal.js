import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { LogInForm } from './LogInForm'

export const LoginModal = () => {

  // Hook for modal state.

  const [show, setShow] = useState(false);

  // Function to open and close modal.

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true)

  return (
    <>
      <Button variant="light" onClick={handleShow}>
        Sign In
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        data-backdrop={false}
        id="login-modal">
        <LogInForm/>
      </Modal>
    </>

  )
}