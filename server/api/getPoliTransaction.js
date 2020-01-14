const request = require('request-promise')

const getPoliTransaction = async (req, body) => {
  console.log('getPoliTransaction, body:', body)
  const authorization = Buffer.from(`${body.merchant_code}:${body.merchant_pass}`).toString('base64')
  const options = {
    'method': 'GET',
    'url': `${body.poli_api_url}Transaction/GetTransaction?token=${body.poliToken}`,
    'headers': {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${authorization}`
    }
  }
  
  return await request(options)
  .then((response) => {
    console.log('getPoliTransaction, POLi response:', response)
    return response
  }).catch(error => {
    console.log('getPoliTransaction, error:', error)
    return error
  })
}

module.exports = getPoliTransaction