import React from 'react'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { NavBar } from './NavBar'

export const Footer = () => {
  return (
    <>

      <Container fluid className="footer fixed-bottom border-top border-dark d-flex justify-content-around bg-light">
        <Link to="/contact-us" className="text-dark lead">Contact Us</Link>
        <Link to="/privacy-page" className="text-dark lead">Privacy Policy</Link>
      </Container>
    </>
  )
}