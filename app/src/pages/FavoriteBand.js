import React, { useState } from 'react'
import { Container, Row, Col, Collapse, Button } from 'react-bootstrap'

export const FavoritedBand = (props) => {
  const {band} = props
  const [open, setOpen] = useState(false);

  return (
    <>
      {console.log(band)}
      <Container className="border border-dark px-0 mb-4">
        <Row>
          <Col md={2} className="my-auto text-center">
            <Button className="bg-transparent border-0"><span className="display-4 text-warning" role="img" aria-label="star">&#11088;</span></Button>
          </Col>
          <Col md={4} lg={2} className="text-center">
            <img src={band.bandImage} alt="A band." className="img-fluid">

            </img>
          </Col>
          <Col md={3} lg={5} className="my-auto text-center">
            <h2>
              {band.bandName}
            </h2>
          </Col>
          <Col md={3} lg={3} className="my-auto text-center">
            <Button variant="outline-dark"
                    onClick={() => setOpen(!open)}
                    aria-controls="example-collapse-text"
                    aria-expanded={open}
            >List of Concerts &#8659;</Button>

          </Col>
          <Col xs={12}>
            <Collapse in={open}>
              <div>
              </div>
            </Collapse>
          </Col>
        </Row>
      </Container>
    </>
  )
}