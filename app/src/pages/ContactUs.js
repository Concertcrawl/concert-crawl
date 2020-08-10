import React from 'react'
import { Container, Row, Col, Image, Form, Button } from 'react-bootstrap'

export const ContactUs = () => {
  return (
    <>
      <Container>
        <Row className="border border-dark mt-5">
          <Col xs={12} className="p-0">
            <h1 className="text-center border-bottom border-dark m-0"> About the Concert Crawl Team </h1>
          </Col>
          <Col xs={2} className="py-2">
            <Image src="https://via.placeholder.com/150" roundedCircle alt="placeholder"/>
          </Col>
          <Col xs={10} className="py-2">
            <p> Calvin Reed: </p>
          </Col>
          <Col xs={2} className="border-top border-dark py-2">
            <Image src="https://via.placeholder.com/150" roundedCircle alt="placeholder"/>
          </Col>
          <Col xs={10} className="border-top border-dark py-2">
            <p>Dixie Cooper: </p>
          </Col>
          <Col xs={2} className="border-top border-dark py-2">
            <Image src="https://via.placeholder.com/150" roundedCircle alt="placeholder"/>
          </Col>
          <Col xs={10} className="border-top border-dark py-2">
            <p> Jordan Hicks: </p>
          </Col>
        </Row>
      </Container>


      <Container xs={5}>
        <Row>
          <Col className="border border-dark mt-5 mb-5 p-5" md={{ span: 6, offset: 3 }}>
            <Form>
              <Form.Group controlId="contactForm">
                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="name" placeholder="Enter your name" />
                </Form.Group>

                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group>
                <Form.Label>Message</Form.Label>
                <Form.Control as="textarea" rows="3" />
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  )
}


