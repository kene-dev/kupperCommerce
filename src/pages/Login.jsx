import { useSignInUserMutation, useSignUpUserMutation } from '@/app/features/api/authApiSlice';
import supabase from '@/app/supabaseClient';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { FiEye } from "react-icons/fi";
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { z } from 'zod';

const signInSchema = z.object({
  email: z
    .string()
    .nonempty("please input your email")
    .email("please enter a valid email address"),
  password: z.string().min(6, 'please add your password')
})

const Login = () => {
  const [signInUser, { isLoading }] = useSignInUserMutation()
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(signInSchema)
  })
  const [hide, setHide] = useState(true);
  const navigate = useNavigate()
  const isOnline = useSelector(state => state.persistedReducer.auth.user)
  const userRole = useSelector(state => state.persistedReducer.auth.role)


  const onSubmit = async (formData) => {
    try {
      const response = await signInUser(formData).unwrap();
      reset()
    } catch (error) {
      toast.error(error.data)
      console.error('Error logging in user:', error)
    }
  }

  useEffect(() => {
    if (isOnline) {
      // Navigate admin users to admin panel, regular users to home
      if (userRole === 'admin') {
        navigate('/admin')
      } else {
        navigate('/')
      }
    }
  }, [isOnline, userRole, navigate])


  return (
    <div className='px-5 w-screen flex flex-col justify-center items-center my-[100px] lg:flex-row gap-6'>

      <form onSubmit={handleSubmit(onSubmit)} className='border-[1px] border-black/30 rounded-md shadow-xs p-6 w-full md:w-[400px]'>
        <h1 className='font-semibold text-2xl mb-1'>Login</h1>
        <p className='text-xs text-gray-500 mb-5'>Please login below</p>
        <div className='flex flex-col gap-7'>
          <input {...register('email')} className='border border-gray rounded-sm shadow-xs h-10 p-3 placeholder:text-xs' type="text" placeholder='Email' />
          {errors.email && (<p className="-mt-5 text-red-500 text-sm">{errors.email.message}</p>)}


          <div className='relative'>
            <input {...register('password')} className='w-full border border-gray rounded-sm shadow-xs h-10 p-3 placeholder:text-xs' type={hide ? 'password' : "text"} placeholder='Password' />
            <FiEye onClick={() => setHide(!hide)} className='absolute right-5 top-3 eye-icon' />
          </div>
          {errors.password && (<p className="-mt-5 text-red-500 text-sm">{errors.password.message}</p>)}

          <button className='bg-primary rounded-sm shadow-lg h-10 text-white flex items-center justify-center font-semibold'>
            {isLoading ? (<div className='loader'></div>) : 'Sign in'}
          </button>

          <Link to="forgot-password" className='text-primary text-center'>Forgot Your Password?</Link>
        </div>
      </form>


      <div className='w-full flex justify-center items-center flex-col gap-2 md:w-[300px]'>
        <h1 className='text-md font-semibold '>Don’t Have An Account?</h1>
        <Link className='flex items-center justify-center border border-primary shadow-sm rounded-md w-full h-10 text-primary font-semibold text-sm' to='/auth/register'>
          Create Account
        </Link>
        <p className='text-center text-xs lg:text-sm px-2'>Your privacy and security are important to us. For more information on how we use your data read our</p>
        <p className='text-xs text-primary font-semibold lg:text-sm'>Privacy Policy.</p>
      </div>
    </div>
  )
}

export default Login