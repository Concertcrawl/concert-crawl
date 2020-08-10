import React from 'react'
import { Container, Row, Col, Button} from 'react-bootstrap'
import { ConcertInfoModal } from './ConcertInfoModal'

export const SearchResult = () => {
  const modalRef = React.useRef();

  const openModal = () => {
    modalRef.current.openModal()
  }

  return (

    <>
      <ConcertInfoModal ref={modalRef}/>
      <Container fluid className="pb-3 mt-3">
        <Row className="border-top border-bottom border-dark">
          <Col md={1} className="d-none d-lg-flex">
          </Col>
          <Col md={2} className="d-none d-md-flex">
            <img src="https://via.placeholder.com/200" className="float-right  img-fluid" alt="This is a placeholder.">
            </img>
          </Col>
          <Col xs={12} sm={3} md={2} className="my-auto text-center">
            <p className="lead">Date</p>
            <p className="lead">Start Time</p>
          </Col>
          <Col xs={12} sm={6} md={2} className="my-auto">
            <h2 className="text-center">Concert Name <Button variant="outline-dark" className="border-0 p-0" onClick={openModal}><h2>&#65291;</h2></Button></h2>
          </Col>
          <Col xs={12} sm={3} md={4} lg={2} className="my-auto text-center">
            <p className="lead">Headliner <Button variant="outline-dark" className="border-0 p-0"><h2><span role="img" aria-label="Star">&#11088;</span></h2></Button></p>
            <p className="lead">Concert Location</p>
          </Col>
          <Col md={2} className="d-none d-md-flex">
            <img src="https://via.placeholder.com/200" alt="This is a placeholder." className="img-fluid">
            </img>
          </Col>
          <Col md={1} className = "d-none d-lg-flex">
          </Col>
        </Row>
      </Container>
    </>
  )
}