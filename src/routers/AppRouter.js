import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
// import createHistory from 'history/createBrowserHistory'
import { createBrowserHistory } from 'history'
import DashboardPage from '../components/DashboardPage'
import NotFoundPage from '../components/NotFoundPage'
import SplashPage from '../components/SplashPage'
import LoginPage from '../components/LoginPage'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'

export const history = createBrowserHistory()

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <PublicRoute path="/" component={SplashPage} exact={true} />
        <PublicRoute path="/login" component={LoginPage} />
        <PrivateRoute path="/dashboard" component={DashboardPage} />
        <Route component={NotFoundPage} />
      </Switch>
     </div>
  </Router>
)

export default AppRouter