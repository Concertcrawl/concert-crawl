import React from 'react'
import { Container, Row, Col, Image } from 'react-bootstrap'

export const ContactUs = () => {
  return (
    <>
      <Container>
        <Row className= "border border-dark mt-5">
          <Row className = "text-center">
            <h1 className= "text-center border-bottom border-dark"> About the Concert Crawl Team </h1>
          </Row>
          <Row className= "d-flex border-bottom border-dark p-5">
            <Col xs = {2}>
              <Image src = "https://via.placeholder.com/150" roundedCircle alt = "placeholder"/>
            </Col>
              <Col xs ={10}>
                <p> Calvin Reed: </p>
              </Col>
            </Row>
            <Row className= "border-bottom border-dark p-5">
              <Col xs = {2}>
                <Image src = "https://via.placeholder.com/150" roundedCircle alt = "placeholder"/>
              </Col>
              <Col xs ={10}>
                <p>Dixie Cooper: </p>
              </Col>
            </Row>
            <Row className= "border-bottom border-dark p-5">
              <Image src = "https://via.placeholder.com/150" roundedCircle alt = "placeholder"/>
              <p> Jordan Hicks: </p>
            </Row>
        </Row>
      </Container>
    </>
  )
}
