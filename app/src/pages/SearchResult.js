import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { ConcertInfoModal } from './ConcertInfoModal'
import { httpConfig } from '../utils/http-config'
import { useDispatch } from 'react-redux'
import { fetchFavoriteBands } from '../store/favoriteBands'
import Image from 'react-bootstrap/Image'

export const SearchResult = (props) => {

  // Declaring useRef

  const modalRef = React.useRef();

  // Declaring dispatch handler.

  const dispatch = useDispatch()

  // Object destructuring, grabbing concert from props.

  const {concert} = props

  // Passing modal concert props via useRef handler and useImperativeHandler

  const openModal = (concert) => {
    modalRef.current.openModal(concert)
  }

  // Post request to add band to favorites.

  const addBand = async () => {
    httpConfig.post("/apis/favorite-band/", {userFavoritesBandId: concert.bandId})
      .then(reply => {
          dispatch(fetchFavoriteBands())
        }
      );
  }

  return (
    <>
      <ConcertInfoModal props={concert} ref={modalRef}/>
      <Container fluid className="concert-search-result mt-1 border-dark">
        <Row>
          <Col md={1} className="d-none d-lg-flex">
          </Col>
          <Col xs={12} sm={3} md={4} lg={3} className="my-auto text-center">
            <p>{concert.bandName}<Button variant="outline-dark" className="border-0 p-0"
                                         onClick={addBand}><h5><span role="img"
                                                                     aria-label="Star"
                                                                     className={props.favStat}>&#9733;</span>
            </h5></Button></p>
            <p>{concert.concertAddress}</p>
          </Col>
          <Col xs={12} sm={6} md={3} className="my-auto">
            <h5 className="text-center">{concert.concertName}<Button variant="outline-dark" className="border-0 p-0"
                                                                     onClick={openModal}><h5 className="plus-icon">&#65291;</h5></Button></h5>
          </Col>
          <Col xs={12} sm={3} md={2} className="my-auto text-center">
            <p>{concert.concertDate.slice(0, 10)}</p>
            <p>{concert.concertTime}</p>
          </Col>
          <Col md={2} className="d-none d-md-flex">
            <Image src={concert.concertImage} className="float-right cover img-fluid" alt="Concert Flyer">
            </Image>
          </Col>
          <Col md={1} className="d-none d-lg-flex">
          </Col>
        </Row>
      </Container>
    </>
  )
}