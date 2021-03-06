export default (state = {}, action) => {
  switch (action.type) {

    case 'UPDATE_USER':
      return {
        id: action.id,
        email: action.email,
        firstName: action.firstName,
        lastName: action.lastName
      }

    default:
      return state
  }
}
