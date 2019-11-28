import React from 'react'
import { connect } from 'react-redux'
import PageHeader from '../general/PageHeader'

export class DashboardPage extends React.Component {
  constructor(props) {
    super(props)
  }

  setPageTitle = () => `Your Dashboard, ${this.props.firstName}`

  render() {
    return (
      <div className="Users">
        <PageHeader title={this.setPageTitle()} />
        <p>Current email: {this.props.email}</p>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    firstName: state.user.firstName,
    email: state.user.email
  }
}

export default connect(mapStateToProps)(DashboardPage)