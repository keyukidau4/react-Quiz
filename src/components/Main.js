import React, { useEffect, useLayoutEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { setUserId } from '../redux/result/reducer'
import '../styles/main.css'

const Main = () => {
  const dispatch = useDispatch()

  const inputRef = useRef(null)

  const startQuiz = () => {
    if (inputRef?.current.value) {
      dispatch(setUserId(inputRef?.current.value))
    } else {
      alert('Input Your Name!')
    }
  }

  return (
    <div className="container w-100 h-100">
      <div>
        <h1 className="p-3 border border-3 border-success text-center my-5">Quiz Application</h1>

        <ol className="list-group list-group-numbered my-5">
          <li className="list-group-item">Cras justo odio asdasdasdsada</li>
          <li className="list-group-item">Cras justo odio</li>
          <li className="list-group-item">Cras justo odio</li>
        </ol>

        <form action="" id="form" className="my-5">
          <input className="form-control" type="text" placeholder="UserName" ref={inputRef} />
        </form>

        <div className="start d-flex justify-content-center my-4">
          <Link className="btn btn-outline-primary my-2 px-4" onClick={startQuiz} to={'quiz'}>
            Start Quiz
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Main
