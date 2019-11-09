import React, { Component } from 'react'

export default class DashboardPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      email: ''
    }
  }
  async dbRequest(body) {
    try {
      let postData = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      }
      console.log('postData: ', postData)

      const res = await fetch('api', postData)
      if (!res.ok) {
        throw Error(res.statusText)
      }
      const result = await res.json()
      console.log('Generic FETCH', body.reqName, result)
      return result
    } catch(error) {
      console.log('Generic FETCH Error', body.reqName, error)
    } 
  }
  async componentDidMount() {
    try {
      let body = {
        reqName: 'updateUser', // returns object
        id: 12,
        first_name: 'Wojciech'
      }
      await this.dbRequest(body)

      body = {
        reqName: 'fetchUser', // returns array
        id: 12
      }
      const result = await this.dbRequest(body)
      console.log('Result for fetchUser:', result)
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
