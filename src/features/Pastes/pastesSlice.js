import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'

const initialState = {
  value: JSON.parse(localStorage.getItem('paste')) || [],
}

export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    addToPaste: (state, action) => {
        const pasteObject = action.payload
        state.value = Array.isArray(state.value) ? [...state.value, pasteObject] : [pasteObject]
        localStorage.setItem('paste', JSON.stringify(state.value))
        toast.success('Paste added successfully')
    },
    updateToPaste: (state, action) => {
        const { Id, ...updatedPaste } = action.payload
        if (Array.isArray(state.value)) {
            const index = state.value.findIndex(item => item.Id === Id)
            if (index !== -1) {
          state.value[index] = { Id, ...updatedPaste }
          localStorage.setItem('paste', JSON.stringify(state.value))
          toast.success('Paste updated successfully')
            }
        }
    },
    removeFromPaste: (state, action) => {
        const Id = action.payload
        if (Array.isArray(state.value)) {
            state.value = state.value.filter(item => item.Id !== Id)
            localStorage.setItem('paste', JSON.stringify(state.value))
            toast.success('Paste removed successfully')
        }
    },
  },
})

// Action creators are generated for each case reducer function
export const { addToPaste, updateToPaste, removeFromPaste } = pasteSlice.actions

export default pasteSlice.reducer