import { useGetUserQuery } from '@/app/features/api/authApiSlice'
import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router'

const ProtectedPage = () => {
  const { data, isLoading, isFetching } = useGetUserQuery()
  const location = useLocation()

  if (isLoading || isFetching) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="loader"></div>
        <p className="ml-2">Verifying authentication...</p>
      </div>
    )
  }

  if (data) {
    return <Outlet />
  }

  return <Navigate to="/auth" state={{ from: location }} replace />
}

export default ProtectedPage