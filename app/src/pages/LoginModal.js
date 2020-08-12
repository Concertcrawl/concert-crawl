import React from 'react'
import { Modal, Row, Col, Button, Form } from 'react-bootstrap'


export const LoginModal = () => {


  return (
    <>
      <Modal
      show={true}
      data-backdrop={false}
      className="test-class">
        <Form className="form-sizing">
          <Form.Group as={Row} controlId="formEmail">
            <Form.Label column sm="3">
              Email
            </Form.Label>
            <Col sm="9">
              <Form.Control type="email" placeholder="Email" />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formPassword">
            <Form.Label column sm="3">
              Password
            </Form.Label>
            <Col sm="9">
              <Form.Control type="password" placeholder="Password" />
              <a href="/" className="mx-auto">Forgot Password?</a>
            </Col>
          </Form.Group>
          <Row>
            <Col sm="4">
              <h4>
              New to Concert Crawl?
              </h4>
            </Col>
            <Col sm="8">
              <a href="/register"><h4>Click here!</h4></a>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>

  )
}