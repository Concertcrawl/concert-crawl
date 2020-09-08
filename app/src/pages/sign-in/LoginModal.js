import React, { useState } from 'react'
import { Modal, Button} from 'react-bootstrap'
import { LogInForm } from './LogInForm'

export const LoginModal = () => {
  const [show, setShow] = useState(false);

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