import { httpConfig } from '../utils/http-config'
import { createSlice } from '@reduxjs/toolkit'

// Reducer filters out duplicate bands, checks store to see if bandId and concertId match any bandId or concertId in action.

const slice = createSlice({
  name: "bandsFromConcerts",
  initialState: [],
  reducers: {
    getBandsFromConcerts: (bands, action) => {
      let noDuplicate = action.payload.filter(
        band => !bands.some(e => (band.bandId === e.bandId && band.concertId === e.concertId))
      )
      return [...bands, ...noDuplicate]
    }
  }
})

export const {getBandsFromConcerts} = slice.actions

// Action to fetch bands from concert Id

export const fetchBandsFromConcerts = (concertId) => async (dispatch) => {
  const {data} = await httpConfig.get(`/apis/bands-concert/${concertId}`)
  dispatch(getBandsFromConcerts(data))
}

export default slice.reducer