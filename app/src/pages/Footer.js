import React from 'react'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export const Footer = () => {
  return (
    <>
      <Container fluid className="border-top border-dark d-flex justify-content-around bg-light">
        <Link to="/contact-us" className="text-primary lead">Contact Us</Link>
        <Link to="/privacy-page">Privacy Policy</Link>
      </Container>
    </>
  )
}