import React from 'react'
import { Container, Row, Col, Image, Form, Button } from 'react-bootstrap'

export const ContactUs = () => {
  return (
    <>
      <Container className = "pt-5">
        <Row className="border border-dark">
          <Col xs={12} className = "py-2">
            <h1 className="text-center border-bottom border-dark"> About the Concert Crawl Team </h1>
          </Col>
          <Col xs={2} className="py-2 pt-3">
            <Image src="https://via.placeholder.com/150" roundedCircle alt="placeholder"/>
          </Col>
          <Col xs={10} className="py-2 pt-3">
            <p> Calvin Reed: </p>
          </Col>
          <Col xs={2} className="border-top border-dark py-2 pt-3">
            <Image src="https://via.placeholder.com/150" roundedCircle alt="placeholder"/>
          </Col>
          <Col xs={10} className="border-top border-dark py-2 pt-3">
            <p>Dixie Cooper: </p>
          </Col>
          <Col xs={2} className="border-top border-dark py-2 pt-3">
            <Image src="https://via.placeholder.com/150" roundedCircle alt="placeholder"/>
          </Col>
          <Col xs={10} className="border-top border-dark py-2 pt-3">
            <p> Jordan Hicks: </p>
          </Col>
        </Row>
      </Container>


      <Container xs={5}>
        <Row>
          <Col className="border border-dark mt-5 mb-5 p-5" md={{ span: 6, offset: 3 }}>
            <h1 className="text-center"> Contact Us </h1>
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


