import React from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { httpConfig } from '../utils/http-config'

export const UserSettings = () => {
  console.log("Is this thing on?")
  return (
    <>

      <Container className="border border-dark p-0 my-5">
        <Row>
          <Col xs={12} className="mt-5 mb-5">
            <h2 className="text-center pb-2"> User Settings!</h2>
          </Col>
        </Row>

        <Container xs={12}>
          <Row>
            <Col className="border-right border-top border-dark py-3">
              <Form.Group>
                <Form.Label>Change First Name</Form.Label>
                <Form.Control
                  type="text" placeholder="First Name"/>
              </Form.Group>

              <Form.Group>
                <Form.Label>Change Zip Code</Form.Label>
                <Form.Control
                  type="text" placeholder="Zip Code"/>
              </Form.Group>
            </Col>
            <Col className="py-3 border-dark border-top">
              <Form.Group>
                <Form.Label>Change Password</Form.Label>
                <Form.Control type="text" placeholder="Password"/>
              </Form.Group>
              <Form.Group>
                <Form.Label>Confirm New Password</Form.Label>
                <Form.Control type="text" placeholder="Confirm New Password"/>
                <Button variant="secondary" type="submit">
                  Submit
                </Button>
              </Form.Group>
            </Col>
          </Row>
        </Container>

      </Container>
    </>
  )
}