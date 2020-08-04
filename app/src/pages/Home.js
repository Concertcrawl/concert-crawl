import React from "react"
import { Jumbotron } from 'react-bootstrap'
import { NavBar } from './NavBar'
import { SearchFunctionality } from './ConcertSearch'

export const Home = () => {
  return (
    <>
      <NavBar/>
      <Jumbotron fluid>
        <h1>This is a test of the ConcertCrawl broadcasting system.</h1>
        <p>Let us test you.</p>
      </Jumbotron>
      <SearchFunctionality/>
    </>
  )
}