import React, { useEffect, useLayoutEffect, useState } from 'react'
import '../styles/quiz.css'
import Questions from './Questions'

//import from custom hook
import { MoveNextQuestion, MovePrevQuestion, useFetchQuestion } from '../hooks/fetchQuestion'
import { PushAnswer } from '../hooks/setResult'

//redux
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Quiz = () => {
  //store
  const { queue, trace } = useSelector((state) => state.questions)
  const { result } = useSelector((state) => state.results)
  const questions = useSelector((state) => state.questions.queue[state.questions.trace])

  //state
  const [isMax, setIsMax] = useState(false)
  const [isMin, setIsMin] = useState(true)
  const [radioSelect, setRadioSelect] = useState('')

  const dispatch = useDispatch()

  useLayoutEffect(() => {
    setIsMax(false)
    setIsMin(true)

    if (trace === queue?.length - 1) {
      setIsMax(true)
    }

    if (trace === 0) {
      setIsMin(false)
    }
  }, [queue, trace])

  const [{ serverError }] = useFetchQuestion()

  const onNext = () => {
    //insert a new result
    dispatch(MoveNextQuestion())
    if (trace <= queue.length && result[questions?.id - 1] === undefined) {
      dispatch(PushAnswer(radioSelect))
    }
    setRadioSelect('')
  }

  const onPrevious = () => {
    dispatch(MovePrevQuestion())
    if (trace <= queue.length && radioSelect) {
      dispatch(PushAnswer(radioSelect))
    }
    setRadioSelect(undefined)
  }

  const finishAnswer = () => {
    if (trace <= queue.length && result[questions?.id - 1] === undefined) {
      dispatch(PushAnswer(radioSelect))
    }
  }
  return (
    <div className="container">
      <h1 className="p-3 border border-3 border-success text-center my-5">Quiz Application</h1>

      <div className="border border-2 border-primary my-5 p-2">
        <Questions setRadioSelect={setRadioSelect} />
      </div>

      <ul className="pagination d-flex justify-content-between">
        {isMin ? (
          <li className="page-item">
            <button className="page-link pagi px-4" href="#" onClick={onPrevious}>
              Previous
            </button>
          </li>
        ) : (
          <div></div>
        )}

        {!isMax && !serverError && (
          <li className="page-item">
            <button className="page-link pagi px-4" href="#" onClick={onNext}>
              Next
            </button>
          </li>
        )}
      </ul>

      {isMax && (
        <div className="d-flex justify-content-center">
          <Link className="btn btn-outline-primary my-2 px-4" onClick={finishAnswer} to={'/result'}>
            Finish
          </Link>
        </div>
      )}
    </div>
  )
}

export default Quiz
