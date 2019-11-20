import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { dispatch } from 'redux'
import AppRouter, { history } from './routers/AppRouter'
import configureStore from './store/configureStore'
import 'normalize.css/normalize.css'
import './styles/styles.scss'
import { verifyToken, login } from './actions/auth'

console.log('history.location', history.location)

const store = configureStore()
const Jsx = () => (
  <Provider store={store}>
    <AppRouter />
  </Provider>
)
let hasRendered = false
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(<Jsx />, document.getElementById('app'))
    hasRendered = true
  }
}

// New (to me) syntax for Immediately Invoked Async Arrow Function
// 1. Checks for JWT token in localStorage and if present verifies its validity
// 2. If token valid logs the user in and redirects to the DashboardPage
(async () => {
  const tokenResponse = await verifyToken()
  console.log('app.js, tokenResponse:', tokenResponse)
  if (tokenResponse.isAuthenticated === true) {
    console.log('app.js, tokenResponse.isAuthenticated:', tokenResponse.isAuthenticated)
    store.dispatch(login({ ...tokenResponse }))
  }
  
})()

renderApp()
history.push('/')
