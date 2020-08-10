import React from 'react'
import { Container, Row } from 'react-bootstrap'
import { SearchResult } from './SearchResult'

export const SavedConcerts = () => {
  return (
    <>
      <Container fluid className="border border-dark">
        <Row>
          <h1 className="text-center col-12">Saved Concerts</h1>
        </Row>
      </Container>

      <SearchResult/>
      <SearchResult/>
      <SearchResult/>


    </>
  )
}