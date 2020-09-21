const dbCredentials = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    // host: 'localhost',
    // port: 3306,
    // user: 'root',
    // password: 'jazzmusic00',
    // database: 'peterlan_pl_devl'
}

module.exports = dbCredentials