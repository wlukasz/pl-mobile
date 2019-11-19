const dbQuery = require('../db/dbQuery')

const dbProcessor = async body => {
  console.log('body in dbProcessor', body)
  let dbParams = null
  switch (body.reqName) {
    
    case 'fetchPasswordPlus':
      dbParams = {
        sql: 'SELECT id, group_id, first_name, last_name, email, password FROM ?? WHERE ?? = ?',
        inserts: ['tbl_member', 'email', body.email]
      }
      break

    case 'fetchUser':
      dbParams = {
        sql: 'SELECT * FROM ?? WHERE ?? = ?',
        inserts: ['tbl_member', 'id', body.id]
      }
      break

    case 'updateUser':
      dbParams = {
        sql: 'UPDATE ?? SET ?? = ? WHERE ?? = ?',
        inserts: ['tbl_member', 'first_name', body.first_name,  'id', body.id]
      }
      break

    default:
      return false
  }

  const dbResult = async () => {
    return await dbQuery(dbParams)
  }
  const result = await dbResult()

  console.log('result in dbProcessor:', result)
  return result
}

module.exports = dbProcessor