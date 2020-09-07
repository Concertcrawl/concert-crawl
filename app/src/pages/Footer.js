import React from 'react'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export const Footer = () => {
  return (
    <>

      <Container fluid className="footer fixed-bottom d-flex justify-content-around bg-light">
        <Link to="/contact-us" className="text-dark lead">Contact Us</Link>
        <Link to="/privacy-page" className="text-dark lead">Privacy Policy</Link>
      </Container>
    </>
  )
}