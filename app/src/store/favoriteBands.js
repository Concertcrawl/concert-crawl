import { createSlice } from '@reduxjs/toolkit'
import { httpConfig } from '../utils/http-config'

// Reducer to set state of favorite band in order to determine if bands are a favorite or not.

const slice = createSlice({
  name: "favorite",
  initialState: [],
  reducers: {
    getFavoriteBands: (bands, action) => {
      if (action.payload != null) {
        action.payload.forEach(e => e['bandState'] = 'star-favorite')
      }
      return action.payload
    },
  }
})

export const {getFavoriteBands} = slice.actions

// Action to get user favorite bands based on their user ID.

export const fetchFavoriteBands = () => async (dispatch) => {
  const {data} = await httpConfig.get('/apis/user-bands/')
  dispatch(getFavoriteBands(data))
}

export default slice.reducer