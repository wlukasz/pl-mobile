// setting up sql as per request
const dbSelector = body => {
  switch (body.reqName) {
    
    case 'fetchPassword':
      return dbParams = {
        sql: 'SELECT password FROM ?? WHERE ?? = ?',
        inserts: ['tbl_member', 'email', body.email]
      }

    case 'fetchUser':
      return dbParams = {
        sql: 'SELECT * FROM ?? WHERE ?? = ?',
        inserts: ['tbl_member', 'id', body.id]
      }

    case 'updateUser':
      return dbParams = {
        sql: 'UPDATE ?? SET ?? = ? WHERE ?? = ?',
        inserts: ['tbl_member', 'first_name', body.first_name,  'id', body.id]
      }

    default:
      return false
  }
}

module.exports = dbSelector