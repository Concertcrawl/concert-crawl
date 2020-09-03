import { Button, Col, Form, Row } from 'react-bootstrap'
import React from 'react'


export const LogInFormContent = (props) => {
  const {
    status,
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
  } = props;
  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col sm={12}>
          <h2 className="px-5">Welcome to Concert Crawl!</h2>
          <Form.Group className="px-5">
            <Form.Label column sm="3">
              Email
            </Form.Label>

            <Form.Control name="userEmail"
                          type="email"
                          value={values.userEmail}
                          placeholder="Enter email"
                          onChange={handleChange}
                          onBlur={handleBlur}/>
            {
              errors.userEmail && touched.userEmail && (
                <div className="alert alert-danger">
                  {errors.userEmail}
                </div>
              )
            }
          </Form.Group>
        </Col>
        <Col sm={12}>
          <Form.Group className="px-5">
            <Form.Label column sm="3">
              Password
            </Form.Label>
            <Form.Control name="userPassword"
                          type="password"
                          value={values.userPassword}
                          placeholder="Enter Password"
                          onChange={handleChange}
                          onBlur={handleBlur}/>
            {errors.userPassword && touched.userPassword && (
              <div className="alert alert-danger">{errors.userPassword}</div>
            )}
          </Form.Group>
        </Col>
        <Col sm={12}>
          <Form.Group className="px-5">
            <Button variant="secondary" type="submit">Submit Log In</Button>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col sm="6" className="px-5">
          <h4>
            New to Concert Crawl?
          </h4>
        </Col>
        <Col sm="6">
          <a href="/register"><h4>Register here!</h4></a>
        </Col>
      </Row>
      {status && (<div className={status.type}>{status.message}</div>)}
    </Form>
  )
}