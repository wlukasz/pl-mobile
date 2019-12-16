export default (state = {}, action) => {
  switch (action.type) {

    case 'LOGIN':
      return {
        isAuthenticated: action.isAuthenticated,
        token: action.token
      }

    case 'RENEW_TOKEN':
      return {
        isAuthenticated: action.isAuthenticated,
        token: action.token
      }

    case 'LOGOUT':
    return {}

    default:
      return state
  }
}
