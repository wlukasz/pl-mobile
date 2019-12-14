// operations requested after db ops

const jwt = require('jsonwebtoken')
const Password = require('node-php-password')

const postProcess = (body, dbResult) => {
  console.log('postProcess, body:', body)
  console.log('postProcess, dbResult:', dbResult)

  switch (body.postProcess) {
    
    case 'authUser':
      try {
        if (dbResult.length > 0) {
          // convert blob hashed password to string
          const hashedPassword = Buffer.from(dbResult[0].password).toString('utf-8')
          const isAuthenticated = Password.verify(body.plainPassword, hashedPassword)
  
          // this required hashed password to be CHAR(60) in mysql, the above allows it to remain a BLOB datatype
          // const isAuthenticated = Password.verify(body.plainPassword, dbResult[0].password)
  
          if (isAuthenticated) {
            const { password, group_id, ...rest } = dbResult[0]
            if (group_id === 2 ) { //tenant
              const token = jwt.sign({ ...rest }, 'secretphrase')
              console.log('postProcess, authUser, token:', token)
              return { isAuthenticated, token, ...rest }
            } else {
              return { isAuthenticated: false }
            }
          } else {
            return { isAuthenticated }
          }
        } else { // couldnt rerieve password - bad email
            return { isAuthenticated: false }
        }
      } catch (error) { 
        return { error }
      }

    case 'parseTagData':
      try {
        if (dbResult.length > 0) {
          const parsedResult = dbResult.map((textRow) => {
            console.log('postProcess, textRow:', textRow)
            return JSON.parse(textRow.mobile_data)
          })
          console.log('postProcess, parsed dbResult', parsedResult)
          return parsedResult
        } else {
          return {}
        }  
      } catch (error) {
        return { error }
      }

    default:
      return dbResult
  }
}

module.exports = postProcess