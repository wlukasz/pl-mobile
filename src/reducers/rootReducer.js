import { combineReducers } from 'redux'
import { loadingBarReducer } from 'react-redux-loading-bar'
import authReducers from './auth'
import userReducers from './user'

const rootReducer = combineReducers ({
  auth: authReducers,
  user: userReducers,
  loadingBar: loadingBarReducer,
})

export default rootReducer