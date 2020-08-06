import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

export const ContactUs = () => {
  return (
    <>
      <Container>
        <Row className= "border border-dark mt-5">
          <Col xs = {12} >
            <h1 className= "text-center"> About the Concert Crawl Team </h1>
          </Col>
          <Col>
            <Row className= "border border-dark">
              <img src = "https://via.placeholder.com/150" alt = "placeholder"/>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  )
}
