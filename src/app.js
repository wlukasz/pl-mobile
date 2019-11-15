import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import AppRouter, { history } from './routers/AppRouter'
import configureStore from './store/configureStore'
import 'normalize.css/normalize.css'
import './styles/styles.scss'
// import 'react-dates/lib/css/_datepicker.css'
import LoadingPage from './components/LoadingPage'

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

// ReactDOM.render(<LoadingPage />, document.getElementById('app'))

renderApp()
history.push('/')
