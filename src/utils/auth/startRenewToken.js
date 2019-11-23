import serverRequest from '../serverRequest'

export default ({ ...tokenPayload }) => {
  console.log('startRenewToken, tokenPayload:', tokenPayload)
  return async () => {
    try {
      const body = {
        reqName: 'renewToken', // returns object
        nonDbProcess: 'renewToken',
        ...tokenPayload
      }
      console.log('startRenewToken, body:', body)
      const renewedToken = await serverRequest(body)
      console.log('startRenewToken, renewedToken:', renewedToken)
      localStorage.setItem('token', renewedToken.token)
      return renewedToken
    } catch(error) {
      console.log('Error renewing token:', error)
      return { error }
    }
  }
}
