import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { SearchResult } from './SearchResult'

export const SavedConcerts = () => {

  // Declaring redux store use selectors.

  const auth = useSelector(store => {
    return store.auth
  })

  const concerts = useSelector(store => {
    return store.savedConcerts ? store.savedConcerts : []
  })

  const favBand = useSelector(store => {
    return store.favoriteBand ? store.favoriteBand : []
  })

  return (
    <>
      <Container fluid className="saved-concerts register-user p-0">
        <Row>
          <Col>
            <h1 className="saved-header text-center">Saved Concerts</h1>
            {auth !== null && (concerts.map(concert => <SearchResult concert={concert}
                                                                     favStat={(favBand.some(e => e['bandId'] === concert.bandId) === true && ("star-favorite")) || ("star-no-favorite")}
                                                                     key={concert.concertId}/>))

            }
            {auth === null && (
              <p className="text-center lead not-logged-in">Welcome to Concert Crawl! You must be logged in to start
                adding
                concerts!</p>
            )}
          </Col>
        </Row>
      </Container>
    </>
  )
}

