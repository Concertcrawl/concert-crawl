import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { LoginModal } from './sign-in/LoginModal'

export const NavBar = () => {
  return (
    <>
      <Navbar bg="dark" className="navbar-dark">
        <Navbar.Brand href="/">Concert Crawl</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Item><Nav.Link href="/saved-concerts">Saved Concerts</Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link href="/user-favorites">Followed Bands</Nav.Link></Nav.Item>
          </Nav>
          <Nav className="ml-auto">
            <Nav.Item><LoginModal/></Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  )
}