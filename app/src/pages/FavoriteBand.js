import React, { useState } from 'react'
import { Container, Row, Col, Collapse, Button } from 'react-bootstrap'
import { SearchResult } from './SearchResult'

export const FavoritedBand = () => {

  const [open, setOpen] = useState(false);

  return (
    <>
      <Container className="border border-dark p-0">
        <Row>
          <Col md={2} className="my-auto text-center">
            <Button className="bg-transparent border-0"><span className="display-4 text-warning" role="img" aria-label="star">&#11088;</span></Button>
          </Col>
          <Col md={4} lg={2} className="text-center">
            <img src="https://via.placeholder.com/200" alt="placeholder">

            </img>
          </Col>
          <Col md={3} lg={5} className="my-auto text-center">
            <h2>
            Band Name
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
                <SearchResult/>
                <SearchResult/>
              </div>
            </Collapse>
          </Col>
        </Row>
      </Container>
    </>
  )
}