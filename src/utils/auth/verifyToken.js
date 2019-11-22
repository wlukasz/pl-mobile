import serverRequest from '../serverRequest'

export default async () => {
  const token = await localStorage.getItem('token')
  console.log('actions/auth.js, verifyToken:', token)
  if (!token) return {}

  // decode token from localStorage at backend & send back decoded user data
  const body = {
    reqName: 'verifyToken', // returns object { isAuthenticated: true/false + token & other user's data if true }
    nonDbProcess: 'authUser',
    token
  }
  console.log('actions/auth.js, body:', body)
  const authData =  await serverRequest(body)
  console.log('verifyToken, authData:', authData)
  if (!authData.isAuthenticated === true) localStorage.removeItem('token')

  return authData
}