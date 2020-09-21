import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import WebFont from 'webfontloader'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'normalize.css/normalize.css'
import './styles/styles.scss'
import AppRouter, { history } from './routers/AppRouter'
import configureStore from './store/configureStore'
import verifyToken from './utils/auth/verifyToken'
import { login } from './actions/auth'
import { updateUser } from './actions/user'
import { updateTags } from './actions/tags'
import refreshUserTags from './utils/user/refreshUserTags'
import getTagData from './utils/user/getTagData'

WebFont.load({
  google: {
    families: ['Roboto Condensed:300,400,700', 'sans-serif'],
    // families: ['Roboto:100,200,300,400,500,700,900', 'sans-serif']
  },
})

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
;(async () => {
  const tokenResponse = await verifyToken()
  if (tokenResponse.isAuthenticated === true) {
    const { isAuthenticated, token, id, ...rest } = tokenResponse
    store.dispatch(login({ isAuthenticated, token }))
    store.dispatch(updateUser({ id, ...rest }))

    // refresh mobile_data in db-tenancy agreement table for this memid
    const tagsRefreshed = await refreshUserTags({ token, memid: id })
    console.log('app.js, tagsRefreshed:', tagsRefreshed)

    const tagData = await getTagData(id, token)
    store.dispatch(updateTags(tagData))
  }
  renderApp()
  history.push('/')
})()
