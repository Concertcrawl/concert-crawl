import React from 'react'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export const Footer = () => {
  return (
    <>

      <Container fluid className="footer fixed-bottom d-flex justify-content-around bg-light">
        <Link to="/contact-us" className="text-dark">Contact Us</Link>
        <a className="text-white" href="https://www.ticketmaster.com/">Data from Ticketmaster</a>
        <Link to="/privacy-page" className="text-dark">Privacy Policy</Link>
      </Container>
    </>
  )
}