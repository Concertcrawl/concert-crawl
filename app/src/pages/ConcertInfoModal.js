import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { Button, Col, Collapse, Container, Modal, Row } from 'react-bootstrap'
import { httpConfig } from '../utils/http-config'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSavedConcerts } from '../store/savedConcerts'

export const ConcertInfoModal = forwardRef((concert, ref) => {
  const [open, setOpen] = useState(false);
  const [show, setShow] = React.useState(false);
  const [color, setColor]=useState('btn-primary')

  const dispatch = useDispatch()

  const concerts = useSelector(store => {
    return store.savedConcerts
  })

  const {props} = concert

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  useImperativeHandle(ref, () => {
    return {
      openModal: () => handleShow()
    }
  });


  const addConcert = () => {
    console.log(concerts)
    httpConfig.post("/apis/save-concert/", {userConcertsConcertId: props.concertId})
      .then(reply => {
          let {message, type} = reply
          if(message.includes("added")) {
            console.log(reply)
            dispatch(fetchSavedConcerts())
            setColor("btn-secondary")
          }
        }
      );
  }

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
              <h3 className='col-12 modal-title text-center'>{props.concertDate.slice(0,10)} - {props.bandName} - {props.concertAddress} @ {props.concertTime}
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
                    <img src={props.concertImage} alt="Placeholder"
                         className="img-fluid my-3">

                    </img>
                  </Col>
                  <Col xs={12} md={8} className="my-5">
                    <Container className="border mb-3">
                      <h1> {props.bandName} @ {props.concertVenueName}</h1>
                    </Container>
                    <Container className="border  my-3">
                      <Row>
                        <Col className="my-auto">
                          <h2> {props.concertDate.slice(0,10)} & {props.concertTime}</h2>
                        </Col>
                        <Col>
                          <Button className="my-3 btn-block btn-dark py-2" href={props.concertTicketUrl}>Purchase Tickets on Ticketmaster.</Button>
                          <Button className="my-3 btn-block py-2" varient={color} id="concertsToggle" onClick={addConcert}>Add this concert to your events!</Button>
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
              >Bands &#8659;</Button>
              <Collapse in={open}>
                <div id="example-collapse-text">
                  <p className="display-4 border-bottom py-3 text-center">Band A<span role="img"
                                                                                      aria-label="Star">&#11088;</span>
                  </p>
                  <p className="display-4 border-bottom py-3 text-center">Band B<span role="img"
                                                                                      aria-label="Star">&#11088;</span>
                  </p>
                  <p className="display-4 py-3 text-center">Band C<span role="img"
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