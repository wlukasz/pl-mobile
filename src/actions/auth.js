export const login = ({ isAuthenticated, token } = {}) => ({
  type: 'LOGIN',
  isAuthenticated,
  token
})

export const renewToken = (token = {}) => ({
  type: 'RENEW_TOKEN',
  isAuthenticated: true,
  token
})  

export const logout = () => ({ 
  type: 'LOGOUT'
})
