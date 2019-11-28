import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import logo from '../../../public/images/pl-logo.png'
// import SignOut from '../auth/SignOut'
// {isAuthenticated && <SignOut />}
import TopMenu from './TopMenu'

export const Header = ({ isAuthenticated }) => (
  <header className="header">
  <div className="content-container">
    <div className="header__content">
      <Link className="header__title" to='/dashboard'>
        <img src={logo} alt="Logo" />
      </Link>
      {isAuthenticated && <TopMenu />}
    </div>
  </div>
  </header>
)

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps)(Header)