import React from 'react'
import { Container, Row, Col} from 'react-bootstrap'

export const SearchResult = () => {
  return (
    <>
      <Container fluid className="pb-3">
        <Row className="border-top border-bottom border-dark">
          <Col md="1">
          </Col>
          <Col md="2">
            <img src="https://via.placeholder.com/200" className="float-right" alt="This is a placeholder image.">

            </img>
          </Col>
          <Col md="2 m-auto text-center">
            <p className="lead">Date</p>
            <p className="lead">Start Time</p>
          </Col>
          <Col md="2 m-auto">
            <h2 className="text-center">Concert Name</h2>
          </Col>
          <Col md="2 m-auto text-center">
            <p className="lead">Headliner</p>
            <p className="lead">Concert Location</p>
          </Col>
          <Col md="2">
            <img src="https://via.placeholder.com/200" alt="This is a placeholder image.">

            </img>
          </Col>
          <Col md="1">
          </Col>
        </Row>
      </Container>
    </>
  )
}