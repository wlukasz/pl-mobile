import React from 'react'
import { connect } from 'react-redux'
import { startLogout, logout } from '../actions/auth'

export const SignOut = ({ startLogout, logout }) => {
  const signOut = () => {
    startLogout()
    logout()
    localStorage.removeItem('token')
  }
  return (
    <button 
    className="button-style button-style--link" 
    onClick={signOut}
  >
    Logout
  </button>
  )
}

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout()),
  logout: () => dispatch(logout())
})

export default connect(undefined, mapDispatchToProps)(SignOut)