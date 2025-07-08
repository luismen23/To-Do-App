import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { StepBack } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { z } from 'zod'

function LoginPage() {
  const formSchema = z.object({
    name: z
      .string()
      .min(3, {
        message: 'Your name need to be at least 3 characters long',
      })
      .max(20),
    email: z
      .string()
      .min(4, {
        message: 'Add a valid emali',
      })
      .max(20),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    form.reset()
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=' flex flex-col bg-[#8DA9C4] gap-3 justify-center rounded-md items-center p-10 mt-32 relative '
      >
        <div className='absolute -top-12 left-0 flex text-center'>
          <Link to='/'>
            <StepBack className='inline' /> Back
          </Link>
        </div>
        <h2 className='text-2xl'>Welcome back!</h2>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-md'>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder='your name'
                  className='border-slate-600 '
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
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem className='relative'>
              <FormLabel className='text-md'>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder='your email'
                  className='border-slate-600 '
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
        <button
          className='text-md border-t-2 border-r-2 rounded-t-md px-4 py-2 bg-[#0B2545] border-[#134074] transition duration-100  hover:scale-105 mt-4'
          type='submit'
        >
          Sign in
        </button>
      </form>
    </Form>
  )
}

export default LoginPage
