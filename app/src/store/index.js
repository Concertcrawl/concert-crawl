import {combineReducers} from 'redux'
import concertsSearch from './concertRedux'
import favoriteBand from './favoriteBands'
export default combineReducers({concertsSearch,favoriteBand})
