import React, { Component } from 'react'
import serverRequest from '../utils/serverRequest'

export default class DashboardPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      uid: 0,
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
      await serverRequest(body)
      
      //  verify user's password
      body = {
        reqName: 'fetchPassword', // returns object { isAuthenticated: true/false }
        preProcess: 'testCase',
        postProcess: 'verifyPassword',
        email: 'namaste.w28@gmail.com',
        plainPassword: 'test'
      }
      const passwordCheck = await serverRequest(body)
      this.setState({
        ...this.state, 
        isAuthenticated: passwordCheck.isAuthenticated 
      })      

      // fetch user 
      body = {
        reqName: 'fetchUser', // returns array
        id: 12
      }
      const result = await serverRequest(body)
      result.map(user => {
        this.setState({
          ...this.state,
          uid: user.id, 
          firstName: user.first_name,
          lastName: user.last_name, 
          email: user.email 
        })      
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
