import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import authReducer from '../reducers/auth'
import loginReducer from '../reducers/login'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default () => {
  const store = createStore(
    combineReducers({
      auth: authReducer,
      login: loginReducer
    }),
    composeEnhancers(applyMiddleware(thunk, logger))
  )

  return store
}
