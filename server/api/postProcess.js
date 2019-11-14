// operations requested after db ops
const Password = require('node-php-password')

const postProcess = (body, dbResult) => {
  switch (body.postProcess) {
   
    case 'authUser':
      if (dbResult.length > 0) {
        const isAuthenticated = Password.verify(body.plainPassword, dbResult[0].password)
        return { isAuthenticated }
      } else { // couldnt rerieve password - bad email
        return { isAuthenticated: false }
      }

    default:
      return dbResult
  }
}

module.exports = postProcess