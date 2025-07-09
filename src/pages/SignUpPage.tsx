import { Checkbox } from '@/components/ui/checkbox'
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

function SignUpPage() {
  const formSchema = z.object({
    name: z
      .string()
      .min(3, {
        message: 'Your name needs to be at least 3 characters long.',
      })
      .max(20),
    email: z.string().email({ message: 'Please enter a valid email.' }).max(20),
    password: z
      .string()
      .min(8, {
        message: 'Your password needs to be at least 8 characters.',
      })
      .max(20),
    checkbox: z.boolean().refine(val => val === true, {
      message: 'You must agree to the terms.',
    }),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      checkbox: false,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    form.reset()
  }
  return (
    <div className='w-full h-svh relative'>
      <div className='absolute top-6 left-2 flex text-center'>
        <Link to='/'>
          <StepBack className='inline' /> Back
        </Link>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=' flex flex-col bg-[#8DA9C4] gap-3 w-full  justify-end  rounded-t-3xl p-10 absolute bottom-0 '
        >
          <h2 className='text-2xl w-auto mx-auto'>Get Started</h2>
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
                <FormMessage />
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
          <FormField
            control={form.control}
            name='checkbox'
            render={({ field }) => (
              <FormItem>
                <div className='flex items-center gap-2'>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className='!mt-0 cursor-pointer font-normal'>
                    I agree to the processing of{' '}
                    <strong> Personal data.</strong>
                  </FormLabel>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <button
            className='text-md border-t-2 border-r-2 rounded-t-md px-4 py-2 bg-[#0B2545] border-[#134074] transition duration-100  hover:scale-105 mt-4'
            type='submit'
          >
            Sign up
          </button>
        </form>
      </Form>
    </div>
  )
}

export default SignUpPage
