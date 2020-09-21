const jwt = require('jsonwebtoken')

const nonDbProcess = async (req, body) => {
  console.log('nonDbProcess body:', body)
  switch (body.nonDbProcess) {
    
    case 'authUser':
      const token = await req.get('Authorization').replace('Bearer ', '')
      console.log('nonDbProcess, authUser token:', token)
      console.log('nonDbProcess, authUser token.length:', token.length)
    
      if (token) {
        return await jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
          if (error) {
            return {}
          }
          else {
            console.log('nonDbProcess, decoded:', decoded)
            const { iat, ...rest } = decoded
            return { isAuthenticated: true, token: token, ...rest}
          }
        })
      } else {
        return {}
      }

    case 'renewToken':
      const { reqName, nonDbProcess, ...rest } = body
      const renewedToken = jwt.sign({ ...rest }, process.env.JWT_SECRET)
      return { token: renewedToken }
  
  default:
      return {error: 'Error! Undefined "body.nonDbProcess"'}
  }
}

module.exports = nonDbProcess