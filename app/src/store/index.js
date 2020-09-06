import {combineReducers} from 'redux'
import {searchSlice, pageSlice} from './concertRedux'
import favoriteBand from './favoriteBands'
import savedConcerts from './savedConcerts'
import concertsFromBand from './concertsFromBand'
import auth from './loginRedux'
import searchInputs from './searchInputs'
import bandsFromConcert from './bandsFromConcerts'

export default combineReducers({searchSlice, pageSlice, searchInputs, bandsFromConcert, favoriteBand, savedConcerts, concertsFromBand, auth})
