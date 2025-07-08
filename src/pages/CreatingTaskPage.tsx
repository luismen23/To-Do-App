import FormInput from '@/components/FormInput'
import { StepBack } from 'lucide-react'
import { Link } from 'react-router-dom'

function CreatingTaskPage() {
  return (
    <div>
      <Link to='/tasks'>
        <StepBack className='inline' /> Back
      </Link>
      <FormInput />
    </div>
  )
}

export default CreatingTaskPage
