import React from 'react';
import { connect } from 'react-redux';
import LoginForm from './LoginForm';
import { startLoginMysql, loginMysql } from '../actions/auth';
import { Header } from './Header';

export class LoginMysqlPage extends React.Component {
  onSubmit = async (props) => {
    console.log('In LoginMysqlPage props:', props)
    const isAuthenticated = await this.props.startLoginMysql(props)
    console.log('in LoginMysqlPage isAuthenticated:', isAuthenticated)
    this.props.loginMysql(isAuthenticated)
  }
  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Login MySQL</h1>
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
  startLoginMysql: (props) => dispatch(startLoginMysql(props)),
  loginMysql: (props) => dispatch(loginMysql(props))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginMysqlPage);
