export default async (body) => {
  try {
    const postData = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }
    console.log('postData: ', postData)

    const res = await fetch('api', postData)
    if (!res.ok) { // usually 504 (Gateway Timeout) - i.e. express server is down
      throw Error('Node.js is down!', res.statusText)
    }
    const result = await res.json()
    console.log(`Generic FETCH in serverRequest.js; Request:${body.reqName}`, result)
    return result
  } catch(error) {
    console.log(`Generic FETCH Error in serverRequest.js; Request:${body.reqName}; ${error}`)
  } 
}