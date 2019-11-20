import React from 'react'
import { connect } from 'react-redux'
import { logout } from '../actions/auth'

export const SignOut = ({ logout }) => {
  const signOut = () => {
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
  logout: () => dispatch(logout())
})

export default connect(undefined, mapDispatchToProps)(SignOut)