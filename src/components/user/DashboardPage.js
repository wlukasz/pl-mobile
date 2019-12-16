import React from 'react'
import { connect } from 'react-redux'
import PageHeader from '../general/PageHeader'
import AllUserTags from '../tags/AllUserTags'

export const DashboardPage = props => (
  <div className="Users">
    <PageHeader title={`Your Dashboard, ${props.firstName}`} />
    <AllUserTags />
  </div>
)

const mapStateToProps = (state) => {
  return {
    firstName: state.user.firstName
  }
}

export default connect(mapStateToProps)(DashboardPage)