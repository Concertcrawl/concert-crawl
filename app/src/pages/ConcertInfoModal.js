import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { Button, Modal, Container, Row, Col, Collapse } from 'react-bootstrap'

export const ConcertInfoModal = forwardRef((props, ref) => {
  const [open, setOpen] = useState(false);
  const [show, setShow] = React.useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  useImperativeHandle(ref, () => {
    return {
      openModal: () => handleShow()
    }
  });

  if (show) {
    return (
      <>
        <Modal
          show={show}
          dialogClassName="custom-modal-style"
          onHide={() => {
            handleClose();
            setOpen(false)
          }}
        >
          <Modal.Dialog className="custom-modal-style">
            <Modal.Header>
              <h3 className='col-12 modal-title text-center'>Date - Headliner - Location @ Time
                <Button type='button' className='close my-auto' onClick={() => {
                  handleClose();
                  setOpen(false);
                }}
                        aria-label='Close'>
                  <span aria-hidden='true'>&times;</span>
                </Button>
              </h3>
            </Modal.Header>
            <Modal.Body className="p-0">
              <Container>
                <Row>
                  <Col xs={12} md={4} className="d-flex justify-content-center">
                    <img src="https://via.placeholder.com/240x240?text=Vertical+Banner" alt="Placeholder"
                         className="img-fluid my-3">

                    </img>
                  </Col>
                  <Col xs={12} md={8}>
                    <Container className="border mb-3">
                      <h1> Headliner @ venue</h1>
                    </Container>
                    <Container className="border  my-3">
                      <Row>
                        <Col className="my-auto">
                          <h2> Date & Time</h2>
                        </Col>
                        <Col>
                          <Button className="my-3 btn-block btn-dark py-2">Purchase Tickets on Ticketmaster.</Button>
                          <Button className="my-3 btn-block btn-dark py-2">Add this concert to your events!</Button>
                        </Col>
                      </Row>
                    </Container>

                  </Col>
                </Row>
              </Container>
              <Button variant="outline-dark"
                      className="border-top border-bottom-0 border-right-0 border-left-0 btn-block p-0"
                      onClick={() => setOpen(!open)}
                      aria-controls="example-collapse-text"
                      aria-expanded={open}
              >v</Button>
              <Collapse in={open}>
                <div id="example-collapse-text">
                  <p className="display-4 border-bottom py-3 text-center">I really wanna<span role="img"
                                                                                              aria-label="Star">&#11088;</span>
                  </p>
                  <p className="display-4 border-bottom py-3 text-center">Really really wanna<span role="img"
                                                                                                   aria-label="Star">&#11088;</span>
                  </p>
                  <p className="display-4 py-3 text-center">Jump off a bridge<span role="img"
                                                                                   aria-label="Star">&#11088;</span></p>
                </div>
              </Collapse>
            </Modal.Body>
          </Modal.Dialog>
        </Modal>
      </>
    )
  }

  return null;
})