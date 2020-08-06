import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';

export const NavBar = () => {
  return (
    <>
      <Navbar bg="dark" className="navbar-dark">
        <Navbar.Brand href="/">Concert Crawl</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Item><Nav.Link to="/">Saved Concerts</Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link to="/about">Followed Bands</Nav.Link></Nav.Item>
          </Nav>
          <Nav className="ml-auto">
            <Nav.Item><Nav.Link to="/about">Log In</Nav.Link></Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  )
}