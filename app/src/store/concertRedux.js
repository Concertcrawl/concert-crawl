import { createSlice } from '@reduxjs/toolkit'
import { httpConfig } from "../utils/http-config"
import usZips from 'us-zips'

const search = createSlice({
  name: "search",
  initialState: [],
  reducers: {
    getSearchResults: (concerts, action) => {
      const {payload} = action
      if (payload != null) {
        return [...concerts, ...payload.results]
      } else {
        return null
      }
    },
    resetSearchResults: (concerts, action) => {
      return []
    }
  }
})

const pages = createSlice({

  name: "pages",
  initialState: 0,
  reducers: {
    getPageNumber: (pages, action) => {
      const {payload} = action
      if (payload != null) {
        return payload.pages[0]
      } else {
        return 0
      }
    },
  }
})

export const {getSearchResults, resetSearchResults} = search.actions;

export const {getPageNumber} = pages.actions

export const fetchResults = (page, name, genre, location, sDate, eDate) => async (dispatch, getState) => {
  let lat
  let long
  if ((location === '' || undefined) && (getState().auth !== null)) {
    lat = usZips[getState().auth.userZip]?.latitude
    long = usZips[getState().auth.userZip]?.longitude
  } else if (location.match(/^[/\d]{5}?$/)) {
    lat = usZips[location]?.latitude
    long = usZips[location]?.longitude
  } else {
    lat = 35.19722
    long = -106.685095
  }
  const {data} = await httpConfig.get(`/apis/search/page=${page}&name=${name}&genre=${genre}&lat=${lat}&long=${long}&sDate=${sDate}&eDate=${eDate}`)
  dispatch(getSearchResults(data))
  dispatch(getPageNumber(data))
}

export const resetSearch = () => dispatch => {
  dispatch(resetSearchResults())
}

export const searchSlice = search.reducer
export const pageSlice = pages.reducer
