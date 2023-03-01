import '../../src/styles/App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// import child components
import Main from './Main'
import Quiz from './Quiz'
import Result from './Result'
import { CheckUserExit } from '../helper/helper'

//react routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
  },
  {
    path: '/quiz',
    element: (
      <CheckUserExit>
        {' '}
        <Quiz />
      </CheckUserExit>
    ),
  },
  {
    path: '/result',
    element: (
      <CheckUserExit>
        {' '}
        <Result />
      </CheckUserExit>
    ),
  },
])

function App() {
  return (
    <div className="app py-2">
      <RouterProvider router={router} />
    </div>
  )
}

export default App
