import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { FavoritedBand } from './FavoriteBand'
import { useSelector } from 'react-redux'

export const UserFavorites = () => {

  const auth = useSelector(store => {
    return store.auth
  })

  const bands = useSelector(store => {
    return store.favoriteBand ? store.favoriteBand : []
  })
  return (
    <>
      {auth !== null && (
        <Container fluid className="fav-bands-body register-user p-0">
          <Row>
            <Col className="favorite-bands">
              <h1 className="fav-bands-header text-center mb-3"> Favorited Bands</h1>
              {bands.map(band => <FavoritedBand band={band} key={band.bandId}/>)}
            </Col>
          </Row>
        </Container>
      )}
      {auth === null && (
        <Container fluid className="fav-bands-body register-user p-0">
          <Row>
            <Col className="favorite-bands">
              <h1 className="fav-bands-header text-center mb-3"> Favorited Bands</h1>
              <p className="text-center lead not-logged-in">Welcome to Concert Crawl! You must be logged in to start
                adding bands to your favorites!</p>
            </Col>
          </Row>
        </Container>
      )}
    </>
  )
}