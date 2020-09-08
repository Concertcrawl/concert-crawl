import React from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { httpConfig } from "../utils/http-config"
import * as Yup from "yup";
import { Formik } from "formik";
import { useSelector } from 'react-redux'

export const RegisterUser = () => {

  const auth = useSelector(store => {
    return store.auth
  })

  const signUp = {
    userFirstName: '',
    userLastName: '',
    userProfileName: '',
    userZip: '',
    userEmail: '',
    userPassword: '',
    userPasswordConfirm: ''
  }

  const validator = Yup.object().shape({
    userFirstName: Yup.string()
      .required('First name is required.'),
    userLastName: Yup.string()
      .required("Last name is required."),
    userProfileName: Yup.string()
      .required("Profile name is required."),
    userZip: Yup.string()
      .required("Zip is required."),
    userEmail: Yup.string()
      .email("Email must be valid.")
      .required("Email is required."),
    userPassword: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least eight characters"),
    userPasswordConfirm: Yup.string()
      .required("Password Confirm is required")
      .min(8, "Password must be at least eight characters")
  });

  const submitSignUp = (values, {resetForm, setStatus}) => {
    if (values.userPassword === values.userPasswordConfirm) {
      httpConfig.post("/apis/sign-up/", values)
        .then(reply => {
            let {message, type} = reply;

            if (reply.status === 200) {
              resetForm();
            }
            setStatus({message, type});
          }
        );
    } else {
      setStatus({message: "Passwords do not match.", type: "alert alert-danger"})
    }
  };

  return (

    <>
      {auth === null && (
        <Formik
          initialValues={signUp}
          onSubmit={submitSignUp}
          validationSchema={validator}
        >
          {(props) => {
            const {
              status,
              values,
              errors,
              handleChange,
              handleBlur,
              handleSubmit
            } = props;
            return (
              <Container className="register-user border border-dark p-0">
                <Row>
                  <Col xs={12} className="mt-5 mb-5">
                    <h2 className="text-center pb-2">Welcome To Concert Crawl!</h2>
                  </Col>
                </Row>
                <Container xs={12}>
                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <Col className="py-3">
                        <Form.Group>
                          <Form.Label>First Name</Form.Label>
                          <Form.Control type="text" placeholder="First Name"
                                        name="userFirstName"
                                        value={values.userFirstName}
                                        onChange={handleChange}
                                        onBlur={handleBlur}/>
                          {
                            errors.userFirstName && (
                              <div className="alert alert-danger">
                                {errors.userFirstName}
                              </div>
                            )
                          }
                        </Form.Group>
                        <Form.Group>
                          <Form.Label>Last Name</Form.Label>
                          <Form.Control type="text" placeholder="Last Name" name="userLastName"
                                        value={values.userLastName}
                                        onChange={handleChange}
                                        onBlur={handleBlur}/>
                          {
                            errors.userLastName && (
                              <div className="alert alert-danger">
                                {errors.userLastName}
                              </div>
                            )
                          }
                        </Form.Group>
                        <Form.Group>
                          <Form.Label>Profile Name</Form.Label>
                          <Form.Control type="text" placeholder="Profile Name" value={values.userProfileName}
                                        name="userProfileName"
                                        onChange={handleChange}
                                        onBlur={handleBlur}/>
                          {
                            errors.userProfileName && (
                              <div className="alert alert-danger">
                                {errors.userProfileName}
                              </div>
                            )
                          }
                        </Form.Group>
                        <Form.Group controlId="formBasicLocation">
                          <Form.Label>Zip Code</Form.Label>
                          <Form.Control type="text" placeholder="Zip Code" value={values.userZip} name="userZip"
                                        onChange={handleChange}
                                        onBlur={handleBlur}/>
                          {
                            errors.userZip && (
                              <div className="alert alert-danger">
                                {errors.userZip}
                              </div>
                            )
                          }
                        </Form.Group>
                      </Col>
                      <Col className="py-3">
                        <Form.Group>
                          <Form.Label>Email address</Form.Label>
                          <Form.Control type="email" placeholder="Enter email" value={values.userEmail} name="userEmail"
                                        autoComplete="email"
                                        onChange={handleChange}
                                        onBlur={handleBlur}/>
                          {
                            errors.userEmail && (
                              <div className="alert alert-danger">
                                {errors.userEmail}
                              </div>
                            )
                          }
                        </Form.Group>
                        <Form.Group>
                          <Form.Label>Password</Form.Label>
                          <Form.Control type="password" placeholder="Password" value={values.userPassword}
                                        name="userPassword" autoComplete="new-password"
                                        onChange={handleChange}
                                        onBlur={handleBlur}/>
                          {
                            errors.userPassword && (
                              <div className="alert alert-danger">
                                {errors.userPassword}
                              </div>
                            )
                          }
                        </Form.Group>
                        <Form.Group>
                          <Form.Label>Confirm Password</Form.Label>
                          <Form.Control type="password" placeholder="Confirm Password"
                                        value={values.userPasswordConfirm} autoComplete="new-password"
                                        name="userPasswordConfirm"
                                        onChange={handleChange}
                                        onBlur={handleBlur}/>
                          {
                            errors.userPasswordConfirm && (
                              <div className="alert alert-danger">
                                {errors.userPasswordConfirm}
                              </div>
                            )
                          }
                        </Form.Group>
                        <Form.Group>
                          <Button variant="secondary" type="submit">
                            Submit
                          </Button>
                        </Form.Group>
                      </Col>
                    </Row>
                  </Form>
                  {status && (<div className={status.type}>{status.message}</div>)}
                </Container>
              </Container>
            )
          }}
        </Formik>
      )}
      {auth !== null && (
        <Container className="register-user text-center"><h1>You are already logged in.</h1></Container>)}
    </>
  )
}