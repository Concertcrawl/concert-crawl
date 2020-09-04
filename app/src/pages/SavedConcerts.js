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
    return store.savedConcerts ? store.savedConcerts : []
  })

  console.log(concerts)

  useSelector(store => {
    return store.favoriteBand ? store.favoriteBand : []
  })

  const sideEffects = () => {
    dispatch(fetchFavoriteBands())
    dispatch(fetchSavedConcerts())
    dispatch(fetchAuth())
  }

  React.useEffect(sideEffects, [])

  return (
    <>
      <Container fluid className="saved-concerts">
        <Row>
          <Col>
            <h1 className="text-center col-12">Saved Concerts</h1>
            {auth !== null && (concerts.map(concert => <SearchResult concert={concert}
                                                                           key={concert.concertId}/>))

              }
            {auth === null && (
              <p className="text-center lead">Welcome to Concert Crawl! You must be logged in to start adding
                concerts!</p>
            )}
          </Col>
        </Row>
      </Container>
    </>
  )
}

