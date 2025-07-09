import { Link } from 'react-router-dom'

function LoginPage() {
  return (
    <div className='w-screen h-svh flex flex-col justify-between items-center text-center'>
      <div></div>

      <div>
        <h1 className='text-6xl'>Welcome!</h1>
        <p>
          <Link to='tasks' className='underline'>
            Try it without sign up.
          </Link>
        </p>
      </div>

      <div className='flex gap-3 mb-10 '>
        <button className='text-xl border-t-2 border-r-2 rounded-t-md px-4 py-2 bg-[#134074]  border-[#0B2545] transition duration-100  hover:scale-105'>
          <Link to='/login'>Sign in</Link>
        </button>
        <button className='text-xl border-t-2 border-r-2 rounded-t-md px-4 py-2 bg-[#0B2545] border-[#134074] transition duration-100  hover:scale-105'>
          <Link to='/signup'>Sign up</Link>
        </button>
      </div>
    </div>
  )
}

export default LoginPage
