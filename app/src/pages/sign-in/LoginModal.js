import React, { useState } from 'react'
import { Modal, Button} from 'react-bootstrap'
import { LogInForm } from './LogInForm'

export const LoginModal = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true)

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Sign In
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        data-backdrop={false}
        className="test-class">
        <LogInForm/>
      </Modal>
    </>

  )
}