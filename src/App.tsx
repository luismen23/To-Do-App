// import Header from './components/Header'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import WelcomePage from './pages/WelcomePage'
import TasksPage from './pages/TasksPage'
import CreatingTaskPage from './pages/CreatingTaskPage'
// import LoginPage from './pages/LoginPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <WelcomePage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/tasks',
    element: <TasksPage />,
  },
  {
    path: '/createtask',
    element: <CreatingTaskPage />,
  },
])

function App() {
  return (
    <div className='w-full flex flex-col items-center font-serif'>
      {/* <Header avatar='https://github.com/shadcn.png' /> */}
      <RouterProvider router={router} />
    </div>
  )
}

export default App
