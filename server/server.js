const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const publicPath = path.join(__dirname, '..', 'public')
const dbProcessor = require('./api/dbProcessor')
const preProcess = require('./api/preProcess')
const postProcess = require('./api/postProcess')
const nonDbProcess = require('./api/nonDbProcess')
const auth = require('./middleware/auth')

const app = express()
const port = process.env.PORT || 4007

// Required for POST request
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({
  inflate: true,
  type: 'application/json'
}))
  
// Generic POST request
app.post('/api', auth, async (req, res) => {
  console.log('req.body in server:', req.body)
  if (req.body.nonDbProcess) {
    const result = await nonDbProcess(req, req.body)
    console.log('nonDbProcess result in server:', result)
    res.send(result)
  } else {
    req.body = preProcess(req.body)
    console.log('req.body in server after preProcess:', req.body)

    const result = await dbProcessor(req.body)
    
    console.log('result in server after dbProcessor:', result)
    res.send(postProcess(req.body, result))
  }
})

app.use(express.static(publicPath))

app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'))
})

app.listen(port, () => {
  console.log('****************************************************************************')
  console.log(`Express Server is up on port ${port}`)
})