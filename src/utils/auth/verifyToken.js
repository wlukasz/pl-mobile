import serverRequest from '../serverRequest'

export default async () => {
  const token = await localStorage.getItem('token')
  if (!token) return {}

  // decode token from localStorage at backend & send back decoded user data
  const body = {
    reqName: 'verifyToken', // returns object { isAuthenticated: true/false + token & other user's data if true }
    nonDbProcess: 'authUser',
    token
  }
  const authData =  await serverRequest(body)
  if (!authData.isAuthenticated === true) localStorage.removeItem('token')

  return authData
}