import { createSlice} from '@reduxjs/toolkit'
import * as jwtDecode from 'jwt-decode'

const slice = createSlice({
  name:"auth",
  initialState: [],
  reducers:{
    getAuth: (login, action) => {
      return action.payload
    }

  }
})

export const {getAuth} = slice.actions

export const fetchAuth = () => async(dispatch, getState) => {
  const state = getState()

  if (state.auth !== []) {
    const token = window.localStorage.getItem("authorization")
    console.log(token)
    let decodedToken = token ? jwtDecode(token) : null
    if (decodedToken?.exp < Math.round( new Date() / 1000)){
      decodedToken = null
    }
    dispatch(getAuth(decodedToken))
  }
}

export default slice.reducer