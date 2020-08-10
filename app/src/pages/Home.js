import React from "react"
import { Button, Col, Container, Form, Jumbotron, Row } from 'react-bootstrap'
import { SearchResult } from './SearchResult'

export const Home = () => {
  return (
    <>
      <Container fluid className="bg-light p-0">
        <Jumbotron fluid>
          <h1 className="text-center">Concert Crawl Placeholder</h1>
        </Jumbotron>
        <Container fluid className="bg-light py-3">
          <h2 className="text-center">About ConcertCrawl</h2>
          <p>
            Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to
            corporate strategy foster collaborative thinking to further the overall value proposition. Organically grow
            the holistic world view of disruptive innovation via workplace diversity and empowerment.

            Bring to the table win-win survival strategies to ensure proactive domination. At the end of the day, going
            forward, a new normal that has evolved from generation X is on the runway heading towards a streamlined
            cloud solution. User generated content in real-time will have multiple touchpoints for offshoring.

            Capitalize on low hanging fruit to identify a ballpark value added activity to beta test. Override the
            digital divide with additional clickthroughs from DevOps. Nanotechnology immersion along the information
            highway will close the loop on focusing solely on the bottom line.
          </p>
        </Container>
        <Container fluid className="bg-dark py-3">
          <Container className="mb-3 text-light">
            <Form>
              <Form.Group>
                <Form.Label className="mx-auto"><h2>Concert Search</h2></Form.Label>
                <Form.Control type="text"/>
              </Form.Group>
              <Form.Group>
                <Row>
                  <Col xs={6} md={3} className="ml-md-5">
                    <Form.Label>Genre</Form.Label>
                    <Form.Control type="text"/>
                  </Col>
                  <Col xs={6} md={3}>
                    <Form.Label>Location</Form.Label>
                    <Form.Control type="text"/>
                  </Col>
                  <Col xs={5} md={2} className="ml-3 ml-md-0">
                    <Form.Label>Start Date</Form.Label>
                    <Form.Control type="text"/>
                  </Col>
                  <h1 className="display-3">-</h1>
                  <Col xs={5} md={2}>
                    <Form.Label>End Date</Form.Label>
                    <Form.Control type="text"/>
                  </Col>
                </Row>
              </Form.Group>
              <Button variant="primary" size="lg" block>
                Search!
              </Button>
            </Form>
          </Container>
        </Container>
        <SearchResult/>
        <SearchResult/>
        <SearchResult/>
        <SearchResult/>
      </Container>
    </>
  )
}