export default (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN':
      console.log('LOGIN reducer', action)
        return {
          isAuthenticated: action.isAuthenticated
        }
      case 'LOGOUT':
      console.log('LOGOUT reducer', action)
      return {}
    default:
      return state
  }
}
