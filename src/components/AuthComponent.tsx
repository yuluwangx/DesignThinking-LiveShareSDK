import { getToken } from '../utils/token'
import { Navigate } from 'react-router-dom'
import React, { ReactNode } from 'react'

interface AuthRouteProps {
  children: ReactNode
}

const AuthRoute: React.FC<AuthRouteProps> = ({ children }) => {
  const token = getToken()
  if (token != null) {
    return <>{children}</>
  } else {
    console.log('Token is null')
    return <Navigate to="/login" replace />
  }
}

export { AuthRoute }
