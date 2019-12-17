import { combineReducers } from 'redux'
import { loadingBarReducer } from 'react-redux-loading-bar'
import authReducers from './auth'
import userReducers from './user'
import tagsReducers from './tags'
import poliReducers from './poli'

const appReducer = combineReducers ({
  auth: authReducers,
  user: userReducers,
  tags: tagsReducers,
  poli: poliReducers,
  loadingBar: loadingBarReducer,
})

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    state = undefined
  }

  return appReducer(state, action)
}

export default rootReducer