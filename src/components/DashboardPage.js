import React from 'react'
import serverRequest from '../utils/serverRequest'
import PageHeader from './PageHeader'

export default class DashboardPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      uid: 0,
      firstName: '',
      lastName: '',
      email: ''
    }
  }
  setPageTitle = () => 'User Dashboard'
  // async componentDidMount() {
  updateUser = async () => {
    try {
      let body
      // update user name
      body = {
        reqName: 'updateUser', // returns object
        id: 12,
        first_name: 'Wojciech',
        token: localStorage.getItem('token')
      }
      await serverRequest(body)

      // fetch user 
      // body = {
      //   reqName: 'fetchUser', // returns array
      //   id: 12
      // }
      // const result = await serverRequest(body)
      // result.map(user => {
      //   this.setState({
      //     ...this.state,
      //     uid: user.id, 
      //     firstName: user.first_name,
      //     lastName: user.last_name, 
      //     email: user.email 
      //   })      
      // })

      console.log('DashboardPage after fetchUser this.state:', this.state)
    } catch(error) {
      console.log('Error caught in componentDidMount:', error)
    }
  }

  render() {
    return (
      <div className="Users">
        <PageHeader title={this.setPageTitle()} />
        <button className="button-style" onClick={this.updateUser}>Update user</button>
        <p>First Name: {this.state.firstName}</p>
        <p>Last Name: {this.state.lastName}</p>
        <p>Email: {this.state.email}</p>
      </div>
    )
  }
}
