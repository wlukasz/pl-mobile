const jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {
  try {
    console.log('middleware/auth.js req.body:', req.body)
    // const token = await req.header('Authorization').replace('Bearer ', '')
    const token = await req.get('Authorization').replace('Bearer ', '')
    console.log('middleware/auth.js token:', token)
    console.log('middleware/auth.js token.length:', token.length)
    // req.header and req.get both return a string 'null' if no token rather than a null itself therefore
    // if (token !== null) is NOT WORKING! so I'm using length > 4 b/c null.length = 4 and token.length = 211
    // if (token.length > 4) {
    if (token !== 'null' && token !== 'undefined') {
      await jwt.verify(token, 'secretphrase', (error, decoded) => {
        console.log('middleware/auth.js error:', error)
        console.log('middleware/auth.js decoded:', decoded)
        if (error) {
          console.log('middleware/auth.js, token decode error, error sent')
          res.status(401).send({ error: `${error.name}: ${error.message}` })
        } else {
          console.log('middleware/auth.js, token decoded OK, request authorized')
          next()
        }
      })
    } else {
      // these requests don't require auth. add more as applicable
      const noAuthNeeded = [ 'fetchPasswordPlus', 'verifyToken' ]

      noAuthNeeded.find(reqName => req.body.reqName === reqName) 
        ? next() 
        : res.status(401).send({ error: `${error.name}: ${error.message}` }) 
    }
  } catch(error) {
    res.send({ error: `${error.name}: ${error.message}` })
  }
}

module.exports = auth