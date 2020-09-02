import { createSlice} from '@reduxjs/toolkit'
import { getToken } from '../utils/JwtHelpers'

const slice = createSlice({
  name:"login",
  initialState: [],
  reducers:{
    getAuth: (login, action) => {
      return action.payload
    }

  }
})

export const {getAuth} = slice.actions

export const fetchAuth = () => async(dispatch) => {
  const auth = getToken()
  dispatch(getAuth(auth))
}

export default slice.reducer