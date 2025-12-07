import { configureStore } from '@reduxjs/toolkit'
import { pasteSlice } from '../features/Pastes/pastesSlice'

export const store = configureStore({
  reducer: {
    paste: pasteSlice.reducer,
  },
})