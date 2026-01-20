import { useGetUserQuery } from '@/app/features/api/authApiSlice'
import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router'

const ProtectedPage = () => {
  // const isOnline = useSelector(state => state.persistedReducer.auth.user)
  const { data, isLoading } = useGetUserQuery()

  console.log("PROFILE PAGE DATA: ", data)
  if (isLoading) {
    return <div>Loading...</div>
  }

  return data ? <Outlet /> : <Navigate to="/auth" replace />;
}

export default ProtectedPage