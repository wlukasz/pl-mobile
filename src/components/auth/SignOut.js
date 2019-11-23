import React from 'react'
import { connect } from 'react-redux'
import { logout } from '../../actions/auth'
import { signOutUser } from '../../actions/user'

export const SignOut = ({ logout, signOutUser }) => {
  const signOut = () => {
    logout()
    signOutUser()
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
  logout: () => dispatch(logout()),
  signOutUser: () => dispatch(signOutUser())
})

export default connect(undefined, mapDispatchToProps)(SignOut)