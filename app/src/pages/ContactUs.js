import React from 'react'
import { Col, Container, Image, Row } from 'react-bootstrap'

export const ContactUs = () => {
  return (
    <>
      <Container className="contact-us-body mx-auto pt-4">
        <Container className="contact-us">
          <Row className="border border-dark">
            <Col xs={12} className="px-0">
              <h1 className="text-center contact-us-header"> About the Concert Crawl Team </h1>
            </Col>

            <Col xs={12}>
              <Image className="float-left" src="calvin.JPG" roundedCircle alt="pic-contact-us"/>
              <p> Calvin Reed: Calvin is a New Mexican born and raised Web Developer, who has a passion for live music.
                Spending much of his formative years in small venues and at house shows, he has a huge passion for live
                music, especially punk and metal. </p>
              <a href="https://github.com/Calvintreed">
                <i className="fab fa-github-square fa-2x pr-3"/>
              </a>
              <a href="https://www.linkedin.com/in/calvin-reed-64b6391a9/">
                <i className="fab fa-linkedin fa-2x pr-3"/>
              </a>
            </Col>
            <Col xs={12}>
              <Image className="float-left" src="dixie.JPG" roundedCircle alt="pic-contact-us"/>
              <p>Dixie Cooper: Dixie is a Web Developer and educator who grew up in Albuquerque, New Mexico. Formally a
                middle school coding teacher, she is now pursuing a career in Web Development. Dixie loves going to live
                shows and her favorite band is Haim, who she has seen a total of 8 times in concert! </p>
              <a href="https://github.com/dixiecooper100">
                <i className="fab fa-github-square fa-2x pr-3"/>
              </a>
              <a href="https://www.linkedin.com/in/dixie-cooper-19b650139/">
                <i className="fab fa-linkedin fa-2x pr-3"/>
              </a>

            </Col>
            <Col xs={12}>
              <Image className="float-left"  src="jordan.png" roundedCircle alt="pic-contact-us"/>
              <p> Jordan Hicks: Jordan is a full stack web developer with five years of web design experience. He was
                born and raised in Sarasota, Florida before moving to Albuquerque, New Mexico in 2019. Passionate about
                solving difficult problems, ConcertCrawl was the perfect exercise to combine his interests in music with
                programming and problem solving.</p>
              <a href="https://github.com/jhicksdesign">
                <i className="fab fa-github-square fa-2x pr-3"/>
              </a>
              <a href="https://www.linkedin.com/in/jordan-hicks-design/">
                <i className="fab fa-linkedin fa-2x pr-3"/>
              </a>
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  )
}


