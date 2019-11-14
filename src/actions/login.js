import Cookies from 'js-cookie'
import serverRequest from '../utils/serverRequest'

export const loginMysql = ({ isAuthenticated } = {}) => ({
  type: 'LOGIN_MYSQL',
  isAuthenticated
})

export const startLoginMysql = ({ email, password }) => {
  console.log('startLoginMysql:', email, password)
  return async () => {
    //  verify user's password
    const body = {
      reqName: 'fetchPassword', // returns object { isAuthenticated: true/false }
      preProcess: 'testCase',
      postProcess: 'authUser',
      email,
      plainPassword: password
    }
    const passwordCheck =  await serverRequest(body)
    
    console.log('passwordCheck:', passwordCheck)
    Cookies.remove('isAuthenticated')
    Cookies.set('isAuthenticated', passwordCheck.isAuthenticated)
    console.log('get cookie:', Cookies.get('isAuthenticated'))
    return passwordCheck
  }
}

export const logoutMysql = () => ({ 
  type: 'LOGOUT_MYSQL',
  // pass cookie for removal here? 
})

export const startLogoutMysql = () => {
  console.log('startLogoutMysql')
  return () => {
    return // remove cookie here 
  }
}