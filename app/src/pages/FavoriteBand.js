import React, { useState } from 'react'
import { Container, Row, Col, Collapse, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { fetchConcertsFromBands } from '../store/fetchConcertsFromBand'
import { SearchResult } from './SearchResult'

export const FavoritedBand = (props) => {
  const {band} = props
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch()

  const concerts = useSelector(store => {
    console.log(store.fetchConcertsFromBand)
    return store.fetchConcertsFromBand
  })

  const sideEffects = () => {
    dispatch(fetchConcertsFromBands(band.bandId))
  }
  React.useEffect(sideEffects, [])

  return (
    <>
      {console.log(band)}
      <Container className="border border-dark px-0 mb-4">
        <Row>
          <Col md={2} className="my-auto text-center">
            <Button className="bg-transparent border-0"><span className="display-4 text-warning" role="img" aria-label="star">&#11088;</span></Button>
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
                {concerts.map(concert => <SearchResult concert={concert} id={concert.concertId}/>)}
              </div>
            </Collapse>
          </Col>
        </Row>
      </Container>
    </>
  )
}