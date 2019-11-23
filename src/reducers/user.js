export default (state = {}, action) => {
  switch (action.type) {

    case 'UPDATE_USER':
      console.log('UPDATE_USER reducer, action:', action)
      return {
        id: action.id,
        email: action.email,
        firstName: action.firstName,
        lastName: action.lastName
      }

    case 'SIGNOUT_USER':
      console.log('SIGNOUT_USER reducer, action:', action)
      return {}

    default:
      return state
  }
}
