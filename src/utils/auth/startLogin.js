import serverRequest from '../serverRequest'

export default ({ email, password }) => {
  return async () => {
    //  verify user's email & password
    const body = {
      reqName: 'fetchPasswordPlus', // returns object { isAuthenticated: true/false + jwt token other user's data if true }
      postProcess: 'authUser',
      email,
      plainPassword: password
    }
    const passwordCheck =  await serverRequest(body)
    return passwordCheck
  }
}