import React from 'react'
import { Container, Row, Col, Image, Form, Button } from 'react-bootstrap'

export const ContactUs = () => {
  return (
    <>
      <Container className = "contact-us">
        <Row className="border border-dark">
          <Col xs={12} className = "py-2 px-0">
            <h1 className="text-center"> About the Concert Crawl Team </h1>
          </Col>
          <Col xs={4} className="py-2 pt-3 border-top border-dark">
            <Image src="calvin.JPG" roundedCircle alt="pic-contact-us"/>
          </Col>
          <Col xs={8} className="py-2 pt-3 border-top border-dark">
            <p> Calvin Reed: Calvin is a New Mexican born and raised Web Developer, who has a passion for live music.
            Spending much of his formative years in small venues and at house shows, he has a huge passion for live
            music, especially punk and metal. </p>
          </Col>
          <Col xs={4} className="border-top border-dark py-2 pt-3">
            <Image src="dixie.JPG" roundedCircle alt="pic-contact-us"/>
          </Col>
          <Col xs={8} className="border-top border-dark py-2 pt-3">
            <p>Dixie Cooper: Dixie is a Web Developer </p>
          </Col>
          <Col xs={4} className="border-top border-dark py-2 pt-3">
            <Image src="jordan.png" roundedCircle alt="pic-contact-us"/>
          </Col>
          <Col xs={8} className="border-top border-dark py-2 pt-3">
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


