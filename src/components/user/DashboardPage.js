import React from 'react'
import { connect } from 'react-redux'
import PageHeader from '../general/PageHeader'
import AllUserTags from './AllUserTags'

export class DashboardPage extends React.Component {
  constructor(props) {
    super(props)
  }

  setPageTitle = () => `Your Dashboard, ${this.props.firstName}`

  render() {
    return (
      <div className="Users">
        <PageHeader title={this.setPageTitle()} />
        <AllUserTags />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    firstName: state.user.firstName,
    id: state.user.id
  }
}

export default connect(mapStateToProps)(DashboardPage)