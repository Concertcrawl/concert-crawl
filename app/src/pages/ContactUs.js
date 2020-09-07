import React from 'react'
import { Container, Row, Col, Image, Form, Button } from 'react-bootstrap'

export const ContactUs = () => {
  return (
    <>
      <Container className="contact-us-body mx-auto">
        <Container className="contact-us">
          <Row className="border border-dark">
            <Col xs={12} className="px-0">
              <h1 className="text-center contact-us-header"> About the Concert Crawl Team </h1>
            </Col>
            <Col xs={4} className="py-2 pt-3">
              <Image src="calvin.JPG" roundedCircle alt="pic-contact-us"/>
            </Col>
            <Col xs={8} className="py-2 pt-3">
              <p> Calvin Reed: Calvin is a New Mexican born and raised Web Developer, who has a passion for live music.
                Spending much of his formative years in small venues and at house shows, he has a huge passion for live
                music, especially punk and metal. His favorite band to see live is  </p>
            </Col>
            <Col xs={4} className="py-2 pt-3">
              <Image src="dixie.JPG" roundedCircle alt="pic-contact-us"/>
            </Col>
            <Col xs={8} className="py-2 pt-3">
              <p>Dixie Cooper: Dixie is a Web Developer and educator who grew up in Albuquerque, New Mexico. Formally a
                middle school coding teacher, she is now pursuing a career in Web Development. Dixie loves going to live
                shows and her favorite band is Haim, who she has seen a total of 8 times in concert! </p>
            </Col>
            <Col xs={4} className="py-2 pt-3">
              <Image src="jordan.png" roundedCircle alt="pic-contact-us"/>
            </Col>
            <Col xs={8} className="py-2 pt-3">
              <p> Jordan Hicks: </p>
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  )
}


