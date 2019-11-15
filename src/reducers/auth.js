export default (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN_MYSQL':
      console.log('LOGIN_MYSQL reducer', action)
        return {
          isAuthenticated: action.isAuthenticated
        }
      case 'LOGOUT_MYSQL':
      console.log('LOGOUT_MYSQL reducer', action)
      return {}
    default:
      return state
  }
}
