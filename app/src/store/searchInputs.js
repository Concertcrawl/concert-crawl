import { createSlice } from '@reduxjs/toolkit'

// Reducer stores user inputs from search fields for infinite scroll functionality.

const slice = createSlice({
  name: "inputs",
  initialState: [1, '', '', '', '', ''],
  reducers: {
    getSearchInputs: (inputs, action) => {
      return action.payload
    },
  }
})

export const {getSearchInputs} = slice.actions

// Action to save user inputs, increments page by one, used to update infinite scroll position.

export const storeSearchInputs = (page, name, genre, location, sDate, eDate) => dispatch => {
  const data = [page, name, genre, location, sDate, eDate]
  data[0]++
  dispatch(getSearchInputs(data))
}

export default slice.reducer