import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
  userId: null,
  result: [],
}

export const resultReducer = createSlice({
  name: 'result',
  initialState,
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload
    },
    pushResultAction: (state, action) => {
      state.result.push(action.payload)
    },
    updateResultAction: (state, action) => {
      const { trace, checked } = action.payload

      state.result.fill(checked, trace, trace + 1)
    },
    restartResultAction: (state) => {
      state.result = []
      state.userId = null
    },
  },
})

export const { setUserId, pushResultAction, restartResultAction, updateResultAction } =
  resultReducer.actions

export default resultReducer.reducer
