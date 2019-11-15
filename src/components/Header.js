import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { startLogout, logout } from '../actions/auth'

export const Header = ({ startLogout, logout }) => {
  const signOut = () => {
    startLogout()
    logout()
  }
  return (
  <header className="header">
  <div className="content-container">
    <div className="header__content">
      <Link className="header__title" to='/dashboard'>
        <h1>PL-Mobile</h1>
      </Link>
      <button 
        className="button-style button-style--link" 
        onClick={signOut}
      >
        Logout
      </button>
    </div>
  </div>
  </header>
)}

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout()),
  logout: () => dispatch(logout())
})

export default connect(undefined, mapDispatchToProps)(Header)