import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { FavoritedBand } from './FavoriteBand'
import { SearchResult } from './SearchResult'
import { useDispatch, useSelector } from 'react-redux'
import { fetchFavoriteBands } from '../store/favoriteBands'


export const UserFavorites = () => {
  const dispatch = useDispatch()
  const bands = useSelector(store => {
    return store.favoriteBand
  })
  const sideEffects = () => {
    dispatch (fetchFavoriteBands())
  }
  React.useEffect(sideEffects, [])
  return (
    <>
      <Container fluid>
        <Row>
          <Col>
            <h1 className="text-center mt-5 mb-3"> Favorited Bands</h1>
            {bands.map(band => <FavoritedBand band={band} id={band.bandId}/>)}
          </Col>
        </Row>
      </Container>

    </>
  )
}