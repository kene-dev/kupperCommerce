import supabase from '@/app/supabaseClient'
import Sidebar from '@/components/admin/Sidebar'
import React, { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router'
import { Menu } from 'lucide-react'

const AdminLayout = () => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)

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

  // Close sidebar when screen size changes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)
  const closeSidebar = () => setSidebarOpen(false)

  if (isLoading) {
    return (
      <div className='w-full h-screen flex items-center justify-center'>
        <div className='loader-primary'></div>
      </div>
    );
  }


  return (
    <div className='w-screen h-screen flex items-start gap-4 lg:gap-7 px-3 lg:px-5 py-3 lg:my-5'>
      {/* Mobile hamburger menu button */}
      <button
        onClick={toggleSidebar}
        className='lg:hidden fixed top-4 left-4 z-30 bg-primary text-white p-2 rounded-lg shadow-lg hover:bg-primary/90 transition-colors'
        aria-label="Open sidebar"
      >
        <Menu size={24} />
      </button>

      {/* Sidebar - now always rendered, visibility controlled by props */}
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />

      <div className='h-screen grow overflow-y-auto pt-14 lg:pt-0'>
        {user && user.user_metadata?.role === 'admin' ?
          <Outlet />
          : <Navigate to="/" replace />}
      </div>
    </div>
  )
}

export default AdminLayout