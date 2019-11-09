import React, { Component } from 'react'
import dbRequest from '../utils/dbRequest'

export default class DashboardPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      email: ''
    }
  }
  async componentDidMount() {
    try {
      // fetch user
      let body = {
        reqName: 'fetchUser', // returns array
        id: 12
      }
      const result1 = await dbRequest(body)
      console.log('1. Result for fetchUser:', result1)
      result1.map(user => {
        this.setState({ 
          firstName: user.first_name,
          lastName: user.last_name, 
          email: user.email 
        })      
      })

      // update user name
      body = {
        reqName: 'updateUser', // returns object
        id: 12,
        first_name: 'Wojciech'
      }
      await dbRequest(body)

      // fetch user again
      body = {
        reqName: 'fetchUser', // returns array
        id: 12
      }
      const result = await dbRequest(body)
      console.log('2. Result for fetchUser:', result)
      result.map(user => {
        this.setState({ 
          firstName: user.first_name,
          lastName: user.last_name, 
          email: user.email 
        })      
      })
    } catch(error) {
      console.log('Error caught in componentDidMount:', error)
    }
  }
  render() {
    return (
      <div className="Users">
        <h1>User</h1>
        <p>First Name: {this.state.firstName}</p>
        <p>Last Name: {this.state.lastName}</p>
        <p>Email: {this.state.email}</p>
      </div>
    )
  }
}
