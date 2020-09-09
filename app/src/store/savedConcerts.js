import { createSlice } from '@reduxjs/toolkit'
import { httpConfig } from "../utils/http-config"

// Reducer to store user saved concerts.
const slice = createSlice({
  name: "saved",
  initialState: [],
  reducers: {
    getSavedConcerts: (concerts, action) => {
      return action.payload
    }

  }
})

export const {getSavedConcerts} = slice.actions

// Action gets user saved concerts from api.

export const fetchSavedConcerts = () => async (dispatch) => {
  const {data} = await httpConfig.get('/apis/user-concerts/')
  dispatch(getSavedConcerts(data))
}

export default slice.reducer