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
  fetchUser(id) {
    fetch(`api/fetchUser/${id}`)
      .then(res => {
        if (!res.ok) {
          throw Error(res.statusText)
        }
        return res.json()
      })
      .then( (user) => {
        console.log(this)
        console.log('FETCH', user)
        this.setState({ 
          firstName: user.first_name,
          lastName: user.last_name, 
          email: user.email 
        })
      })
      .catch(error => console.log(error))
  }
  updateUser(id) {
    // fetch POST
    const url = `api/updateUser`
    let body = {
      id: 12,
      firstName: 'Voytek',
      email: 'namaste.w28@gmail.com'
    }
    let postData = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }
    console.log('postData: ', postData)
    fetch(url, postData)
      .then(res => {
        if (!res.ok) {
          throw Error(res.statusText)
        }
        return res.json()
      })
      .then( (result) => {
        console.log(this)
        console.log('UPDATE', result)
        this.fetchUser(id)
      })
      .catch(error => console.log(error))
  }
  componentDidMount() {
    // fetch user via mysql API
    this.fetchUser(id)
    // update (and fetch) user via mysql API
    let id = 12
    this.updateUser(id)
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
