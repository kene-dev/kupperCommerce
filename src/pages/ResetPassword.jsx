import React, { useState } from 'react'
import { z } from 'zod'
import { FiEye } from "react-icons/fi";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useResetPasswordMutation } from '@/app/features/api/authApiSlice';

const resetPasswordSchema = z.object({
  password: z.string().min(8, "password must have at least 8 characters"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword,  {
  message: "Passwords don't match",
  path: ['confirmPassword']
})

const ResetPassword = () => {
  const [resetPassword, {isLoading}] = useResetPasswordMutation()
  const [show, setShow] = useState(false)

   const {register, handleSubmit,reset, formState:{errors,isSubmitting}} = useForm({
        resolver: zodResolver(resetPasswordSchema)
    })

    const onSubmit = async (data) => {
      console.log(data)
      const password = data.password;
      try {
        const response = await resetPassword({password}).unwrap()
        console.log(response)
      } catch (error) {
        console.log(error)
      }

    }


  return (
    <div className='p-5 w-screen flex  justify-center items-center my-[100px] '>
    <form onSubmit={handleSubmit(onSubmit)} className='w-full border-[1px] border-black/30 rounded-md shadow-xs p-6 md:w-[400px]'>

        <h1 className='font-semibold text-2xl mb-1'>Reset Password</h1>
        <p className='text-xs text-gray-500 mb-5'>Kindly input your new password</p>

        <div className='flex flex-col gap-7'>
          <div className='relative'>
            <input {...register('password')} className='w-full border border-gray rounded-sm shadow-xs h-10 p-3 placeholder:text-xs' type={show ? 'text' : 'password'} name="password" placeholder='Password' />
            <FiEye onClick={() => setShow(!show)} className='absolute right-5 top-3'/>
          </div>
           {errors.password && (<p className="-mt-5 text-red-500 text-sm">{errors.password.message}</p>)}

          <div className='relative'>
            <input {...register('confirmPassword')} className='w-full border border-gray rounded-sm shadow-xs h-10 p-3 placeholder:text-xs'  type={show ? 'text' : 'password'} name="confirmPassword" placeholder='Confirm Password' />
            <FiEye onClick={() => setShow(!show)} className='absolute right-5 top-3'/>
          </div>
          {errors.confirmPassword && (<p className="-mt-5 text-red-500 text-sm">{errors.confirmPassword.message}</p>)}

        <button className='bg-primary rounded-sm shadow-lg h-10 text-white font-semibold mb-6'>Submit</button>
      </div>

    </form>
  </div>
  )
}

export default ResetPassword