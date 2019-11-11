const dbPool = require('../db/connection')
    
const dbQuery = async (dbParams) => {  
  console.log('dbParams in dbQuery', dbParams)

  const result = await dbPool.promise().query(dbParams.sql, dbParams.inserts, (error, result, fields) => {
    if (error) {
      return {}
    } else {
      return result
    }
  })

  console.log('result in dbQuery:', result[0])
  return result[0]
}

module.exports = dbQuery