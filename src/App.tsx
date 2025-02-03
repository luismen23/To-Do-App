import { SetStateAction, useState } from 'react'
import './App.css'
import { v4 as uuidv4 } from 'uuid'

uuidv4() 

interface Tasks {
  task: string
  id: string
  completed: boolean
  editing: boolean
}

function App() {

const [value, setValue] = useState<string>('')
const [tasks, setTasks] = useState<Tasks[] >([])
const [update, setUpdate] = useState<string>('')


function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
  setValue(event.target.value)
}

const addTask = (task: string) => {
  setTasks([...tasks, {task: task, id: uuidv4(), completed: false, editing: false }] )
}

const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault()
  if (value.length < 1) {
    alert('Please add a task')
    return
  } 
  addTask(value)
  setValue('')
  
}

const toggleCompleted = (id: string) => {
  setTasks(tasks.map(task => task.id === id ? {...task, completed: !task.completed} : task))
}

const deleteTask = (id: string) => {
  setTasks(tasks.filter(task => task.id !== id))
}

const editTask = (id: string) => {
  setTasks(tasks.map(task => task.id === id ? {...task, editing: !task.editing} : task))
}

const handleChangeEdit = (event: { target: { value: SetStateAction<string> } }) => {
  setUpdate(event.target.value)
}

const handleSubmitEdit = (id: string, event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault()
  if (update.length < 1) {
    alert('Add a new name to your task')
    return
  } 
  setTasks(tasks.map(task => task.id === id ? {...task, task: update, editing: !task.editing} : task))
  setUpdate('')
}



return (
      <div className='container'>
        <h1 className='title'>TO-DO APP</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" value={value} onChange={handleChange} placeholder=''/>
          <button type="submit" className='button'>add</button>  
        </form>
        <div className='todo-list'>
          {tasks.map(({task, completed, id, editing}, index) => {
            return(
              <div key={id}>

                <div className='task-input'>
                  <p className={`${completed ? 'is-completed' : ''} task-name`} onClick={() => toggleCompleted(id)}>{index + 1} - {task.charAt(0).toUpperCase() + task.slice(1)}</p>
                  <div>
                    <button className='edit' onClick={() => editTask(id)}>edit</button>
                    <button className='delete' onClick={() => deleteTask(id)}>delete</button>
                  </div>
                </div>

                <div className='task-edit'>
                  {
                    editing ? 
                    <form onSubmit={(e) => handleSubmitEdit(id, e)}>
                    <input value={update} onChange={handleChangeEdit}  />
                    <button className='save' >save</button>
                  </form> : ''
                  }
                </div>
              </div>
            )
          })}
        </div>
        
      </div>
  )
}

export default App
