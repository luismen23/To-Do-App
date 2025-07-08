import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { v4 as uuidv4 } from 'uuid'

uuidv4()

interface Tasks {
  task: string
  id: string
  completed: boolean
  editing: boolean
}

function useInputForm() {
  const [tasks, setTasks] = useState<Tasks[]>([])
  const [currentEditingId, setCurrentEditingId] = useState<string | null>(null)

  const formSchema = z.object({
    taskname: z
      .string()
      .min(2, {
        message: 'Your task need to be a little longer',
      })
      .max(50),
  })

  const formSchema2 = z.object({
    edittask: z
      .string()
      .min(2, {
        message: 'Your task need to be a little longer',
      })
      .max(50),
  })

  const addTask = (task: string) => {
    setTasks([
      ...tasks,
      { task: task, id: uuidv4(), completed: false, editing: false },
    ])
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      taskname: '',
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    addTask(values.taskname)
    form.reset()
  }

  const toggleCompleted = (id: string) => {
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    )
  }

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const editTaskMenu = (id: string) => {
    const taskToEdit = tasks.find(task => task.id === id)
    if (taskToEdit) {
      form2.setValue('edittask', taskToEdit.task)
      setCurrentEditingId(id)
      setTasks(prev =>
        prev.map(task =>
          task.id === id
            ? { ...task, editing: !task.editing }
            : { ...task, editing: false }
        )
      )
    }
  }

  const editTask = (newTitle: string, id: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, task: newTitle, editing: false } : task
      )
    )
    setCurrentEditingId(null)
  }

  const form2 = useForm<z.infer<typeof formSchema2>>({
    resolver: zodResolver(formSchema2),
    defaultValues: {
      edittask: '',
    },
  })

  function onSubmitEdit(values: z.infer<typeof formSchema2>) {
    if (currentEditingId) {
      editTask(values.edittask, currentEditingId)
      form2.reset()
    }
  }

  return {
    form,
    onSubmit,
    addTask,
    tasks,
    form2,
    onSubmitEdit,
    toggleCompleted,
    deleteTask,
    editTaskMenu,
  }
}

export default useInputForm
