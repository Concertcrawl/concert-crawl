import React, { useState } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { ConcertInfoModal } from './ConcertInfoModal'
import { httpConfig } from '../utils/http-config'
import { fetchSavedConcerts } from '../store/savedConcerts'
import { useDispatch, useSelector } from 'react-redux'
import { fetchFavoriteBands } from '../store/favoriteBands'
import { fetchBandsFromConcerts } from '../store/bandsFromConcerts'

export const SearchResult = (props) => {
  const modalRef = React.useRef();

  const dispatch = useDispatch()

  const {concert} = props

  const [star, setStar] = useState('star-white')

  const auth = useSelector(store => {
    return store.auth
  })

  const favBands = useSelector(store => {
    return store.favoriteBand ? store.favoriteBand : []
  })

  const concertBands = useSelector(store => {
    return store.bandsFromConcert ? store.bandsFromConcert : []
  })

  const openModal = (concert) => {
    modalRef.current.openModal(concert)
  }

  const testFavorites = () => {
    if (auth !== null && favBands !== undefined) {
      favBands.forEach(e => {
        if (e.bandId === concert.bandId) {
          console.log(e.bandId, concert.bandId)
          setStar("star-yellow")
        }
      })
    }
  }

  const sideEffects = () => {
    dispatch(fetchBandsFromConcerts(concert.concertId))
  }

  React.useEffect(testFavorites, [])

  React.useEffect(sideEffects, [])



  const addBand = async () => {
    httpConfig.post("/apis/favorite-band/", {userFavoritesBandId: concert.bandId})
      .then(reply => {
          let {message} = reply
          if (message.includes("added")) {
            setStar('star-yellow')
          } else if (message.includes("removed")) {
            setStar('star-white')
          }
          dispatch(fetchSavedConcerts())
          dispatch(fetchFavoriteBands())
        }
      );
  }

  return (
    <>
      <ConcertInfoModal props={concert} bands={concertBands} ref={modalRef}/>
      <Container fluid className="concert-modals-search pb-1 mt-1">
        <Row>
          <Col md={1} className="d-none d-lg-flex">
          </Col>
          <Col md={2} className="d-none d-md-flex">
            <img src={concert.concertImage} className="float-right cover img-fluid" alt="This is a placeholder.">
            </img>
          </Col>
          <Col xs={12} sm={3} md={2} className="my-auto text-center">
            <p className="lead">{concert.concertDate.slice(0, 10)}</p>
            <p className="lead">{concert.concertTime}</p>
          </Col>
          <Col xs={12} sm={6} md={2} className="my-auto">
            <h2 className="text-center">{concert.concertName}<Button variant="outline-dark" className="border-0 p-0"
                                                                     onClick={openModal}><h2>&#65291;</h2></Button></h2>
          </Col>
          <Col xs={12} sm={3} md={4} lg={2} className="my-auto text-center">
            <p className="lead">{concert.bandName}<Button variant="outline-dark" className="border-0 p-0"
                                                          onClick={addBand}><h2><span role="img"
                                                                                      aria-label="Star"
                                                                                      className={star}>&#9733;</span>
            </h2></Button></p>
            <p className="lead">{concert.concertAddress}</p>
          </Col>
          <Col md={2} className="d-none d-md-flex">
            <img src={concert.bandImage} alt="This is a placeholder." className="img-fluid cover">
            </img>
          </Col>
          <Col md={1} className="d-none d-lg-flex">
          </Col>
        </Row>
      </Container>
    </>
  )
}