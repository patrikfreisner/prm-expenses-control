import React from 'react'
import { useLoginContext } from '../../../Context/LoginContext';

const ExpensesComponent = () => {
  const { logout } = useLoginContext();
  const logOut = () => {
    logout();
  }

  return (
    <>
      <div>ExpensesComponent</div>
      <button type='button' onClick={logOut}>
        Logout
      </button>
    </>
  )
}

export default ExpensesComponent