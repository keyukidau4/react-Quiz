import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
  queue: [],
  answers: [],
  trace: 0,
}

export const questionReducer = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    startExamAction: (state, action) => {
      let { questions, answers } = action.payload
      return {
        ...state,
        queue: questions,
        answers,
      }
    },
    plusTrace: (state) => {
      return {
        ...state,
        trace: state.trace + 1,
      }
    },
    minusTrace: (state) => {
      return {
        ...state,
        trace: state.trace - 1,
      }
    },
    resetAllState: (state) => {
      return {
        queue: [],
        answers: [],
        trace: 0,
      }
    },
  },
})

export const { startExamAction, plusTrace, minusTrace, resetAllState } = questionReducer.actions

export default questionReducer.reducer
