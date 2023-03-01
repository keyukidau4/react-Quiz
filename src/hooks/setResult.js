import { useEffect, useState } from 'react'
import { postServerData } from '../helper/helper'

import * as Action from '../redux/result/reducer'

export const PushAnswer = (result) => async (dispatch) => {
  try {
    await dispatch(Action.pushResultAction(result))
  } catch (error) {
    console.log('Error: ', error)
  }
}

export const resetAnswer = () => async (dispatch) => {
  try {
    await dispatch(Action.restartResultAction())
  } catch (error) {
    console.log('Error: ', error)
  }
}

export const updateResult = (index) => async (dispatch) => {
  try {
    dispatch(Action.updateResultAction(index))
  } catch (error) {}
}

//pót user data to db
export const usePublishResult = (resultData) => {
  const { result, userName } = resultData
  const postToDatabase = async () => {
    try {
      if (result !== [] && !userName) throw new Error('Request Failed!')

      await postServerData(
        `${process.env.REACT_APP_API_HOSTNAME}/api/results`,
        resultData,
        (data) => data
      )
    } catch (error) {
      console.log({ error })
    }
  }
  postToDatabase()
}
