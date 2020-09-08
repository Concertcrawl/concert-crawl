import { createSlice } from '@reduxjs/toolkit'
import { httpConfig } from "../utils/http-config"

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

export const fetchSavedConcerts = () => async (dispatch) => {
  const {data} = await httpConfig.get('/apis/user-concerts/')
  dispatch(getSavedConcerts(data))
}

export default slice.reducer