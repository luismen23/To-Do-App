import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import { Button } from './ui/button'
import { Input } from './ui/input'
import useInputForm from '@/hooks/useInputForm'
import { Delete, Edit, XIcon } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'

function FormInput() {
  const {
    form,
    onSubmit,
    tasks,
    editTaskMenu,
    toggleCompleted,
    deleteTask,
    form2,
    onSubmitEdit,
  } = useInputForm()

  return (
    <div className=' flex flex-col justify-center h-svh'>
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

      <div className='mt-20 flex flex-col bg-[#13315C] w-svw h-full rounded-tl-3xl'>
        <h2 className='text-xl font-semibold mt-10'>Your tasks</h2>
        {tasks.map(({ task, completed, id, editing }, index) => {
          return (
            <div key={id} className='flex flex-col mb-3'>
              <div className='flex justify-between items-center'>
                <div
                  className={` border-slate-700 border  rounded-md p-2 flex justify-between items-center`}
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
                  <button className='edit' onClick={() => editTaskMenu(id)}>
                    <Edit />
                  </button>
                  <button className='delete' onClick={() => deleteTask(id)}>
                    <Delete />
                  </button>
                </div>
              </div>

              {editing ? (
                <div className='bg-slate-800 absolute text-white rounded-md '>
                  <div>
                    <XIcon
                      className='absolute text-white top-0 right-0 mr-4 mt-4'
                      onClick={() => editTaskMenu(id)}
                    />
                  </div>
                  <div className='flex justify-center items-center h-full p-5 '>
                    <Form {...form2}>
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

export default FormInput
