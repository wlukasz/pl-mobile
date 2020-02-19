const request = require('request-promise')

// API call to PHP endpoint
const refreshUserTags = async (postData) => {
  console.log('refreshUserTags, postData:', postData)
  const uri = `http://localhost/api-pl-node/${postData.apiId}.php`
  
  let options = {
    uri,
    // the 'form' keyword is critical for sending 'post'request
    // 'json' keyword will make it a 'get' request
    form: postData
  }
  
  return await request.post(options)
    .then(response => {
      console.log('From PHP, response: ', response)
      return response
    }).catch(error => {
      console.log('From PHP, error: ', error)
      return error
    })
}

module.exports = refreshUserTags