import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import '../styles/result.css'
import ResultTable from './ResultTable'

// custom hook
import { resetAnswer, usePublishResult } from '../hooks/setResult'
import { ResetAllState } from '../hooks/fetchQuestion'
import { attempsNumber, earnPointsNumber, flagResult } from '../helper/helper'

const Result = () => {
  const point = 10
  const {
    questions: { queue, answers },
    results: { result, userId },
  } = useSelector((state) => state)

  const totalPoints = queue.length * point
  const attempts = attempsNumber(result)
  const earnPoints = earnPointsNumber(result, answers, point)
  const flag = flagResult(totalPoints, earnPoints)

  usePublishResult({
    result,
    userName: userId,
    attempts,
    points: earnPoints,
    achived: flag ? "Passed!" : "Not Pass!",
  })

  const dispatch = useDispatch()

  const onRestart = () => {
    dispatch(resetAnswer())
    dispatch(ResetAllState())
  }

  return (
    <div className="container">
      <h3 className="text-center my-5">Simple Question 1 </h3>

      <div className="border border-1 mx-5 p-sm-5 p-2 result-table my-3">
        <div className="d-flex justify-content-between my-1">
          <span>UserName : </span>
          <span>{userId}</span>
        </div>
        <div className="d-flex justify-content-between my-1">
          <span>Total Quiz Point : </span>
          <span className="fw-bolder">{totalPoints}</span>
        </div>
        <div className="d-flex justify-content-between my-1">
          <span>Total Questions : </span>
          <span>Daily Tuition</span>
        </div>
        <div className="d-flex justify-content-between my-1">
          <span>Total Attemps : </span>
          <span className="fw-bolder">{attempts}</span>
        </div>
        <div className="d-flex justify-content-between my-1">
          <span>Total Earn Points : </span>
          <span className="fw-bolder">{earnPoints}</span>
        </div>
        <div className="d-flex justify-content-between my-1">
          <span>Quiz Result : </span>
          <span className={flag ? 'text-success' : 'text-danger'}>{flag?"Passed!":"Not Pass!"}</span>
        </div>
      </div>

      <div className="d-flex justify-content-center my-4">
        <Link className="btn btn-outline-info" onClick={onRestart} to={'/'}>
          Restart
        </Link>
      </div>

      <div className="border border-1">
        <ResultTable />
      </div>
    </div>
  )
}

export default Result
