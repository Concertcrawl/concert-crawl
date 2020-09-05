import React from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { LoginModal } from './sign-in/LoginModal'
import { fetchAuth } from '../store/loginRedux'
import { httpConfig } from '../utils/http-config'
import { useDispatch, useSelector } from 'react-redux'

export const NavBar = () => {
  const dispatch = useDispatch()
  const auth = useSelector(store => {
    return store.auth
  })
  const sideEffects = () => {
    dispatch(fetchAuth())
  };

  React.useEffect(sideEffects, [])

  const signOut = () => {
    httpConfig.get("/apis/sign-out/")
      .then(reply => {
        if (reply.status === 200) {
          window.localStorage.removeItem("authorization");
          window.location = "/";
          dispatch(fetchAuth())
        }
      });
  };

  return (
    <>
      <Navbar className="navbar">
        <Navbar.Brand href="/">Concert Crawl</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavDropdown id="basic-navbar-dropdown" title="DropDown">
              <NavDropdown.Item href="/saved-concerts">Saved Concerts</NavDropdown.Item>
              <NavDropdown.Item href="/user-favorites">Favorited Bands</NavDropdown.Item>
              <NavDropdown.Item href="/user-settings">User Settings</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          {auth !== null && (
            <Nav className="ml-auto">
              <button className="btn btn-light" onClick={signOut}>
                Sign Out&nbsp;&nbsp;
              </button>
            </Nav>
          )}
          {auth === null && (
            <Nav className="ml-auto">
              <Nav.Item><LoginModal/></Nav.Item>
            </Nav>
          )}
        </Navbar.Collapse>
      </Navbar>
    </>
  )
}