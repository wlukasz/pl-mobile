const jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {
  try {
    console.log('middleware/auth.js req.body:', req.body)
    const token = req.header('Authorization').replace('Bearer ', '')
    if (token) {
      const decoded = jwt.verify(token, 'secretphrase')
      console.log('middleware/auth.js decoded:', decoded)
      next()
    } else {
      next()
    }

  //  if (!user) {
  //      throw new Error()
  //  }

  //  req.token = token
  //  req.user = user
  //  next()
  } catch(error) {
    res.status(401).send({ error: 'Please authenticate'})
  }
}

module.exports = auth