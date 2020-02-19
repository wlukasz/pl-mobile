import React from 'react'
import { connect } from 'react-redux'
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import PageHeader from '../general/PageHeader'
import LoginForm from './LoginForm'
import startLogin from '../../utils/auth/startLogin'
import { login } from '../../actions/auth'
import { updateUser } from '../../actions/user'
import refreshUserTags from '../../utils/user/refreshUserTags'
import getTagData from '../../utils/user/getTagData'
import { updateTags } from '../../actions/tags'

export class LoginPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      error: false
    }
  }

  setPageTitle = () => 'Login'
  onSubmit = async (props) => {
    this.props.showLoading()
    const passwordCheckResponse = await this.props.startLogin(props)
    
    if (passwordCheckResponse.error) {
      this.setState(() => ({ error: passwordCheckResponse.error.message }))
    } else if (passwordCheckResponse.isAuthenticated === false) {
      this.setState(() => ({ error: 'Login unsuccessful' }))
    } else {
      const { isAuthenticated, token, id, ...rest } = passwordCheckResponse
      this.props.login( { isAuthenticated, token })
      this.props.updateUser({ id, ...rest })
            
      // refresh mobile_data in db-tenancy agreement table for this memid
      const tagsRefreshed = await refreshUserTags({ token, memid: id })
      console.log('app.js, tagsRefreshed:', tagsRefreshed)

      const tagData = await getTagData(id, token)
      this.props.updateTags(tagData)      
      localStorage.setItem('token', token)
    }
    this.props.hideLoading()
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
  getTagData: (props) => dispatch(getTagData(props)),
  updateTags: (props) => dispatch(updateTags(props)),
  showLoading: () => dispatch(showLoading()),
  hideLoading: () => dispatch(hideLoading())
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)
