export default (state = {}, action) => {
  switch (action.type) {

    case 'LOGIN':
      console.log('LOGIN reducer', action)
      return {
        isAuthenticated: action.isAuthenticated,
        token: action.token
      }

    case 'RENEW_TOKEN':
      console.log('RENEW_TOKEN reducer', action)
      return {
        isAuthenticated: action.isAuthenticated,
        token: action.token
      }

    case 'LOGOUT':
    console.log('LOGOUT reducer', action)
    return {}

    default:
      return state
  }
}
