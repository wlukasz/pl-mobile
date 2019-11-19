export default (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN':
      console.log('LOGIN reducer', action)
        return {
          isAuthenticated: action.isAuthenticated,
          id: action.id,
          groupId: action.groupId,
          email: action.email,
          firstName: action.firstName,
          lastName: action.lastName,
          token: action.token
        }
      case 'LOGOUT':
      console.log('LOGOUT reducer', action)
      return {}
    default:
      return state
  }
}
