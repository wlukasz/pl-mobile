import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { loadingBarReducer } from 'react-redux-loading-bar'
import authReducer from '../reducers/auth'
import userReducers from '../reducers/user'

// import { loadingBarMiddleware } from 'react-redux-loading-bar'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default () => {
  const store = createStore(
    combineReducers({
      auth: authReducer,
      user: userReducers,
      loadingBar: loadingBarReducer,
    }),
    composeEnhancers(applyMiddleware(thunk, logger))
    // composeEnhancers(applyMiddleware(thunk, logger, loadingBarMiddleware()))
  )

  return store
}
