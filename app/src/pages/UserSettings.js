import React from 'react'
import { Accordion, Button, Card, Col, Container, Form, Row } from 'react-bootstrap'
import { httpConfig } from '../utils/http-config'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAuth } from '../store/loginRedux'
import * as Yup from "yup";
import { Formik } from "formik";

export const UserSettings = () => {
  const dispatch = useDispatch()

  const auth = useSelector(store => {
    return store.auth
  })

  const sideEffects = () => {
    dispatch(fetchAuth())
  }

  React.useEffect(sideEffects, [])

  const validator = Yup.object().shape({
    userFirstName:Yup.string()
      .optional
      .max(30, "User Name must be less than 30 characters."),
    userPassword:Yup.string()
      .optional
      .min(8, "Password must be at least 8 characters."),
    userZip:Yup.string()
      .isNumeric
      .min(5, "Your Zip Code must be at least 5 numbers.")
      .max(5, "Your Zip code can only be 5 numbers."),
    userPasswordConfirm:Yup.string()
      .optional
      .min(8, "Password must be at least 8 characters.")
  })

  const submitUpdateName = (values,{
    resetForm,setStatus}) => {
    httpConfig.post("/apis/settings/updateName/",values)
      .then(reply => {
        let {message, type} = reply
        if (reply.status === 200){
          resetForm()
        }
        setStatus({message,type})
      })
  }

  const submitUpdateZip = (values,{
    resetForm,setStatus}) => {
    httpConfig.post("/apis/settings/updateZip",values)
      .then(reply => {
        let {message, type} = reply
        if (reply.status === 200){
          resetForm()
        }
        setStatus({message,type})
      })
  }

  const submitUpdatePassword = (Values,{
  resetForm,setStatus}) => {
    httpConfig.post("/apis/settings/updatePassword",values)
  }
  return (
    <>
      {auth ==null && (<p>You need to be logged in to change your user settings!</p>)}
      {auth !== null &&(
        <Container className="border border-dark p-0 my-5">
          <Row>
            <Col xs={12} className="mt-5 mb-5">
              <h2 className="text-center pb-2"> User Settings!</h2>
            </Col>
          </Row>

          <Container xs={12}>
            <Row>
              <Col className="border-right border-top border-dark py-3">
                <Accordion>
                  <Card className="mb-3">
                    <Card.Header className="bg-dark">
                      <Accordion.Toggle className="btn btn-light" variant="link" eventKey="0">
                        Change your First Name!
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                      <Card.Body>
                        <Form.Group>
                          <Form.Label>Change First Name</Form.Label>
                          <Form.Control
                            type="text" placeholder="First Name"/>
                        </Form.Group>
                        <Button className="mt-3" variant="secondary" type="submit">
                          Submit
                        </Button>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                  <Card>
                    <Card.Header className="bg-dark">
                      <Accordion.Toggle className="btn btn-light" variant="link" eventKey="1">
                        Change your Zip Code!
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="1">
                      <Card.Body>
                        <Form.Group>
                          <Form.Label>Change Zip Code</Form.Label>
                          <Form.Control
                            type="text" placeholder="Zip Code"/>
                        </Form.Group>
                        <Button className="mt-3" variant="secondary" type="submit">
                          Submit
                        </Button>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </Accordion>
              </Col>
              <Col className="py-3 border-dark border-top">
                <Accordion className="mb-3">
                  <Card>
                    <Card.Header className="bg-dark">
                      <Accordion.Toggle className="btn btn-light" variant="link" eventKey="0">
                        Change your Password!
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                      <Card.Body>
                        <Form.Group>
                          <Form.Label>Change Password</Form.Label>
                          <Form.Control type="text" placeholder="Password"/>
                        </Form.Group>
                        <Form.Group>
                          <Form.Label>Confirm New Password</Form.Label>
                          <Form.Control type="text" placeholder="Confirm New Password"/>
                        </Form.Group>
                        <Button className="mt-3" variant="secondary" type="submit">
                          Submit
                        </Button>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </Accordion>
              </Col>
            </Row>
          </Container>

        </Container>
      )
      }
    </>
  )
}