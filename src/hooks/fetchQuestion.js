import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import Datas, { answers } from '../database/data'
import { getServerData } from '../helper/helper'

//redux action
import * as Action from '../redux/question/reducer'

//Custom Hook
export const useFetchQuestion = () => {
  const [getData, setGetData] = useState({ isLoading: false, apiData: [], serverError: null })

  const dispatch = useDispatch()

  useEffect(() => {
    setGetData((prev) => ({ ...prev, isLoading: true }))
    //fetch backend data
    const fetchDataFromStore = async () => {
      try {
        // let questions = await Datas
        const [{ answers, questions }] = await getServerData(
          `${process.env.REACT_APP_API_HOSTNAME}/api/questions`,
          (data) => data
        )

        if (questions.length > 0) {
          setGetData((prev) => ({ ...prev, isLoading: true }))
          setGetData((prev) => ({ ...prev, apiData: { questions, answers } }))

          //dispatch to update store
          dispatch(Action.startExamAction({ questions, answers }))
        } else {
          throw new Error('No Question Avaliable')
        }
      } catch (error) {
        setGetData((prev) => ({ ...prev, isLoading: false }))
        setGetData((prev) => ({ ...prev, serverError: error }))
      }
    }
    fetchDataFromStore()
  }, [dispatch])

  return [getData, setGetData]
}

export const MoveNextQuestion = () => async (dispatch) => {
  try {
    dispatch(Action.plusTrace())
  } catch (error) {
    console.log('error: ', error)
  }
}

export const MovePrevQuestion = () => async (dispatch) => {
  try {
    dispatch(Action.minusTrace())
  } catch (error) {
    console.log('error: ', error)
  }
}

export const ResetAllState = () => async (dispatch) => {
  try {
    dispatch(Action.resetAllState())
  } catch (error) {
    console.log('error: ', error)
  }
}
