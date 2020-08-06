import React from 'react'
import { Button, Col, Container, Form, Row} from 'react-bootstrap'

export const RegisterUser = () => {
  return(
    <>
      <Container className="border border-dark p-0 my-5">
        <Row>
          <Col xs={12} className="mt-5 mb-5">
          <h2 className="text-center pb-2">Welcome To Concert Crawl!</h2>
          </Col>
        </Row>
        <Container xs={12}>
          <Row>
            <Col className="border-right border-top border-dark py-3">
              <Form>
                <Form.Group controlId="formBasicFirstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control type="text" placeholder="First Name" />
                </Form.Group>
                <Form.Group controlId="formBasicLastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control type="text" placeholder="Last Name" />
                </Form.Group>
                <Form.Group controlId="formBasicProfileName">
                  <Form.Label>Profile Name</Form.Label>
                  <Form.Control type="text" placeholder="Profile Name" />
                </Form.Group>
                <Form.Group controlId="formBasicLocation">
                  <Form.Label>Location</Form.Label>
                  <Form.Control type="text" placeholder="Location" />
                </Form.Group>
              </Form>
            </Col>
            <Col className="py-3 border-dark  border-top">
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