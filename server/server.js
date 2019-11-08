const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const publicPath = path.join(__dirname, '..', 'public')
const dbPool = require('./db/connection')

const app = express()
const port = process.env.PORT || 4007

app.get('/api/fetchUser/:id', (req, res) => {
  console.log('req.params:', req.params)
  const sql = 'SELECT * FROM ?? WHERE ?? = ?'
  const inserts = ['tbl_member', 'id', req.params.id]
  dbPool.query(sql, inserts, (error, result, fields) => {
    if (error) {
        return console.log(error)
    }
    console.log('result:', result)
    result.forEach((user) => { // result is always an array
        console.log(user.first_name, user.last_name, user.email)
        res.send(user)
    })
  })
})



// Required for POST request
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({
  inflate: true,
  type: 'application/json'
}))

// POST request
app.post('/api/updateUser', (req, res) => {
  console.log('req.body:', req.body)
  const sql = 'UPDATE ?? SET ?? = ?, ?? = ? WHERE ?? = ?'
  const inserts = ['tbl_member', 'first_name', req.body.firstName, 'email', req.body.email, 'id', req.body.id]
  dbPool.query(sql, inserts, (error, result, fields) => {
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