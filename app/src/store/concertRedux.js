import { createSlice } from '@reduxjs/toolkit'
import {httpConfig} from "../utils/http-config"

const slice = createSlice({
  name : "search",
  initialState: [],
  reducers: {
    getSearchResults : (concerts, action) => {
      return action.payload
    }
  }
})

export const {getSearchResults} = slice.actions;

export const fetchResults = () => async(dispatch) => {
  const {data} = await httpConfig.get('/apis/search/name=justin&genre=&location=&sDate=&eDate=&venue=')
  console.log(data)
  dispatch(getSearchResults(data))
}

export default slice.reducer
