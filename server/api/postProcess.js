// operations requested after db ops

const jwt = require('jsonwebtoken')

const Password = require('node-php-password')

const postProcess = (body, dbResult) => {
  switch (body.postProcess) {
   
    case 'authUser':
      if (dbResult.length > 0) {
        const isAuthenticated = Password.verify(body.plainPassword, dbResult[0].password)
        if (isAuthenticated) {
          const { password, ...rest } = dbResult[0]
          const token = jwt.sign({ ...rest }, 'secretphrase')
          console.log('postProcess, authUser, token:', token)
          return { isAuthenticated, token, ...rest }
        } else {
          return { isAuthenticated }
        }
      } else { // couldnt rerieve password - bad email
          return { isAuthenticated: false }
      }

    default:
      return dbResult
  }
}

module.exports = postProcess