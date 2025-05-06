import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Input } from './components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Avatar, AvatarFallback, AvatarImage } from './components/ui/avatar'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Delete, Edit, XIcon } from 'lucide-react'
import { Checkbox } from './components/ui/checkbox'

uuidv4()

interface Tasks {
  task: string
  id: string
  completed: boolean
  editing: boolean
}

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

function App() {
  const [tasks, setTasks] = useState<Tasks[]>([])
  // const [edit, setEdit] = useState<boolean>(false)

  const addTask = (task: string) => {
    setTasks([
      ...tasks,
      { task: task, id: uuidv4(), completed: false, editing: false },
    ])
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

  const editTask = (id: string) => {
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, editing: !task.editing } : task
      )
    )
  }

  // const handleChangeEdit = (event: {
  //   target: { value: SetStateAction<string> }
  // }) => {
  //   setUpdate(event.target.value)
  // }

  // const handleSubmitEdit = (
  //   id: string,
  //   event: React.FormEvent<HTMLFormElement>
  // ) => {
  //   event.preventDefault()
  //   if (update.length < 1) {
  //     alert('Add a new name to your task')
  //     return
  //   }
  //   setTasks(
  //     tasks.map(task =>
  //       task.id === id
  //         ? { ...task, task: update, editing: !task.editing }
  //         : task
  //     )
  //   )
  //   setUpdate('')
  // }

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      taskname: '',
    },
  })

  const form2 = useForm<z.infer<typeof formSchema2>>({
    resolver: zodResolver(formSchema2),
    defaultValues: {
      edittask: '',
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    addTask(values.taskname)
  }

  function onSubmitEdit(values: z.infer<typeof formSchema2>) {
    // Do something with the form values.
    addTask(values.edittask)
  }

  return (
    <div className='w-full flex flex-col items-center font-mono'>
      <header className='flex justify-between w-full max-w-[1000px] p-10'>
        <h1 className='text-slate-800 text-2xl font-bold'>TO-DO APP</h1>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src='https://github.com/shadcn.png' />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Log in</DropdownMenuItem>
            <DropdownMenuItem>Sign up</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-x-4 flex items-end '
        >
          <FormField
            control={form.control}
            name='taskname'
            render={({ field }) => (
              <FormItem className='relative'>
                <FormLabel>Add a new task</FormLabel>
                <FormControl>
                  <Input
                    placeholder='write here'
                    className='border-slate-600 w-72'
                    {...field}
                  />
                </FormControl>
                {/* <FormDescription>
                  This is your public display name.
                </FormDescription> */}
                <FormMessage className='absolute' />
              </FormItem>
            )}
          />
          <Button type='submit'>Add</Button>
        </form>
      </Form>

      <div className='mt-10'>
        <h2 className='text-xl font-semibold mb-5'>Your tasks</h2>
        {tasks.map(({ task, completed, id, editing }, index) => {
          return (
            <div key={id} className='w-[600px] flex flex-col mb-3'>
              <div className='flex justify-between items-center'>
                <div
                  className={` border-slate-700 border w-[80%] rounded-md p-2 flex justify-between items-center`}
                >
                  <span
                    className={`${
                      completed ? ' line-through text-red-800' : ''
                    }`}
                  >
                    <span className='font-semibold'>{index + 1}</span> -{' '}
                    {task.charAt(0).toUpperCase() + task.slice(1)}
                  </span>
                  <Checkbox onClick={() => toggleCompleted(id)} />
                </div>
                <div className='flex gap-3 justify-center'>
                  <button className='edit' onClick={() => editTask(id)}>
                    <Edit />
                  </button>
                  <button className='delete' onClick={() => deleteTask(id)}>
                    <Delete />
                  </button>
                </div>
              </div>

              {editing ? (
                <div className='bg-slate-800 absolute w-[600px] text-white rounded-md '>
                  <div>
                    <XIcon
                      className='absolute text-white top-0 right-0 mr-4 mt-4'
                      onClick={() => editTask(id)}
                    />
                  </div>
                  <div className='flex justify-center items-center h-full p-5 '>
                    <Form {...form}>
                      <form
                        onSubmit={form2.handleSubmit(onSubmitEdit)}
                        className='space-x-4 flex items-end  '
                      >
                        <FormField
                          control={form2.control}
                          name='edittask'
                          render={({ field }) => (
                            <FormItem className='relative'>
                              <FormLabel>Edit your task</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder='write here'
                                  className='border-slate-600 w-72'
                                  {...field}
                                />
                              </FormControl>

                              <FormMessage className='absolute' />
                            </FormItem>
                          )}
                        />
                        <Button type='submit'>edit</Button>
                      </form>
                    </Form>
                  </div>
                </div>
              ) : (
                <div className='hidden'></div>
              )}
              {/* <div className=''>
                {editing ? (
                  <form onSubmit={e => handleSubmitEdit(id, e)}>
                    <input value={update} onChange={handleChangeEdit} />
                    <button className=''>save</button>
                  </form>
                ) : (
                  ''
                )}
              </div> */}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default App
