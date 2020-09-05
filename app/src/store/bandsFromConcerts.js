import { httpConfig } from '../utils/http-config'
import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name:"bandsFromConcerts",
  initialState: [],
  reducers:{
    getBandsFromConcerts: (bands, action) => {
      return [...bands, ...action.payload]
    }

  }
})
export const {getBandsFromConcerts} = slice.actions


export const fetchBandsFromConcerts = (concertId) => async(dispatch) => {
  const {data} = await httpConfig.get(`/apis/concert-bands/${concertId}`)
  dispatch(getBandsFromConcerts(data))
}

export default slice.reducer