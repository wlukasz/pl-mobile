import { combineReducers } from 'redux'
import { loadingBarReducer } from 'react-redux-loading-bar'
import authReducers from './auth'
import userReducers from './user'
import tagsReducers from './tags'
import poliReducers from './poli'

const rootReducer = combineReducers ({
  auth: authReducers,
  user: userReducers,
  tags: tagsReducers,
  poli: poliReducers,
  loadingBar: loadingBarReducer,
})

export default rootReducer