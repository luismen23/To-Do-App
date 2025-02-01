import { SetStateAction, useState } from 'react'
import './App.css'
import { v4 as uuidv4 } from 'uuid'

uuidv4() 

interface Tasks {
  task: string
  id: number
  completed: boolean
  editing: boolean
}

function App() {

const [value, setValue] = useState<string>('')
const [tasks, setTasks] = useState<Tasks[] >([])
const [update, setUpdate] = useState<string>('')


function handleChange(event: { target: { value: SetStateAction<string> } }) {
  setValue(event.target.value)
}

const addTask = (task: string) => {
  setTasks([...tasks, {task: task, id: uuidv4(), completed: false, editing: false }] )
}

const handleSubmit = (event: { preventDefault: () => void }) => {
  event.preventDefault()
  addTask(value)
  setValue('')
  
}

const toggleCompleted = (id: number) => {
  setTasks(tasks.map(task => task.id === id ? {...task, completed: !task.completed} : task))
}

const deleteTask = (id: number) => {
  setTasks(tasks.filter(task => task.id !== id))
}

const editTask = (id: number) => {
  setTasks(tasks.map(task => task.id === id ? {...task, editing: !task.editing} : task))
}

const handleChangeEdit = (event: { target: { value: SetStateAction<string> } }) => {
  setUpdate(event.target.value)
}

const handleSubmitEdit = (id: number, e: { preventDefault: () => void }) => {
  e.preventDefault()
  setTasks(tasks.map(task => task.id === id ? {...task, task: update, editing: !task.editing} : task))
  setUpdate('')
}



return (
      <div className='container'>
        <h1 className='title'>To do App</h1>
        <form onSubmit={handleSubmit}>
          <input className='add-task' type="text" value={value} onChange={handleChange}/>
          <button type="submit">add</button>  
        </form>
        <div className='todo-list'>
          {tasks.map(({task, completed, id, editing}) => {
            return(
              <div key={id} className='task'>
                <p className={`${completed ? 'is-completed' : ''}`} onClick={() => toggleCompleted(id)}>{task}</p>
                <button className='edit' onClick={() => editTask(id)}>edit</button>
                <button className='delete' onClick={() => deleteTask(id)}>delete</button>
                {
                editing ? 
                <form onSubmit={(e) => handleSubmitEdit(id, e)}>
                  <input value={update} onChange={handleChangeEdit}  />
                </form> : ''}
              </div>
            )
          })}
        </div>
        
      </div>
  )
}

export default App
