import serverRequest from '../utils/serverRequest'

export const login = ({ isAuthenticated, id, group_id, email, first_name, last_name, token } = {}) => ({
  type: 'LOGIN',
  isAuthenticated,
  id,
  groupId: group_id,
  email,
  firstName: first_name,
  lastName: last_name,
  token
})

export const startLogin = ({ email, password }) => {
  console.log('startLogin:', email, password)
  return async () => {
    //  verify user's email & password
    const body = {
      reqName: 'fetchPasswordPlus', // returns object { isAuthenticated: true/false + other user's data if true }
      postProcess: 'authUser',
      email,
      plainPassword: password
    }
    const passwordCheck =  await serverRequest(body)
    console.log('passwordCheck:', passwordCheck)

    return passwordCheck
  }
}
                           
export const verifyToken = async () => {
  const token = localStorage.getItem('token')
  console.log('actions/auth.js, verifyToken:', token)
  if (!token) return {}

  // return async () => {
    // decode token from localStorage & send back decoded user data
    const body = {
      reqName: 'verifyToken', // returns object { isAuthenticated: true/false + other user's data if true }
      nonDbProcess: 'authUser',
      token
    }
    console.log('actions/auth.js, body:', body)
    const authData =  await serverRequest(body)
    console.log('verifyToken, authData:', authData)
    if (!authData) localStorage.removeItem('token')

    return authData
  // }
}

export const logout = () => ({ 
  type: 'LOGOUT',
  isAuthenticated: false,
  token: ''
})

export const startLogout = () => {
  console.log('startLogout')
  return () => {
    return {}
  }
}