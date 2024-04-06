import { configureStore } from '@reduxjs/toolkit'
import effectRedererReducer from './features/effectRendererSlice'

export const store = configureStore({
  reducer: {
    rendererView: effectRedererReducer
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch