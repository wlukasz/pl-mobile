import React from 'react'
import { connect } from 'react-redux'
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import PageHeader from './PageHeader'
import LoginForm from './LoginForm'
import { startLogin, login } from '../actions/auth'

export class LoginPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      error: false
    }
  }

  setPageTitle = () => 'Login'
  onSubmit = async (props) => {
    console.log('In LoginPage props:', props)
    this.props.showLoading()
    const passwordCheckResponse = await this.props.startLogin(props)
    this.props.hideLoading()
    console.log('in LoginPage passwordCheckResponse:', passwordCheckResponse)
    if (passwordCheckResponse.isAuthenticated === false) {
      this.setState(() => ({ error: 'Login unsuccessful' }))
    } else if (passwordCheckResponse.error) {
      this.setState(() => ({ error: passwordCheckResponse.error.message }))
    } else {
      this.props.login(passwordCheckResponse)
      localStorage.setItem('token', passwordCheckResponse.token)
    }
  }
  render() {  
    return (
      <div>
      <PageHeader title={this.setPageTitle()} />
      <div className="content-container">
          {this.state.error !== false && <p className="error-msg">{this.state.error}</p>}
          <LoginForm
            onSubmit={this.onSubmit}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    email: state.email,
    password: state.password,
    error: state.error
  }
}

const mapDispatchToProps = (dispatch) => ({
  startLogin: (props) => dispatch(startLogin(props)),
  login: (props) => dispatch(login(props)),
  showLoading: () => dispatch(showLoading()),
  hideLoading: () => dispatch(hideLoading())
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
