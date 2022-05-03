import { useNavigate } from '@reach/router';
import React, { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router'

// Context
import { useLoginContext } from './LoginContext'

// Components
//import Navigation from '../Components/NavigationToolbar/Navigation'

export const PrivateOutlet = ({ location }: any) => {
  const { isAuthenticated, checkIsAuthenticated } = useLoginContext();
  const navigate = useNavigate();

  useEffect(() => {
      if (!isAuthenticated) checkIsAuthenticated((msg: any, response: any) => {
          console.log(msg);
          if (response === true) navigate('/');
      });
  }, [checkIsAuthenticated, isAuthenticated, navigate]);


  return isAuthenticated ? (
    <>
      <Outlet />
    </>
  ) : (
    <Navigate to={{ pathname: 'login' }} />
  )
}
