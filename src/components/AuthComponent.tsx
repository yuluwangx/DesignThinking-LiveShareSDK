import { Navigate } from 'react-router-dom'
import React, { ReactNode } from 'react'

interface AuthRouteProps {
  children: ReactNode
}

const AuthRoute: React.FC<AuthRouteProps> = ({ children }) => {
  return <>{children}</>
}

export { AuthRoute }
