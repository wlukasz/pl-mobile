import React, { Component } from 'react'
import dbRequest from '../utils/dbRequest'

export default class DashboardPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      isAuthenticated: undefined
    }
  }
  async componentDidMount() {
    try {
      let body
      // update user name
      body = {
        reqName: 'updateUser', // returns object
        id: 12,
        first_name: 'Wojciech'
      }
      await dbRequest(body)

      // fetch user 
      body = {
        reqName: 'fetchUser', // returns array
        id: 12
      }
      const result = await dbRequest(body)
      console.log('Result for fetchUser:', result)
      result.map(user => {
        this.setState({
          ...this.state, 
          firstName: user.first_name,
          lastName: user.last_name, 
          email: user.email 
        })      
      })

      //  verify user's password
      body = {
        reqName: 'fetchPassword', // returns object { isAuthenticated: true/false }
        preProcess: 'testCase',
        postProcess: 'verifyPassword',
        email: 'namaste.w28@gmail.com',
        plainPassword: 'test'
      }
      const passwordCheck = await dbRequest(body)
      console.log('Result for fetchPassword:', passwordCheck)
      this.setState({
        ...this.state, 
        isAuthenticated: passwordCheck.isAuthenticated 
      })      

      console.log('state:', this.state)
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
