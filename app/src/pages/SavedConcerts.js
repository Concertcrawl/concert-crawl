import React from 'react'
import { Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSavedConcerts } from '../store/savedConcerts'
import { SearchResult } from './SearchResult'

export const SavedConcerts = () => {
  const dispatch = useDispatch()
  const concerts = useSelector(store => {
    return store.savedConcerts
  })

  const sideEffects = () => {
    dispatch (fetchSavedConcerts())
  }
  React.useEffect(sideEffects, [])
  return (
    <>
      <Container fluid className="border border-dark">
        <Row>
          <h1 className="text-center col-12">Saved Concerts</h1>
          {concerts.map(concert => <SearchResult concert={concert} id={concert.concertId}/>)}
        </Row>
      </Container>
    </>
  )
}

