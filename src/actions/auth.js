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

export const logout = () => ({ 
  type: 'LOGOUT'
})
