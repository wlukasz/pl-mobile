// operations requested after db ops
const Password = require('node-php-password')

const postProcess = (body, dbResult) => {
  switch (body.postProcess) {
   
    case 'verifyPassword':
      const isAuthenticated = Password.verify(body.plainPassword, dbResult[0].password)
      return { isAuthenticated }

    default:
      return dbResult
  }
}

module.exports = postProcess