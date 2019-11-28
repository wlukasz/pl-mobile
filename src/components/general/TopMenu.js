import React from 'react'
import { connect } from 'react-redux'
import { DropdownButton, DropdownItem, Dropdown } from 'react-bootstrap'
import { history } from '../../routers/AppRouter'
import { logout } from '../../actions/auth'
import { signOutUser } from '../../actions/user'

export const TopMenu = ({ logout, signOutUser }) => {
  const signOut = () => {
    logout()
    signOutUser()
    localStorage.removeItem('token')
  }

  return (
    <DropdownButton size="lg" variant="outline-secondary" id="dropdown-basic-button" title="Menu">
      <DropdownItem href="#" onClick={() => history.push('/dashboard')}>Dashboard</DropdownItem>
      <DropdownItem href="#" onClick={() => history.push('/userprofile')}>User Profile</DropdownItem>
      <Dropdown.Divider />
      <DropdownItem href="#" onClick={signOut}>Logout</DropdownItem>
    </DropdownButton>
  )
}

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
  signOutUser: () => dispatch(signOutUser())
})

export default connect(undefined, mapDispatchToProps)(TopMenu)