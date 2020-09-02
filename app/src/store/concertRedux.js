import { createSlice } from '@reduxjs/toolkit'
import {httpConfig} from "../utils/http-config"

const slice = createSlice({
  name : "search",
  initialState: [],
  reducers: {
    getSearchResults : (concerts, action) => {
      const {payload} = action
      console.log(payload)
      return payload.results
    }
  }
})

export const {getSearchResults} = slice.actions;

export const fetchResults = (name, genre, location, sDate, eDate) => async(dispatch) => {
  const {data} = await httpConfig.get(`/apis/search/page=1&name=${name}&genre=${genre}&location=${location}&sDate=${sDate}&eDate=${eDate}&venue=`)
  dispatch(getSearchResults(data))
}

export default slice.reducer
