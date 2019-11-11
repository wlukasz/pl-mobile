const mysql = require('mysql2')
const dbCredentials = require('./credentials')

// const dbConnection = mysql.createConnection(dbCredentials)

const dbPool = mysql.createPool({ connectionLimit : 10, ...dbCredentials })
module.exports = dbPool