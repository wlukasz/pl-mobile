import serverRequest from '../serverRequest'

export default ({ ...tokenPayload }) => {
  return async () => {
    try {
      const body = {
        reqName: 'renewToken', // returns object
        nonDbProcess: 'renewToken',
        ...tokenPayload
      }
      const renewedToken = await serverRequest(body)
      localStorage.setItem('token', renewedToken.token)
      return renewedToken
    } catch(error) {
      return { error }
    }
  }
}
