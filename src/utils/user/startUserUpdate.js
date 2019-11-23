import serverRequest from '../serverRequest'

export default ({ id, firstName, lastName, email, token }) => {
  console.log('startUserUpdate:', id, firstName, lastName, email, token)
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
      console.log('startUserUpdate, body:', body)
      const userUpdateDb = await serverRequest(body)
      console.log('startUserUpdate, userUpdateDb-result:', userUpdateDb)
      return { ...body }
    } catch(error) {
      console.log('Error updating User:', error)
      return { error }
    }
  }
}