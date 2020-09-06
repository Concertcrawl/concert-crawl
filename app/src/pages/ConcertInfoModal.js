import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { Button, Col, Collapse, Container, Modal, Row } from 'react-bootstrap'
import { httpConfig } from '../utils/http-config'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSavedConcerts } from '../store/savedConcerts'
import { v4 as uuidv4 } from 'uuid';
import { fetchFavoriteBands } from '../store/favoriteBands'

export const ConcertInfoModal = forwardRef((concert, ref) => {
  const [open, setOpen] = useState(false);
  const [show, setShow] = React.useState(false);
  const [color, setColor] = useState('primary')
  const [text, setText] = useState('Click to add concert!')

  const dispatch = useDispatch()

  const concerts = useSelector(store => {
    return store.savedConcerts ? store.savedConcerts : []
  })

  const auth = useSelector(store => {
    return store.auth
  })

  const {props, bands} = concert

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  useImperativeHandle(ref, () => {
    return {
      openModal: () => handleShow()
    }
  });

  const [star, setStar] = useState('star-white')

  const testFavorites = () => {
    if (auth !== null && concerts !== undefined) {
      if (concerts.some(e => e.concertId === props.concertId)) {
        setColor("secondary")
        setText("Click to remove concert.")
      }
    }
  }

  React.useEffect(testFavorites, [])


  const addBand = async (bandId) => {
    httpConfig.post("/apis/favorite-band/", {userFavoritesBandId: bandId})
      .then(
          dispatch(fetchFavoriteBands())
      );
  }

  const addConcert = async () => {
    httpConfig.post("/apis/save-concert/", {userConcertsConcertId: props.concertId})
      .then(reply => {
          let {message} = reply
          if (message.includes("added")) {
            setColor("secondary")
            setText("Click to remove concert.")
          } else if (message.includes("removed")) {
            setColor("primary")
            setText("Click to add concert!")
          }
          dispatch(fetchSavedConcerts())
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
              <h3
                className='col-12 modal-title text-center'>{props.concertDate.slice(0, 10)} - {props.bandName} - {props.concertAddress} @ {props.concertTime}
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
                         className="img-fluid my-auto cover">

                    </img>
                  </Col>
                  <Col xs={12} md={8} className="my-5">
                    <Container className="border mb-3">
                      <h1> {props.bandName} @ {props.concertVenueName}</h1>
                    </Container>
                    <Container className="border  my-3">
                      <Row>
                        <Col className="my-auto">
                          <h2> {props.concertDate.slice(0, 10)} & {props.concertTime}</h2>
                        </Col>
                        <Col>
                          <Button className="my-3 btn-block btn-dark py-2" href={props.concertTicketUrl}>Purchase
                            Tickets on Ticketmaster.</Button>
                          {auth === null && (
                            <p>You need to log in to save this concert.</p>
                          )}
                          {auth !== null && (
                            <Button className="my-3 btn-block py-2" variant={color} id="concertsToggle"
                                    onClick={addConcert}>{text}</Button>
                          )}
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
                <div id="bands-collapse">
                  {bands.filter(band => band.concertId === props.concertId).length === 1 && (
                    <p className="border-bottom py-3 text-center">No other bands playing at this concert.</p>)}
                  {bands.filter(band => band.concertId === props.concertId && band.isHeadliner === 0).map(band => <p
                    key={uuidv4()} className="display-4 border-bottom py-3 text-center">{band.bandName}<Button
                    role="img"
                    aria-label="Star" className="bg-transparent border-0" onClick={() => addBand(band.bandId)}><span className={star}>&#9733;</span></Button></p>)}
                </div>
              </Collapse>
            </Modal.Body>
          </Modal.Dialog>
        </Modal>
      </>
    )
  }
})