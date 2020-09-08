import React from 'react';
import { Image, Nav, Navbar } from 'react-bootstrap';
import { LoginModal } from './sign-in/LoginModal'
import { fetchAuth } from '../store/loginRedux'
import { httpConfig } from '../utils/http-config'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSavedConcerts } from '../store/savedConcerts'
import { fetchFavoriteBands } from '../store/favoriteBands'

export const NavBar = () => {
  const dispatch = useDispatch()
  const auth = useSelector(store => {
    return store.auth
  })
  const sideEffects = () => {
    dispatch(fetchAuth())
    dispatch(fetchSavedConcerts())
    dispatch(fetchFavoriteBands())
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
      <Navbar sticky="top" className="navbar" expand="lg">
        <Navbar.Brand href="/"><Image src="ConcertCrawlLogo.png" id="nav-logo" className="img-fluid">

        </Image></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/saved-concerts">Saved Concerts</Nav.Link>
            <Nav.Link href="/user-favorites">Favorite Bands</Nav.Link>
            {auth !== null && (
              <Nav.Link href="/user-settings">User Settings</Nav.Link>
            )}
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