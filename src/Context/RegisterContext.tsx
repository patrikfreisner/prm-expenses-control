import React, { createContext, useContext, useState } from 'react'
import { Outlet } from 'react-router'

import UserRegistrationService from '../Assets/js/user-registration-service'

var _userRegistrationService = new UserRegistrationService()

export const RegisterContext = createContext({})
RegisterContext.displayName = 'RegisterContext'

export const RegisterProvider = () => {
  const [userRegistrationData, setUserRegistrationData] = useState({})
  const [isRegistrationInProgress, setIsRegistrationInProgress] = useState({})

  return (
    <RegisterContext.Provider
      value={{
        userRegistrationData,
        setUserRegistrationData,
        isRegistrationInProgress,
        setIsRegistrationInProgress
      }}
    >
      <Outlet />
    </RegisterContext.Provider>
  )
}

export const useRegisterContext = () => {
  const {
    userRegistrationData,
    setUserRegistrationData,
    isRegistrationInProgress,
    setIsRegistrationInProgress
  } = useContext<any>(RegisterContext)

  function registerNewUser(userData: any, callback: any) {
    _userRegistrationService.register(userData, (props: any) => {
      callback(props)
    })
  }

  return {
    userRegistrationData,
    setUserRegistrationData,
    isRegistrationInProgress,
    setIsRegistrationInProgress,
    registerNewUser
  }
}
