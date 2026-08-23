import { createSlice } from '@reduxjs/toolkit'

function loadUser() {
  try {
    const raw = localStorage.getItem('user')
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: loadUser() },
  reducers: {
    setUser(state, action) {
      state.user = action.payload
      localStorage.setItem('user', JSON.stringify(action.payload))
    },
    logout(state) {
      state.user = null
      localStorage.removeItem('user')
    },
  },
})

export const { setUser, logout } = authSlice.actions
export default authSlice.reducer

export const selectUser = (state) => state.auth.user
