export default (state = {}, action) => {
  switch (action.type) {

    case 'UPDATE_USER':
      console.log('UPDATE_USER reducer', action)
      return {
        email: action.email,
        firstName: action.firstName,
        lastName: action.lastName
      }

    default:
      return state
  }
}
