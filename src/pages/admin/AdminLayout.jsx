import supabase from '@/app/supabaseClient'
import Sidebar from '@/components/admin/Sidebar'
import React, { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router'

const AdminLayout = () => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
    // const {role} = useSelector(state => state.persistedReducer.auth.role)
    // const {data:user, isLoading} = useGetUserQuery();
    console.log(user)
  
  
  useEffect(() => {
    const getUser = async () => {
      try {
        const { data, error } = await supabase.auth.getUser();
        if (error) {
          console.error('Error getting user:', error);
          setUser(null);
        } else {
          setUser(data?.user);
        }
      } catch (error) {
        console.error('Error getting user:', error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    }
    getUser()
  }, [])

  if(isLoading){
    return (
      <div className='w-full h-screen flex items-center justify-center'>
        <div className='loader-primary'></div>
      </div>
    );
  }


  return (
    <div className='w-screen h-screen flex items-start gap-7 lg:px-5 lg:my-5'>
        <div className='hidden lg:block'>
          <Sidebar />
        </div>
        <div className='h-full grow overflow-y-scroll'>
          {user && user.user_metadata?.role === 'admin'  ? 
            <Outlet />
           : <Navigate to="/" replace />}
        </div>
    </div>
  )
}

export default AdminLayout