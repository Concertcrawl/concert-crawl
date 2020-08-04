import React from "react"
import { Jumbotron } from 'react-bootstrap'
import { NavBar } from './NavBar'
import { SearchFunctionality } from './ConcertSearch'

export const Home = () => {
  return (
    <>
      <NavBar/>
      <Jumbotron fluid>
        <h1 className="text-center display-2">Concert Crawl Placeholder</h1>
      </Jumbotron>
      <SearchFunctionality/>
    </>
  )
}