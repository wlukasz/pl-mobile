import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import DashboardPage from '../components/user/DashboardPage'
import NotFoundPage from '../components/general/NotFoundPage'
import SplashPage from '../components/general/SplashPage'
import LoginPage from '../components/auth/LoginPage'
import UpdateUserPage from '../components/user/UpdateUserPage'
import PayPoli from '../components/poli/PayPoli'
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
        <PrivateRoute path="/userprofile" component={UpdateUserPage} />
        <PrivateRoute path="/paypoli" component={PayPoli} />
        <Route component={NotFoundPage} />
      </Switch>
     </div>
  </Router>
)

export default AppRouter