import { Button, Col, Form, Row } from 'react-bootstrap'
import React from 'react'
import {FormDebugger} from "../FormDebugger";


export const LogInFormContent = (props) => {
  const {
    status,
    values,
    errors,
    touched,
    dirty,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset
  } = props;
  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col sm={12}>
          <Form.Group>
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
          <Form.Group>
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
          <Form.Group>
            <Button variant="secondary" type="submit">Submit Log In</Button>
          </Form.Group>
        </Col>
      </Row>
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
      <FormDebugger {...props} />
      {status && (<div className={status.type}>{status.message}</div>)}
    </Form>
  )
}