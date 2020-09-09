import { combineReducers } from 'redux'
import { pageSlice, searchSlice } from './concertRedux'
import favoriteBand from './favoriteBands'
import savedConcerts from './savedConcerts'
import concertsFromBand from './concertsFromBand'
import auth from './loginRedux'
import searchInputs from './searchInputs'
import bandsFromConcert from './bandsFromConcerts'

// Combined reducers.

export default combineReducers({
  searchSlice,
  pageSlice,
  searchInputs,
  bandsFromConcert,
  favoriteBand,
  savedConcerts,
  concertsFromBand,
  auth
})
