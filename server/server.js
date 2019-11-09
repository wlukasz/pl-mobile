const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const publicPath = path.join(__dirname, '..', 'public')
const dbPool = require('./db/connection')
const distributor = require('./api/distributor')

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
  const dbParams = distributor(req.body)
  console.log('dbParams', dbParams)
  dbPool.query(dbParams.sql, dbParams.inserts, (error, result, fields) => {
    if (error) {
      return console.log(error)
    }
      console.log('result:', result)
      res.send(result)
    })
  })

app.use(express.static(publicPath))

app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'))
})

app.listen(port, () => {
  console.log(`Express Server is up on port ${port}`)
})