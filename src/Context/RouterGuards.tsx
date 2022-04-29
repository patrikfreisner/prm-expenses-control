import React from 'react'
import { Navigate, Outlet } from 'react-router'

// Context
import { useLoginContext } from './LoginContext'

// Components
//import Navigation from '../Components/NavigationToolbar/Navigation'

export const PrivateOutlet = ({ location }: any) => {
  const { isAuthenticated } = useLoginContext()

  return isAuthenticated ? (
    <>
      <Outlet />
    </>
  ) : (
    <Navigate to={{ pathname: 'login' }} />
  )
}
