import { httpConfig } from '../utils/http-config'
import { createSlice } from '@reduxjs/toolkit'

// Reducer to add concerts retrieved by band ID to store.

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

// Action retrieves concerts based on bandId pass to function.

export const fetchConcertsFromBands = (bandId) => async (dispatch) => {
  const {data} = await httpConfig.get(`/apis/concert-bands/${bandId}`)
  dispatch(getConcertsFromBands(data))
}

export default slice.reducer