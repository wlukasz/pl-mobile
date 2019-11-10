const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const publicPath = path.join(__dirname, '..', 'public')
const dbPool = require('./db/connection')
const dbSelector = require('./api/dbSelector')
const preProcess = require('./api/preProcess')
const postProcess = require('./api/postProcess')
const nonDbProcess = require('./api/nonDbProcess')
// const verifyPassword = require('./utils/verifyPassword')

const app = express()
const port = process.env.PORT || 4007

// Required for POST request
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({
  inflate: true,
  type: 'application/json'
}))
  
// Generic POST request
app.post('/api', (req, res) => {
  console.log('req.body:', req.body)
  req.body = preProcess(req.body)
  console.log('req.body:', req.body)
  const dbParams = dbSelector(req.body)
  console.log('dbParams', dbParams)
  if (dbParams === false) {
    console.log('Error: Invalid db request!')
    res.status(400).send({ error: 'Invalid db request!' })
  } else {
    dbPool.query(dbParams.sql, dbParams.inserts, (error, result, fields) => {
      if (error) {
        console.log('Database error:', error)
        res.status(400).send({ error: `Database error: ${error}` })
      } else {
        console.log('result:', result)
        res.send(postProcess(req.body, result))
      }
    })
  }
})

app.use(express.static(publicPath))

app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'))
})

app.listen(port, () => {
  console.log(`Express Server is up on port ${port}`)
})