import { createSlice} from '@reduxjs/toolkit'
import { httpConfig } from '../utils/http-config'

const slice = createSlice({
  name:"favorite",
  initialState: [],
  reducers:{
    getFavoriteBands: (bands, action) => {
      return action.payload
    }

  }
})

export const {getFavoriteBands} = slice.actions

export const fetchFavoriteBands = () => async(dispatch) => {
  const {data} = await httpConfig.get('/apis/user-bands/')
  dispatch(getFavoriteBands(data))
}

export default slice.reducer