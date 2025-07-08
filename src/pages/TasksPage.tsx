import { StepBack } from 'lucide-react'
import { Link } from 'react-router-dom'

function TasksPage() {
  return (
    <div>
      <div className=' flex text-center'>
        <Link to='/'>
          <StepBack className='inline' /> Back
        </Link>
        <h2>Create Task</h2>
        <Link to='/createtask'>
          <StepBack className='inline' /> Add New
        </Link>
      </div>
    </div>
  )
}

export default TasksPage
