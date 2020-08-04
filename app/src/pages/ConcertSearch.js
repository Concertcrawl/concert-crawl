import React from "react"
import { Form, Container, Row, Col, Button } from 'react-bootstrap'

export const SearchFunctionality = () => {
  return (
    <>
      <Container>
        <Form>
          <Form.Group>
            <Form.Label>Concert Search</Form.Label>
            <Form.Control type="text"/>
          </Form.Group>
          <Form.Group>
              <Row>
                <Col xs="3" className="ml-5">
                  <Form.Label>Genre</Form.Label>
                  <Form.Control type="text"/>
                </Col>
                <Col xs="3">
                  <Form.Label>Location</Form.Label>
                  <Form.Control type="text"/>
                </Col>
                <Col xs="2">
                  <Form.Label>Start Date</Form.Label>
                  <Form.Control type="text"/>
                </Col>
                <Col xs="1" className="pl-4">
                  <h1 className="display-3">-</h1>
                </Col>
                <Col xs="2">
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
    </>
  )
}