import { createSlice} from '@reduxjs/toolkit'

const slice = createSlice({
  name:"inputs",
  initialState: [1, '', '', 35.19722, -106.685095, '', ''],
  reducers:{
    getSearchInputs: (inputs, action) => {
      return action.payload
    },
  }
})

export const {getSearchInputs} = slice.actions

export const storeSearchInputs = (page, name, genre, lat,  long, sDate, eDate) => dispatch => {
  const data = [page, name, genre, lat, long, sDate, eDate]
  data[0]++
  dispatch(getSearchInputs(data))
}

export default slice.reducer