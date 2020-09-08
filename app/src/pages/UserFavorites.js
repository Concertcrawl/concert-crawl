import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { FavoritedBand } from './FavoriteBand'
import {  useSelector } from 'react-redux'

export const UserFavorites = () => {

  const auth = useSelector(store => {
    return store.auth
  })

  const bands = useSelector(store => {
    return store.favoriteBand ? store.favoriteBand : []
  })

  return (
    <>
      <Container fluid className="fav-bands-body">
        <Row>
          <Col className="favorite-bands">
            <h1 className="fav-bands-header text-center mb-3"> Favorited Bands</h1>
            {auth !== null && (
              bands.map(band => <FavoritedBand band={band} key={band.bandId}/>)
            )}
            {auth === null && (
              <p className="text-center lead not-logged-in">Welcome to Concert Crawl! You must be logged in to start adding bands to
                your favorites!</p>
            )}
          </Col>
        </Row>
      </Container>
    </>
  )
}