import React from 'react'
import { connect } from 'react-redux'
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import PageHeader from '../general/PageHeader'
import UserForm from './UserForm'
import startUserUpdate from '../../utils/user/startUserUpdate'
import { updateUser } from '../../actions/user'
import startRenewToken from '../../utils/auth/startRenewToken'
import { renewToken } from '../../actions/auth'

export class UpdateUserPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      error: false
    }
  }

  setPageTitle = (props) => {
    return `Your Profile, ${props.firstName}`
  }
  onSubmit = async (props) => {
    this.props.showLoading()
    const userUpdateResult = await this.props.startUserUpdate(props)
    this.props.hideLoading()
    
    if (userUpdateResult.error) {
      this.setState(() => ({ error: userUpdateResult.error }))
    } else {
      const { reqName, token, ...rest } = userUpdateResult
      this.props.updateUser({ ...rest })
      const renewedToken = await this.props.startRenewToken({ token, ...rest })
      this.props.renewToken( renewedToken )
    }
  }
  render() {  
    return (
      <div>
      <PageHeader title={this.setPageTitle(this.props)} />
      <div className="content-container">
          {this.state.error !== false && <p className="error-msg">{this.state.error}</p>}
          <UserForm
            onSubmit={this.onSubmit}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    firstName: state.user.firstName
  }
}

const mapDispatchToProps = (dispatch) => ({
  startUserUpdate: (props) => dispatch(startUserUpdate(props)),
  updateUser: (props) => dispatch(updateUser(props)),
  startRenewToken: (props) => dispatch(startRenewToken(props)),
  renewToken: (props) => dispatch(renewToken(props)),
  showLoading: () => dispatch(showLoading()),
  hideLoading: () => dispatch(hideLoading())
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateUserPage)
