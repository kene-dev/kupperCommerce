import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router'

const ProtectedPage = () => {
      const isOnline = useSelector(state => state.persistedReducer.auth.user)
  return isOnline ? <Outlet /> : <Navigate to="/auth" replace />;
}

export default ProtectedPage