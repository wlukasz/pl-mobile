import serverRequest from '../serverRequest'

export default ({ id, firstName, lastName, email, token }) => {
  return async () => {
    try {
      const body = {
        reqName: 'updateUser', // returns object
        id,
        first_name: firstName,
        last_name: lastName,
        email,
        token
      }
      await serverRequest(body)
      return { ...body }
    } catch(error) {
      console.log('Error updating User:', error)
      return { error }
    }
  }
}