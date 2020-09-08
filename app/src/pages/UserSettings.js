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
    userFirstName: Yup.string()
      .max(30, "User Name must be less than 30 characters."),
    userPassword: Yup.string()
      .min(8, "Password must be at least 8 characters."),
    userPasswordConfirm: Yup.string()
      .min(8, "Confirmation password must be at least 8 characters."),
    userZip: Yup.number()
      .typeError("Zip code must be a number.")
      .min(5, "Your Zip Code must be at least 5 numbers."),
    currentEnteredPass: Yup.string()
      .min(8, "Password must be at least 8 characters.")
  })

  const submitUpdateName = (values, {
    resetForm, setStatus
  }) => {
    httpConfig.post("/apis/settings/updateName/", values)
      .then(reply => {
        let {message, type} = reply
        if (reply.status === 200) {
          resetForm()
        }
        setStatus({message, type})
      })
  }

  const submitUpdateZip = (values, {
    resetForm, setStatus
  }) => {
    httpConfig.post("/apis/settings/updateZip", values)
      .then(reply => {
        let {message, type} = reply
        if (reply.status === 200) {
          resetForm()
        }
        setStatus({message, type})
      })
  }

  const submitUpdatePassword = (values, {
    resetForm, setStatus
  }) => {
    if (values.userPassword === values.userPasswordConfirm) {
      httpConfig.post("/apis/settings/updatePassword", values)
        .then(reply => {
          let {message, type} = reply
          if (reply.status === 200) {
            resetForm()
          }
          setStatus({message, type})
        })
    } else {
      setStatus({message: "Passwords do not match.", type: "alert alert-danger"})
    }
  }

  const userName = {
    userName: ""
  }

  const password = {
    userPassword: "",
    userPasswordConfirm: "",
    currentEnteredPass: ""
  }

  const zip = {
    userZip: ""
  }

  return (
    <>
      {auth == null && (
        <Container className="user-settings p-0 register-user">
          <Row>
            <Col>
              <h1 className="text-center pb-2"> User Settings!</h1>
              <p className="text-center not-logged-in">You need to be logged in to change your user settings!</p>
            </Col>
          </Row>
        </Container>
      )}
      {auth !== null && (
        <Container className="user-settings p-0 register-user">
          <Row>
            <Col xs={12} className="mt-5 mb-5">
              <h2 className="text-center pb-2"> User Settings!</h2>
            </Col>
          </Row>

          <Container xs={12}>
            <Row>
              <Col className="py-3">
                <Accordion>
                  <Card className="mb-3">
                    <Card.Header className="bg-dark">
                      <Accordion.Toggle className="btn btn-light" variant="link" eventKey="0">
                        Change your First Name!
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                      <Card.Body>
                        <Formik initialValues={userName} onSubmit={submitUpdateName} validationSchema={validator}>
                          {(props) => {
                            const {
                              status,
                              values,
                              errors,
                              handleChange,
                              handleBlur,
                              handleSubmit
                            } = props
                            return (
                              <Form onSubmit={handleSubmit}>
                                <Form.Group>
                                  <Form.Label>Change First Name</Form.Label>
                                  <Form.Control name="userFirstName" value={values.userFirstName}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                type="text" placeholder="First Name"/>
                                  {errors.userFirstName && (
                                    <div className="alert-danger alert">
                                      {errors.userFirstName}
                                    </div>
                                  )}
                                  <Button className="mt-3" variant="secondary" type="submit">
                                    Submit
                                  </Button>
                                </Form.Group>
                                {status && (<div className={status.type}>{status.message}</div>)}
                              </Form>
                            )
                          }}
                        </Formik>
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
                        <Formik initialValues={zip} onSubmit={submitUpdateZip} validationSchema={validator}>
                          {(props) => {
                            const {
                              status,
                              values,
                              errors,
                              handleChange,
                              handleBlur,
                              handleSubmit
                            } = props
                            return (
                              <Form onSubmit={handleSubmit}>
                                <Form.Group>
                                  <Form.Label>Change Zip Code</Form.Label>
                                  <Form.Control
                                    type="text" placeholder="Zip Code" name="userZip" value={values.userZip}
                                    onChange={handleChange}
                                    onBlur={handleBlur}/>
                                  {errors.userZip && (
                                    <div className="alert-danger alert">
                                      {errors.userZip}
                                    </div>
                                  )}
                                  <Button className="mt-3" variant="secondary" type="submit">
                                    Submit
                                  </Button>
                                </Form.Group>
                                {status && (<div className={status.type}>{status.message}</div>)}
                              </Form>
                            )
                          }}
                        </Formik>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </Accordion>
              </Col>
              <Col className="py-3">
                <Accordion className="mb-3">
                  <Card>
                    <Card.Header className="bg-dark">
                      <Accordion.Toggle className="btn btn-light" variant="link" eventKey="0">
                        Change your Password!
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                      <Card.Body>
                        <Formik initialValues={password} onSubmit={submitUpdatePassword} validationSchema={validator}>
                          {(props) => {
                            const {
                              status,
                              values,
                              errors,
                              handleChange,
                              handleBlur,
                              handleSubmit
                            } = props
                            return (
                              <Form onSubmit={handleSubmit}>
                                <Form.Group>
                                  <Form.Label>Current Password</Form.Label>
                                  <Form.Control type="text" placeholder="Current Password"
                                                name="currentEnteredPass" value={values.currentEnteredPass}
                                                onChange={handleChange}
                                                onBlur={handleBlur}/>
                                  {errors.currentEnteredPass && (
                                    <div className="alert-danger alert">
                                      {errors.currentEnteredPass}
                                    </div>
                                  )}
                                </Form.Group>
                                <Form.Group>
                                  <Form.Label>New Password</Form.Label>
                                  <Form.Control type="text" placeholder="New Password"
                                                name="userPassword" value={values.userPassword}
                                                onChange={handleChange}
                                                onBlur={handleBlur}/>
                                  {errors.userPassword && (
                                    <div className="alert-danger alert">
                                      {errors.userPassword}
                                    </div>
                                  )}
                                </Form.Group>
                                <Form.Group>
                                  <Form.Label>Confirm Password</Form.Label>
                                  <Form.Control type="text" placeholder="Confirm Password"
                                                name="userPasswordConfirm" value={values.userPasswordConfirm}
                                                onChange={handleChange}
                                                onBlur={handleBlur}/>
                                  {errors.userPasswordConfirm && (
                                    <div className="alert-danger alert">
                                      {errors.userPasswordConfirm}
                                    </div>
                                  )}
                                  <Button className="mt-3" variant="secondary" type="submit">
                                    Submit
                                  </Button>
                                </Form.Group>

                                {status && (<div className={status.type}>{status.message}</div>)}
                              </Form>
                            )
                          }}
                        </Formik>
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