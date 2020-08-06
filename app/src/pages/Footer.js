import React from 'react'
import { Container } from 'react-bootstrap'
import { NavLink } from 'react-bootstrap'

export const Footer = () => {
  return (
    <>
      <Container fluid className="border-top border-dark d-flex justify-content-around bg-light">
        <NavLink to="/" className="text-primary lead">Contact Us</NavLink>
        <NavLink to="/privacy-policy">Privacy Policy</NavLink>
      </Container>
    </>
  )
}