import React from 'react'

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      error: ''
    }
  }

  onEmailChange = (e) => {
    const email = e.target.value
    this.setState(() => ({ email }))
  }
  onPasswordChange = (e) => {
    const password = e.target.value
    this.setState(() => ({ password }))
  }
  onSubmit = (e) => {
    e.preventDefault()

    if (!this.state.email || !this.state.password) {
      this.setState(() => ({ error: 'Please provide both email and password' })) 
    } else {
      this.setState(() => ({ error: '' })) 
      this.props.onSubmit({
        email: this.state.email,
        password: this.state.password
      })
    }
  }
  render() {
    return (
      <form className="form" onSubmit={this.onSubmit}>
        {this.state.error && <p className="form__error">{this.state.error}</p>}
        <div className="group">
          <input
            type="email"
            className="text-input"
            placeholder="Email"
            autoFocus
            value={this.state.email}
            onChange={this.onEmailChange}
            id="loginemail"
          />
          <label htmlFor="loginemail">Email</label>
        </div>
        <div className="group">
          <input
            type="password"
            className="text-input"
            placeholder="Password"
            value={this.state.password}
            onChange={this.onPasswordChange}
            id="loginpassword"
          />
          <label htmlFor="loginpassword">Password</label>
        </div>
        <div>
          <button className="button-style">Login</button>
        </div>
      </form>
    )
  }
}