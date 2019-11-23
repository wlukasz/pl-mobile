export const login = ({ isAuthenticated, token } = {}) => ({
  type: 'LOGIN',
  isAuthenticated,
  token
})

export const renewToken = (token = {}) => {
  console.log('Action RENEW_TOKEN, token:', token)
  return {
  type: 'RENEW_TOKEN',
  isAuthenticated: true,
  token
  }  
} 

export const logout = () => ({ 
  type: 'LOGOUT'
})
