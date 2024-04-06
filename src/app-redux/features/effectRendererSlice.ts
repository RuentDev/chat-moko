import { createSlice } from '@reduxjs/toolkit'

type Effect = {
  id: string
  color?: string
  modelPath?: string
  name?: string
  price?: number
  productTitle?: string
  sku?: string
  size?: string
  thumbPath?: string
}

export interface InitialState {
  selectedEffect?: Effect
  effects: Effect[]
}

const initialState = {
  selectedEffect: undefined,
  effects: []
}

export const effectRendererSlice = createSlice({
  name: 'effectRenderer',
  initialState: initialState,
  reducers: {
    setEffects: (state, action) => {
      state.effects = action.payload
    },
    setSelectedEffect: (state, action) => {
      state.selectedEffect = action.payload
    }
  },
})

export const {
  setEffects,
  setSelectedEffect
} = effectRendererSlice.actions

export default effectRendererSlice.reducer

