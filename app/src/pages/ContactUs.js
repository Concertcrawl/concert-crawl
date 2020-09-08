import React from 'react'
import { Container, Row, Col, Image } from 'react-bootstrap'

export const ContactUs = () => {
  return (
    <>
      <Container className="contact-us-body mx-auto">
        <Container className="contact-us">
          <Row className="border border-dark">
            <Col xs={12} className="px-0">
              <h1 className="text-center contact-us-header"> About the Concert Crawl Team </h1>
            </Col>
            <Col xs={4} className="py-2 pt-3 ">
              <Image src="calvin.JPG" roundedCircle alt="pic-contact-us"/>
            </Col>
            <Col xs={8} className="py-2 pt-3">
              <p> Calvin Reed: Calvin is a New Mexican born and raised Web Developer, who has a passion for live music.
                Spending much of his formative years in small venues and at house shows, he has a huge passion for live
                music, especially punk and metal. </p>
              <a href="https://github.com/Calvintreed">
                <i className="fab fa-github-square fa-2x pr-3"></i>
              </a>
              <a href="https://www.linkedin.com/in/calvin-reed-64b6391a9/">
                <i className="fab fa-linkedin fa-2x pr-3"></i>
              </a>
            </Col>
            <Col xs={4} className="py-2 pt-3">
              <Image src="dixie.JPG" roundedCircle alt="pic-contact-us"/>
            </Col>
            <Col xs={8} className="py-2 pt-3">
              <p>Dixie Cooper: Dixie is a Web Developer and educator who grew up in Albuquerque, New Mexico. Formally a
                middle school coding teacher, she is now pursuing a career in Web Development. Dixie loves going to live
                shows and her favorite band is Haim, who she has seen a total of 8 times in concert! </p>
              <a href="https://github.com/dixiecooper100">
                <i className="fab fa-github-square fa-2x pr-3"></i>
              </a>

                <a href="https://www.linkedin.com/in/dixie-cooper-19b650139/">
                  <i className="fab fa-linkedin fa-2x pr-3"></i>
                </a>

            </Col>
            <Col xs={4} className="py-2 pt-3">
              <Image src="jordan.png" roundedCircle alt="pic-contact-us"/>
            </Col>
            <Col xs={8} className="py-2 pt-3">
              <p> Jordan Hicks: </p>

              <a href="https://github.com/jhicksdesign">
                <i className="fab fa-github-square fa-2x pr-3"></i>
                <a href="https://www.linkedin.com/in/jordan-hicks-design/">
                  <i className="fab fa-linkedin fa-2x pr-3"></i>
                </a>
              </a>
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  )
}


