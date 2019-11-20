const jwt = require('jsonwebtoken')

const nonDbProcess = async (body) => {
  switch (body.nonDbProcess) {
    
    case 'authUser':
      console.log('nonDbProcess body:', body)
      if (body.token) {
        return await jwt.verify(body.token, 'secretphrase', (error, decoded) => {
          if (error) {
            return {}
          }
          else {
            console.log('nonDbProcess, decoded:', decoded)
            const { iat, ...rest } = decoded
            return { isAuthenticated: true, token: body.token, ...rest}
          }
        })
      } else {
        return {}
      }

    default:
      return {}
  }
}

module.exports = nonDbProcess