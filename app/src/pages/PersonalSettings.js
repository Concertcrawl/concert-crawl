import React from 'react'
import { Button, Col, Container, Form, Row} from 'react-bootstrap'

export const PersonalSettings = () => {
  return(
    <>
      <Container className="border border-dark p-0">
        <Row>
          <Col xs={12} className="mt-5 mb-5">
          <h2 className="text-center pb-2">Welcome To Concert Crawl!</h2>
          </Col>
        </Row>
        <Container xs={12}>
          <Row>
            <Col>

            </Col>
            <Col className="border border-dark">
              <Form>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group controlId="formConfirmPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control type="password" placeholder="Confirm Password"></Form.Control>
                </Form.Group>
                <Button variant="secondary" type="submit">
                  Submit
                </Button>
              </Form>
            </Col>

          </Row>
        </Container>
      </Container>
      </>
  )
}