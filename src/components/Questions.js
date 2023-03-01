import React, { useEffect, useState } from 'react'
import unknowImage from '../image/unknow.png'

//import custom hook
import { useFetchQuestion } from '../hooks/fetchQuestion'

import { useDispatch, useSelector } from 'react-redux'
// import { updateResultAction } from '../redux/result/reducer'
import { updateResult } from '../hooks/setResult'
import { Link } from 'react-router-dom'

const Questions = ({ setRadioSelect }) => {
  //store
  const questions = useSelector((state) => state.questions.queue[state.questions.trace])
  const { trace } = useSelector((state) => state.questions)

  const { result } = useSelector((state) => state.results)

  const dispatch = useDispatch()

  //custom hook
  const [{ isLoading, serverError }] = useFetchQuestion()

  //state
  const [checked, setChecked] = useState(undefined)
  const [loading, setLoading] = useState(isLoading)

  useEffect(() => {
    dispatch(updateResult({ trace, checked }))
  }, [checked])

  useEffect(() => {
    if (questions?.questions?.length > 0) {
      setLoading(false)
    }
  }, [questions])

  const onChangeValue = (event) => {
    setRadioSelect(event)
    setChecked(event)
    dispatch(updateResult({ trace, checked }))
  }

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <div className="spinner-border spinner-border-sm ms-1" role="status">
          <span className="visually-hidden fs-1">Loading...</span>
        </div>
      </div>
    )
  }

  if (serverError) {
    return (
      <div>
        <div className="d-flex justify-content-center">
          <img src={unknowImage} style={{ width: '250px', height: '200px' }} alt="" />
        </div>
        <h4 className="text-danger text-center">Error! Server Down</h4>
        <div className="d-flex justify-content-center">
          <Link className="btn btn-outline-primary my-2 px-4" to={'/'}>
            Finish
          </Link>
        </div>
      </div>
    )
  }
  return (
    <div className="container-fluid">
      <div>
        <h4 className="text-left">{questions?.question} : </h4>
      </div>
      <ul
        key={questions?.id}
        className="list-group border-bottom border-warning mb-2 questions-table"
      >
        {questions?.options.map((option, ind) => (
          <li className="list-group-item" key={ind}>
            <input
              className="form-check-input me-1"
              id={option}
              type="radio"
              value={false}
              name="options"
              onChange={() => onChangeValue(ind)}
              checked={result[trace] === ind}
            />
            <label className="w-75" htmlFor={option}>
              {option}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Questions
