import {combineReducers} from 'redux'
import concertsSearch from './concertRedux'
import favoriteBand from './favoriteBands'
import savedConcerts from './savedConcerts'
import getAuth from './loginRedux'

export default combineReducers({concertsSearch, favoriteBand, savedConcerts, getAuth})
