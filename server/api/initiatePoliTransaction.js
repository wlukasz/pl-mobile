const request = require('request-promise')

const initiatePoliTransaction = async (req, body) => {
  console.log('initiatePoliTransaction, body:', body)
  const authorization = Buffer.from(`${body.poli.merchant_code}:${body.poli.merchant_pass}`).toString('base64')
	const merchantData = `paytyp:memid:tagid:propid:payid,${body.poli.paytype}:${body.memid}:${body.poli.tagid}:${body.poli.propid}:`
  const options = {
    'method': 'POST',
    'url': `${body.poli.poli_api_url}Transaction/Initiate`,
    'headers': {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${authorization}`
    },
    body: JSON.stringify({
      "Amount": body.amountToPay,
      "CurrencyCode": body.poli.poli_currency_code,
      "MerchantReference": "Rent Payment",
      "MerchantData": merchantData,
      "MerchantHomepageURL": body.backFromPoliUrl,
      "SuccessURL": body.backFromPoliUrl,
      "FailureURL": body.backFromPoliUrl,
      "CancellationURL": body.backFromPoliUrl,
      "NotificationURL": body.backFromPoliUrl
    })
  
  }
  
  return await request(options)
  .then((response) => {
    console.log('initiatePoliTransaction, POLi response:', response)
    return response
  }).catch(error => {
    console.log('initiatePoliTransaction, error:', error)
    return error
  })
}

module.exports = initiatePoliTransaction