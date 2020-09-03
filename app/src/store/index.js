import {combineReducers} from 'redux'
import concertsSearch from './concertRedux'
import favoriteBand from './favoriteBands'
import savedConcerts from './savedConcerts'
import concertsFromBand from './concertsFromBand'
import auth from './loginRedux'

export default combineReducers({concertsSearch, favoriteBand, savedConcerts, concertsFromBand, auth})
