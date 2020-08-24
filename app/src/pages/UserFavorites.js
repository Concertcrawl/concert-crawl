import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { FavoritedBand } from './FavoriteBand'


export const UserFavorites = () => {
  return (
    <>
      <Container fluid>
        <Row>
          <Col>
            <h1 className="text-center mt-5 mb-3"> Favorited Bands</h1>
            <FavoritedBand/>
            <FavoritedBand/>
            <FavoritedBand/>
          </Col>
        </Row>
      </Container>

    </>
  )
}