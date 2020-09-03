import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSavedConcerts } from '../store/savedConcerts'
import { SearchResult } from './SearchResult'
import { fetchAuth } from '../store/loginRedux'
import { fetchFavoriteBands } from '../store/favoriteBands'

export const SavedConcerts = () => {
  const dispatch = useDispatch()

  const auth = useSelector(store => {
    return store.auth
  })

  const concerts = useSelector(store => {
    return store.savedConcerts
  })

  useSelector(store => {
    return store.favoriteBand
  })

  const sideEffects = () => {
    dispatch (fetchSavedConcerts())
    dispatch (fetchAuth())
    dispatch (fetchFavoriteBands())
  }

  React.useEffect(sideEffects, [])

  return (
    <>
      <Container fluid className="border border-dark">
        <Row>
          <Col>
          <h1 className="text-center col-12">Saved Concerts</h1>
          {auth !== null && (
            concerts.map(concert => <SearchResult concert={concert} key={concert.concertId}/>)
          )}
          {auth === null && (
            <p className="text-center lead">Welcome to Concert Crawl! You must be logged in to start adding concerts!</p>
          )}
          </Col>
        </Row>
      </Container>
    </>
  )
}

