import React from 'react';
import { connect } from 'react-redux';
import LoginForm from './LoginForm';
import { startLogin, login } from '../actions/auth';

export class LoginPage extends React.Component {
  onSubmit = async (props) => {
    console.log('In LoginPage props:', props)
    const isAuthenticated = await this.props.startLogin(props)
    console.log('in LoginPage isAuthenticated:', isAuthenticated)
    this.props.login(isAuthenticated)
  }
  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Login</h1>
          </div>
        </div>
        <div className="content-container">
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
  login: (props) => dispatch(login(props))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
