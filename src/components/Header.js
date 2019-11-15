import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { startLogoutMysql, logoutMysql } from '../actions/auth'

export const Header = ({ startLogoutMysql, logoutMysql }) => {
  const logout = () => {
    startLogoutMysql()
    logoutMysql()
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
        onClick={logout}
      >
        Logout
      </button>
    </div>
  </div>
  </header>
)}

const mapDispatchToProps = (dispatch) => ({
  startLogoutMysql: () => dispatch(startLogoutMysql()),
  logoutMysql: () => dispatch(logoutMysql())
})

export default connect(undefined, mapDispatchToProps)(Header)