import { combineReducers } from 'redux'
import { loadingBarReducer } from 'react-redux-loading-bar'
import authReducers from './auth'
import userReducers from './user'
import tagsReducers from './tags'

const rootReducer = combineReducers ({
  auth: authReducers,
  user: userReducers,
  tags: tagsReducers,
  loadingBar: loadingBarReducer,
})

export default rootReducer