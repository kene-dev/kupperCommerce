import { useForgotPasswordMutation } from '@/app/features/api/authApiSlice'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const forgotPasswordSchema = z.object({
  email: z.string().email().min(1, "please input your email"),
})

const ForgotPassword = () => {
  const [forgotPassword, {isLoading}] = useForgotPasswordMutation()

  const {register, handleSubmit,reset, formState:{errors,isSubmitting}} = useForm({
          resolver: zodResolver(forgotPasswordSchema)
  })

  const onSubmit = async (data) => {
    const email = data.email
    console.log(email)
    try {
      const response = await forgotPassword({email}).unwrap()
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className='p-5 w-screen flex  justify-center items-center my-[100px] '>
      <form onSubmit={handleSubmit(onSubmit)}  className='w-full border-[1px] border-black/30 rounded-md shadow-xs p-6 lg:w-[400px]'>

        <h1 className='font-semibold text-2xl mb-1'>Forgot Password</h1>
        <p className='text-xs text-gray-500 mb-5'>We will send you an email to reset your passwords</p>
        <div className='flex flex-col gap-7'>

          <input {...register('email')} className='border border-gray rounded-sm shadow-xs h-10 p-3 placeholder:text-xs' type="email" name="email" placeholder='Email' />
          {errors.email && (<p className="-mt-5 text-red-500 text-sm">{errors.email.message}</p>)}


          <button className='bg-primary rounded-sm shadow-lg h-10 text-white font-semibold mb-6'>{isLoading ? (<div className='loader'></div> ) : 'Submit'}</button>
        </div>
      </form>
    </div>
  )
}

export default ForgotPassword