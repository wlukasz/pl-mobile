import React from 'react'
import { connect } from 'react-redux'

export class UserForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      token: props.token,
      id: props.id,
      firstName: props.firstName,
      lastName: props.lastName,
      email: props.email,
      error: ''
    }
  }

  onFirstNameChange = (e) => {
    const firstName = e.target.value
    this.setState(() => ({ firstName }))
  }
  onLastNameChange = (e) => {
    const lastName = e.target.value
    this.setState(() => ({ lastName }))
  } 
  onEmailChange = (e) => {
    const email = e.target.value
    this.setState(() => ({ email }))
  }
  onSubmit = (e) => {
    e.preventDefault()
    if (!this.state.email || !this.state.firstName || !this.state.lastName) {
      this.setState(() => ({ error: 'Please provide values in all fields' })) 
    } else {
      this.setState(() => ({ error: '' })) 
      this.props.onSubmit({
        token: this.state.token,
        id: this.state.id,
        lastName: this.state.lastName,
        firstName: this.state.firstName,
        email: this.state.email,
      })
    }
  }
  render() {
    return (
      <form className="form" onSubmit={this.onSubmit}>
        {this.state.error && <p className="form__error">{this.state.error}</p>}
        <div className="group">
          <input
            type="text"
            className="text-input"
            placeholder="First Name"
            autoFocus
            defaultValue={this.state.firstName}
            onChange={this.onFirstNameChange}
            id="firstname"
          />
          <label htmlFor="firstname">First Name</label>
        </div>
        <div className="group">
          <input
            type="text"
            className="text-input"
            placeholder="Last Name"
            defaultValue={this.state.lastName}
            onChange={this.onLastNameChange}
            id="lastname"
          />
          <label htmlFor="lastname">Last Name</label>
        </div>
        <div className="group">
          <input
            type="email"
            className="text-input"
            placeholder="Email"
            defaultValue={this.state.email}
            onChange={this.onEmailChange}
            id="updateemail"
          />
          <label htmlFor="updateemail">Email</label>
        </div>
        <div>
          <button className="button-style">Save</button>
        </div>
      </form>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    id: state.user.id,
    firstName: state.user.firstName,
    lastName: state.user.lastName,
    email: state.user.email
  }
}

export default connect(mapStateToProps)(UserForm)
