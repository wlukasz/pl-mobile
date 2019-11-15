import Cookies from 'js-cookie'
import serverRequest from '../utils/serverRequest'

export const login = ({ isAuthenticated } = {}) => ({
  type: 'LOGIN',
  isAuthenticated
})

export const startLogin = ({ email, password }) => {
  console.log('startLogin:', email, password)
  return async () => {
    //  verify user's email & password
    const body = {
      reqName: 'fetchPassword', // returns object { isAuthenticated: true/false }
      postProcess: 'authUser',
      email,
      plainPassword: password
    }
    const passwordCheck =  await serverRequest(body)
    
    console.log('passwordCheck:', passwordCheck)
    Cookies.set('isAuthenticated', passwordCheck.isAuthenticated)
    console.log('get cookie:', Cookies.get('isAuthenticated'))
    return passwordCheck
  }
}

export const logout = () => ({ 
  type: 'LOGOUT',
  isAuthenticated: false
})

export const startLogout = () => {
  console.log('startLogout')
  Cookies.remove('isAuthenticated')
  return () => {
    return {}
  }
}