import { combineReducers, configureStore } from '@reduxjs/toolkit'
import questionReducer from './question/reducer'
import resultReducer from './result/reducer'

const rootReducer = combineReducers({
  questions: questionReducer,
  results: resultReducer,
})

//create store with reducer
export default configureStore({ reducer: rootReducer })
