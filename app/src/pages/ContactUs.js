import React from 'react'
import { Container, Row, Col, Image } from 'react-bootstrap'

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
    </>
  )
}
