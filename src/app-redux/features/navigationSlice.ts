import { createSlice } from '@reduxjs/toolkit'

export interface InitialState {
  selectedIcon: string
}

const initialState = {
  selectedIcon: "Home"
}

export const navigationSlice = createSlice({
  name: 'navigation',
  initialState: initialState,
  reducers: {
    setSelectedIcon: (state, action) => {
      state.selectedIcon = action.payload
    } 
  },
})

export const { setSelectedIcon } = navigationSlice.actions

export default navigationSlice.reducer

