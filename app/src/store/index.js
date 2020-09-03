import {combineReducers} from 'redux'
import concertsSearch from './concertRedux'
import favoriteBand from './favoriteBands'
import savedConcerts from './savedConcerts'
import fetchConcertsFromBand from './fetchConcertsFromBand'
import auth from './loginRedux'

export default combineReducers({concertsSearch, favoriteBand, savedConcerts, fetchConcertsFromBand, auth})
