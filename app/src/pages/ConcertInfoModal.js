import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { Button, Col, Collapse, Container, Modal, Row } from 'react-bootstrap'
import { httpConfig } from '../utils/http-config'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSavedConcerts } from '../store/savedConcerts'
import { v4 as uuidv4 } from 'uuid';
import { fetchFavoriteBands } from '../store/favoriteBands'
import { fetchBandsFromConcerts } from '../store/bandsFromConcerts'

// Modal uses forwardRef to get props and other references from external components.

export const ConcertInfoModal = forwardRef((concert, ref) => {

  // Use state handlers for opening and closing modal, dropdown, and setting text and button.

  const [open, setOpen] = useState(false);
  const [show, setShow] = React.useState(false);
  const [color, setColor] = useState('primary')
  const [text, setText] = useState('Click to add concert!')

  // Declaring dispatch handler.

  const dispatch = useDispatch()

  // Declaring use selectors for redux store.

  const concerts = useSelector(store => {
    return store.savedConcerts ? store.savedConcerts : []
  })

  const auth = useSelector(store => {
    return store.auth
  })

  const favBand = useSelector(store => {
    return store.favoriteBand ? store.favoriteBand : []
  })

  const bands = useSelector(store => {
    return store.bandsFromConcert ? store.bandsFromConcert : []
  })

  // Object destructuring for props.

  const {props} = concert

  // declaring initial star class.

  let star = "star-no-favorite"

  // Declaring side effects for redux.

  const sideEffects = () => {
    dispatch(fetchBandsFromConcerts(props.concertId))
  }

  // Use effect handler for redux side effects.

  React.useEffect(sideEffects, [])

  // Functions to open and close modal.

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  // Declares what is exposed to parent component.

  useImperativeHandle(ref, () => {
    return {
      openModal: () => handleShow()
    }
  });

  // Checking if concert is is added to user saves.

  const testFavorites = () => {
    if (auth !== null && concerts !== undefined) {
      if (concerts.some(e => e.concertId === props.concertId)) {
        setColor("secondary")
        setText("Click to remove concert.")
      }
    }
  }

  // Use effect handler for save checking.

  React.useEffect(testFavorites, [])

  // Function to add band, does an api call using the band ID and if succesful logic determines what class to set star state to.

  const addBand = async (bandId) => {
    httpConfig.post("/apis/favorite-band/", {userFavoritesBandId: bandId})
      .then(reply => {
          dispatch(fetchFavoriteBands())
          if (reply.message.includes("added")) {
            star = "star-favorite"
          } else {
            star = "star-no-favorite"
          }
        }
      )
  }

  // Logic to check if a band is a favorite, sets star accordingly.

  const starBand = (band) => {
    if (favBand.some(e => e['bandId'] === band.bandId) === true) {
      star = "star-favorite"
    } else {
      star = "star-no-favorite"
    }
  }

  // Function to add concert to saved concerts list. Checks if concert is already added or not and changes button state accordingly.

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
            <Modal.Header className="p-0 pb-1">
              <h3
                className='col-12 modal-title box-shadow text-center modal-top'>{props.concertDate.slice(0, 10)} | {props.bandName} | {props.concertAddress} @ {props.concertTime}
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
              <Container className="band-venue">
                <Row>
                  <Col md={12} xl={4} className="d-flex justify-content-center">
                    <img src={props.concertImage} alt="Placeholder"
                         className="img-fluid cover box-shadow mt-3 my-xl-auto">

                    </img>
                  </Col>
                  <Col md={12} xl={8} className="my-5">
                    <Container className="border border-light mb-3 box-shadow">
                      <h3> {props.bandName} @ {props.concertVenueName}</h3>
                    </Container>
                    <Container className="border border-light my-3 box-shadow">
                      <Row>
                        <Col className="my-auto">
                          <h4> {props.concertDate.slice(0, 10)} @ {props.concertTime}</h4>
                        </Col>
                        <Col>
                          <Button as="a" className="my-3 btn-block btn-dark py-2" target="_blank"
                                  href={props.concertTicketUrl}>Purchase
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
                      className="border-0 btn-block p-0"
                      onClick={() => setOpen(!open)}
                      aria-controls="example-collapse-text"
                      aria-expanded={open}
              >Bands &#8659;</Button>
              <Collapse in={open}>
                <div id="bands-collapse">
                  {bands.filter(band => band.concertId === props.concertId).map(band => <p
                    key={uuidv4()} className="display-4 border-bottom py-3 text-center">{band.bandName}<Button
                    role="img"
                    aria-label="Star" className="bg-transparent border-0"
                    onClick={() => (addBand(band.bandId))}>{starBand(band)}<span
                    className={star}>&#9733;</span></Button></p>)}
                </div>
              </Collapse>
            </Modal.Body>
          </Modal.Dialog>
        </Modal>
      </>
    )
  }
})