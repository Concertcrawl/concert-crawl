import { httpConfig } from '../utils/http-config'
import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: "concertsFromBands",
  initialState: [],
  reducers: {
    getConcertsFromBands: (concerts, action) => {
      return [...concerts, ...action.payload]
    }

  }
})
export const {getConcertsFromBands} = slice.actions

export const fetchConcertsFromBands = (bandId) => async (dispatch) => {
  const {data} = await httpConfig.get(`/apis/concert-bands/${bandId}`)
  dispatch(getConcertsFromBands(data))
}

export default slice.reducer