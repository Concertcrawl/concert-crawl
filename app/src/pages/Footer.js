import React from 'react'
import { Container } from 'react-bootstrap'

export const Footer = () => {
  return (
    <>
      <Container fluid className="border-top border-dark d-flex justify-content-around bg-light">
        <a href="/" className="text-primary lead">Contact Us</a>
        <a href="/" className="text-primary lead">Privacy Policy</a>
      </Container>
    </>
  )
}