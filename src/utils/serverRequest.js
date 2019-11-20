export default async (body) => {
  try {
    let authorizationToken = ''
    if (body.token) {
      authorizationToken = `Bearer ${body.token}`
      // const {token, ...rest} = body
      // body = { ...rest }
    }

    const postData = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': authorizationToken
      },
      body: JSON.stringify(body)
    }
    console.log('serverRequest.js, postData: ', postData)

    const res = await fetch('api', postData)
    if (!res.ok) { // usually 504 (Gateway Timeout) - i.e. express server is down
      throw Error('The server is down! Please try again later', res.statusText)
    }
    const result = await res.json()
    console.log(`Generic FETCH in serverRequest.js; Request:${body.reqName}`, result)
    return result
  } catch(error) {
    console.log(`Generic FETCH Error in serverRequest.js; Request:${body.reqName}; ${error}`)
    return { error }
  } 
}