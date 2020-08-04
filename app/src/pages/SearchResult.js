import React from 'react'
import { Container, Row, Col, Button} from 'react-bootstrap'

export const SearchResult = () => {
  return (
    <>
      <Container fluid className="pb-3">
        <Row className="border-top border-bottom border-dark">
          <Col md={1} className="d-none d-lg-flex">
          </Col>
          <Col md={2} className="d-none d-md-flex">
            <img src="https://via.placeholder.com/200" className="float-right  img-fluid" alt="This is a placeholder image.">
            </img>
          </Col>
          <Col xs={4} sm={2} md={2} className="my-auto text-center">
            <p className="lead">Date</p>
            <p className="lead">Start Time</p>
          </Col>
          <Col xs={6} sm={4} md={2} className="my-auto">
            <h2 className="text-center">Concert Name <Button variant="outline-dark" className="border-0 p-0"><h2>&#65291;</h2></Button></h2>
          </Col>
          <Col xs={4} sm={2} md={4} lg={2} className="my-auto text-center">
            <p className="lead">Headliner <Button variant="outline-dark" className="border-0 p-0"><h2>&#11088;</h2></Button></p>
            <p className="lead">Concert Location</p>
          </Col>
          <Col md={2} className="d-none d-md-flex">
            <img src="https://via.placeholder.com/200" alt="This is a placeholder image." className="img-fluid">
            </img>
          </Col>
          <Col md={1} className = "d-none d-lg-flex">
          </Col>
        </Row>
      </Container>
    </>
  )
}