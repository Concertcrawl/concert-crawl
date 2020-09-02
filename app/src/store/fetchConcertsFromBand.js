import { httpConfig } from '../utils/http-config'
import { createSlice } from '@reduxjs/toolkit'
import { fetchFavoriteBands } from './favoriteBands'

const slice = createSlice({
  name:"favoriteConcert",
  initialState: [],
  reducers:{
    getConcertsFromBands: (concerts, action) => {
      return action.payload
    }

  }
})
export const {getConcertsFromBands} = slice.actions


export const fetchConcertsFromBands = (bandId) => async(dispatch) => {
  const {data} = await httpConfig.get(`/apis/concert-bands/${bandId}`)
  dispatch(getConcertsFromBands(data))
}

export default slice.reducer