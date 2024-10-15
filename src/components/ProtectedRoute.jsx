import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({children}) => {
    const isAuthenticated = localStorage.getItem('authUser')
  return isAuthenticated ? children : <Navigate to={'/login'} />
}

export default ProtectedRoute