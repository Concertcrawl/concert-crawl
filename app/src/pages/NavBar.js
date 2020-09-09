import React from 'react';
import { Image, Nav, Navbar } from 'react-bootstrap';
import { LoginModal } from './sign-in/LoginModal'
import { fetchAuth } from '../store/loginRedux'
import { httpConfig } from '../utils/http-config'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSavedConcerts } from '../store/savedConcerts'
import { fetchFavoriteBands } from '../store/favoriteBands'
import Button from 'react-bootstrap/Button'

export const NavBar = () => {

  // Declaring dispatch handler.

  const dispatch = useDispatch()

  // Declaring selector for redux store.

  const auth = useSelector(store => {
    return store.auth
  })

  // Setting up dispatch side effects.

  const sideEffects = () => {
    dispatch(fetchAuth())
    dispatch(fetchSavedConcerts())
    dispatch(fetchFavoriteBands())
  };

  // Hook for performing side effects.

  React.useEffect(sideEffects, [])

  // Does api call to sign user out, clears JSX token.

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
      <Navbar sticky="top" className="navbar" expand="md">
        <Navbar.Brand href="/"><Image src="ConcertCrawlLogo.png" id="nav-logo" aria-label="Home" alt="ConcertCrawl logo." className="img-fluid">

        </Image></Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar"/>
        <Navbar.Collapse id="main-navbar">
          <Nav className="mr-auto">
            <Nav.Link href="/saved-concerts" className="nav-color">Saved Concerts</Nav.Link>
            <Nav.Link href="/user-favorites" className="nav-color">Favorite Bands</Nav.Link>
            {auth !== null && (
              <Nav.Link href="/user-settings" className="nav-color">User Settings</Nav.Link>
            )}
          </Nav>
          {auth !== null && (
            <Nav className="ml-auto" >
              <Button variant="light" onClick={signOut}>
                Sign Out&nbsp;&nbsp;
              </Button>
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