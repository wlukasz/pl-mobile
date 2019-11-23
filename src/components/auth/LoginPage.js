import React from 'react'
import { connect } from 'react-redux'
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import PageHeader from '../general/PageHeader'
import LoginForm from './LoginForm'
import startLogin from '../../utils/auth/startLogin'
import { login } from '../../actions/auth'
import { updateUser } from '../../actions/user'

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
    
    if (passwordCheckResponse.error) {
      this.setState(() => ({ error: passwordCheckResponse.error.message }))
    } else if (passwordCheckResponse.isAuthenticated === false) {
      this.setState(() => ({ error: 'Login unsuccessful' }))
    } else {
      const { isAuthenticated, token, ...rest } = passwordCheckResponse
      this.props.login( { isAuthenticated, token })
      this.props.updateUser({ ...rest })
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
  updateUser: (props) => dispatch(updateUser(props)),
  showLoading: () => dispatch(showLoading()),
  hideLoading: () => dispatch(hideLoading())
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)
