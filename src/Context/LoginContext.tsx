import React, { createContext, useState, useContext, useEffect } from 'react'

import UserLoginService from '../assets/js/user-login-service'
import CognitoService from '../assets/js/cognito-service'

const _loginService = new UserLoginService()
const _cognitoService = new CognitoService()

export const LoginContext = createContext({})
LoginContext.displayName = 'LoginContext'

export const LoginProvider = ({ children }: any) => {
  const [isAuthenticating, setIsAuthenticating] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userData, setUserData] = useState({})
  const [jwtToken, setJwtToken] = useState("");

  return (
    <LoginContext.Provider
      value={{
        userData,
        setUserData,
        isAuthenticated,
        setIsAuthenticated,
        isAuthenticating,
        setIsAuthenticating,
        jwtToken,
        setJwtToken
      }}
    >
      {children}
    </LoginContext.Provider>
  )
}

export const useLoginContext = () => {
  const {
    userData,
    setUserData,
    isAuthenticated,
    setIsAuthenticated,
    isAuthenticating,
    setIsAuthenticating,
    jwtToken,
    setJwtToken
  } = useContext<any>(LoginContext)

  // Authenticate
  function authenticate(user: any, passw: any, callback: any) {
    _loginService.authenticate(user, passw, (event: any, session: any) => {
      setIsAuthenticated((session ? true : false))
      setUserData(_cognitoService.getCurrentUserData())
      setJwtToken(session.getIdToken().getJwtToken());
      if (callback) {
        callback(event, session)
      }
    })
  }

  // Check if is authenticated
  function checkIsAuthenticated(callback: any) {
    _loginService.isAuthenticated((session: any, isAuthenticated: any) => {
      if (isAuthenticated === true) {
        setIsAuthenticated(isAuthenticated);
        setJwtToken(session.getIdToken().getJwtToken());

        callback(isAuthenticated);
      }
    });
  }

  function getAuthenticationToken(): string {
    return jwtToken;
  }

  // Logout
  function logout() {
    try {
      _loginService.logout()
    } catch (e) {
      console.log(e)
    } finally {
      setIsAuthenticated(false)
      setUserData({})
    }
  }

  useEffect(() => {
    if (isAuthenticated === true) {
      setUserData(_cognitoService.getCurrentUserData())
    }
  }, [isAuthenticated, setUserData])

  return {
    userData,
    setUserData,
    isAuthenticated,
    setIsAuthenticated,
    isAuthenticating,
    setIsAuthenticating,
    checkIsAuthenticated,
    getAuthenticationToken,
    authenticate,
    logout
  }
}
