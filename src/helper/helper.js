import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import axios from 'axios'

export const attempsNumber = (results) => {
  return results.filter((result) => result !== '').length
}

export const earnPointsNumber = (results, answers,point) => {
  return (
    results
      .map((result, i) => result === answers[i])
      .filter((ind) => ind)
      .map((index) => 10).length * point
  )
}

export const flagResult = (totalPoints, earnPoints) => {
  return (totalPoints * 50) / 100 < earnPoints
}

// check user auth
export const CheckUserExit = ({ children }) => {
  const auth = useSelector((state) => state.results.userId)

  return auth ? children : <Navigate to={'/'} replace={true}></Navigate>
}

//get server data
export const getServerData = async (url, callback) => {
  const response = await axios.get(url)
  const data = await response?.data
  return callback ? callback(data) : data
}
//post server data
export const postServerData = async (url, result, callback) => {
  const response = await axios.post(url, result)
  const data = await response?.data

  return callback ? callback(data) : data
}
