import { createSlice } from '@reduxjs/toolkit'

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

export const storeSearchInputs = (page, name, genre, location, sDate, eDate) => dispatch => {
  const data = [page, name, genre, location, sDate, eDate]
  data[0]++
  dispatch(getSearchInputs(data))
}

export default slice.reducer