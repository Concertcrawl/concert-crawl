import React, { useState } from "react"
import { Button, Col, Container, Form, Jumbotron, Row } from 'react-bootstrap'
import { SearchResult } from './SearchResult'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { useDispatch, useSelector } from 'react-redux'
import { fetchResults, resetSearch } from '../store/concertRedux'
import { storeSearchInputs } from '../store/searchInputs'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Fade } from "react-awesome-reveal"

export const Home = () => {

  const [morePages, setMorePages] = useState(true)

  const dispatch = useDispatch()

  const concerts = useSelector(store => {
    return store.searchSlice ? store.searchSlice : []
  })

  const pages = useSelector(store => {
    return store.pageSlice.count ? store.pageSlice : 0
  })

  const inputs = useSelector(store => {
    return store.searchInputs
  })

  const favBand = useSelector(store => {
    return store.favoriteBand ? store.favoriteBand : []
  })

  const initialState = {
    band: "",
    genre: "",
    location: "",
    sDate: "",
    eDate: ""
  }

  const [eachEntry, setEachEntry] = useState(initialState);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const {band, genre, location} = eachEntry;

  const sideEffects = () => {
    dispatch(storeSearchInputs(1, band, genre, location, eachEntry.sDate, eachEntry.eDate))
    dispatch(fetchResults(...inputs))
  };

  const handleInputChange = e => {
    setEachEntry({...eachEntry, [e.target.name]: e.target.value});
  }

  const submitSearch = () => {
    setMorePages(true)
    dispatch(resetSearch())
    dispatch(fetchResults(1, band, genre, location, eachEntry.sDate, eachEntry.eDate))
    dispatch(storeSearchInputs(1, band, genre, location, eachEntry.sDate, eachEntry.eDate))
  }

  const clearSearch = () => {
    setEachEntry({...initialState})
    setStartDate(initialState.sDate)
    setEndDate(initialState.eDate)
  }

  const updateSearch = () => {
    dispatch(storeSearchInputs(...inputs))
    dispatch(fetchResults(...inputs))
    if ((inputs[0] - 1) >= parseInt(pages.count)) {
      setMorePages(false)
    }
  }

  React.useEffect(sideEffects, [])

  return (
    <>
      <Container fluid className="header-home p-0">
        <Container fluid className="py-5">
          <Jumbotron fluid className="jumbotron-title">
            <h1 className="text-center">Concert Crawl Placeholder</h1>
            <p>
              Concert Crawl was birthed during the COVID-19 global health pandemic, in an era where almost no live                music was happening. We miss live shows and wanted to provide a service that made finding a concert                simple, fun, and organized no matter what kind of a music fan you are.
            </p>
          </Jumbotron>

        </Container>
        <Container fluid className="search-bar py-3">
          <Container className="mb-3 text-light">
            <Form>
              <Form.Group controlId='bandField'>
                <Form.Label className="mx-auto"><h2>Band Search</h2></Form.Label>
                <Form.Control
                  type="text"
                  name="band"
                  value={band}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group>
                <Row>
                  <Col xs={6} md={3} className="ml-md-5">
                    <Form.Label>Genre</Form.Label>
                    <Form.Control
                      type="text"
                      name="genre"
                      value={genre}
                      onChange={handleInputChange}
                    />
                  </Col>
                  <Col xs={6} md={3}>
                    <Form.Label>Zip</Form.Label>
                    <Form.Control
                      type="text"
                      name="location"
                      value={location}
                      onChange={handleInputChange}
                    />
                  </Col>
                  <Col xs={5} md={2} className="ml-3 ml-md-0">
                    <Form.Label>
                      Start Date
                    </Form.Label>
                    <DatePicker
                      className="form-control"
                      selected={startDate}
                      onChange={(date) => {
                        setStartDate(date);
                        if (endDate !== '' && date > endDate) {setEndDate(date);}
                        eachEntry.sDate = date?.toISOString().split('T')[0];
                      }}
                      selectsStart
                      startDate={startDate}
                      endDate={endDate}
                    />
                  </Col>
                  <h1 className="display-3">-</h1>
                  <Col xs={5} md={2}>
                    <Form.Label>
                      End Date
                    </Form.Label>
                    <DatePicker
                      className="form-control"
                      selected={endDate}
                      onChange={(date) => {
                        setEndDate(date)
                        eachEntry.eDate = date?.toISOString().split('T')[0];
                      }}
                      selectsEnd
                      startDate={startDate}
                      endDate={endDate}
                      minDate={startDate}
                    />
                  </Col>
                </Row>
              </Form.Group>
              <Row>
                <Col xs={9}>
                  <Button onClick={submitSearch} xs={9} variant="light" size="lg" block>
                    Search!
                  </Button>
                </Col>
                <Col xs={3}>
                  <Button onClick={clearSearch} variant="light" size="lg" block>
                    Clear Search!
                  </Button>
                </Col>
              </Row>
            </Form>
          </Container>
        </Container>
      </Container>
      {concerts.length === 0 && (<p className="text-center">Something went wrong! No concerts to display! :(</p>)}
      <InfiniteScroll next={updateSearch} hasMore={morePages} loader={<h4 className="text-center">Loadin'</h4>}
                      dataLength={concerts.length} endMessage={<h4>No more results</h4>}>

        <Fade triggerOnce={true}>
          {concerts.length !== 0 && (concerts.map(concert => <SearchResult concert={concert}
                                                                           favStat={(favBand.some(e => e['bandId'] === concert.bandId) === true && ("star-yellow")) || ("star-white")}
                                                                           key={concert.concertId}/>))}
        </Fade>
      </InfiniteScroll>
    </>
  )
}