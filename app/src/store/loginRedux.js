import { createSlice } from '@reduxjs/toolkit'
import * as jwtDecode from 'jwt-decode'

// Reducer to add auth information to store from JSX token.

const slice = createSlice({
  name: "auth",
  initialState: [],
  reducers: {
    getAuth: (login, action) => {
      return action.payload
    }

  }
})

export const {getAuth} = slice.actions

// Action fetches JSX token from header, checks if auth already exists first.

export const fetchAuth = () => async (dispatch, getState) => {
  const state = getState()

  if (state.auth !== []) {
    const token = window.localStorage.getItem("authorization")
    let decodedToken = token ? jwtDecode(token) : null
    if (decodedToken?.exp < Math.round(new Date() / 1000)) {
      decodedToken = null
    }
    dispatch(getAuth(decodedToken))
  }
}

export default slice.reducer