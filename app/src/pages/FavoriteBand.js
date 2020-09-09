import React, { useState } from 'react'
import { Button, Col, Collapse, Container, Row } from 'react-bootstrap'
import { httpConfig } from '../utils/http-config'
import { useDispatch, useSelector } from 'react-redux'
import { fetchFavoriteBands } from '../store/favoriteBands'
import { fetchConcertsFromBands } from '../store/concertsFromBand'
import { SearchResult } from './SearchResult'

export const FavoritedBand = (props) => {

  // Object destructuring to grab band element from props.

  const {band} = props

  // State handler for dropdown to show concerts.

  const [open, setOpen] = useState(false);

  // Declaring dispatch handler.

  const dispatch = useDispatch()

  // Declaring use selectors for redux store.

  const concerts = useSelector(store => {
    return store.concertsFromBand
  })

  const favBand = useSelector(store => {
    return store.favoriteBand ? store.favoriteBand : []
  })

  // Declaring side effects and what to dispatch.

  const sideEffects = () => {
    dispatch(fetchConcertsFromBands(band.bandId))
  }

  // Use effect handler for side effects.

  React.useEffect(sideEffects, [])

  // Api call to remove/app favorite band.

  const removeBand = async () => {
    httpConfig.post("/apis/favorite-band/", {userFavoritesBandId: band.bandId})
      .then(
        dispatch(fetchFavoriteBands())
      );
  }

  return (
    <>
      <Container fluid className="p-0 concert-search-result">
        <Row className="m-1">
          <Col md={2} className="my-auto text-center">
            <Button className="bg-transparent border-0"><span className="star-favorite display-4" role="img"
                                                              aria-label="star"
                                                              onClick={removeBand}>&#9733;</span></Button>
          </Col>
          <Col md={4} lg={2} className="text-center">
            <img src={band.bandImage} alt="A band." className="img-fluid">

            </img>
          </Col>
          <Col md={3} lg={5} className="my-auto text-center">
            <h2>
              {band.bandName}
            </h2>
          </Col>
          <Col md={3} lg={3} className="my-auto text-center">
            <Button variant="outline-dark"
                    onClick={() => setOpen(!open)}
                    aria-controls="example-collapse-text"
                    aria-expanded={open}
            >List of Concerts &#8659;</Button>

          </Col>
          <Col xs={12}>
            <Collapse in={open}>
              <div>
                {concerts.filter(concert => band.bandId === concert.bandId).map(concert => <SearchResult
                  concert={concert}
                  favStat={(favBand.some(e => e['bandId'] === concert.bandId) === true && ("star-favorite")) || ("star-no-favorite")}
                  key={concert.concertId}/>)}
              </div>
            </Collapse>
          </Col>
        </Row>
      </Container>
    </>
  )
}