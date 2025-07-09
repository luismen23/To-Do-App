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
    email: z.string().email({ message: 'Please enter a valid email.' }).max(20),
    password: z
      .string()
      .min(8, {
        message: 'Your password needs to be at least 8 characters.',
      })
      .max(20),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    form.reset()
  }
  return (
    <div className='w-full h-svh relative'>
      <div className='absolute top-6 left-6 flex text-center justify-center items-center'>
        <Link to='/'>
          <StepBack className='flex' /> Back
        </Link>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex flex-col bg-[#8DA9C4] gap-3 w-full  justify-end  rounded-t-3xl p-10 absolute bottom-0 '
        >
          <h2 className='text-2xl'>Welcome back</h2>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-md'>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder='email'
                    className='border-slate-600 '
                    type='email'
                    {...field}
                  />
                </FormControl>
                {/* <FormDescription>
            This is your public display name.
          </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem className='relative'>
                <FormLabel className='text-md'>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder='password '
                    className='border-slate-600'
                    type='password'
                    {...field}
                  />
                </FormControl>
                {/* <FormDescription>
            This is your public display name.
          </FormDescription> */}
                <FormMessage />
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
    </div>
  )
}

export default LoginPage
