import React from 'react'
import {Container, Row, Col, Modal} from 'react-bootstrap'
import "../styles.css";

export const ConcertInfoModal = (props) => {
  return(
  <>
    <Modal
      show={true}
      dialogClassName="custom-modal-style"
    >
      <Modal.Dialog className="border border-dark">
        <Modal.Header closeButton>
          <Modal.Title> Date - Headliner - Location @ Time</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col>
              <img src="https://via.placeholder.com/120x240?text=Vertical+Banner" alt="Placeholder" className="col-12"></img>
              </Col>
              <Col >
                <h1> Headliner @ venue</h1>
                <h2> Date & Time</h2>

              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal.Dialog>
    </Modal>



  </>
  )
}