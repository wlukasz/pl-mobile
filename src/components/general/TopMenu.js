import React from 'react'
import { connect } from 'react-redux'
import { DropdownButton, DropdownItem, Dropdown } from 'react-bootstrap'
import { history } from '../../routers/AppRouter'
import { logout } from '../../actions/auth'

export const TopMenu = ({ logout }) => {
  const signOut = () => {
    logout()
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
  logout: () => dispatch(logout())
})

export default connect(undefined, mapDispatchToProps)(TopMenu)