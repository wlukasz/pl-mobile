import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
// import Img from 'react-image'
import { startLogout, logout } from '../actions/auth'
import logo from '!!file-loader!../../public/images/pl-logo.png'

export const Header = ({ isAuthenticated, startLogout, logout }) => {
  const signOut = () => {
    startLogout()
    logout()
  }
  return (
  <header className="header">
  <div className="content-container">
    <div className="header__content">
      <Link className="header__title" to='/dashboard'>
        <img src={logo} alt="Logo" />
      </Link>
      {isAuthenticated &&
        <button 
          className="button-style button-style--link" 
          onClick={signOut}
        >
          Logout
        </button>
      }
    </div>
  </div>
  </header>
)}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
})

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout()),
  logout: () => dispatch(logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)